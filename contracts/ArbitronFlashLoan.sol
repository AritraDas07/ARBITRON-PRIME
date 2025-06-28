// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IFlashLoanProvider {
    function flashLoan(
        address asset,
        uint256 amount,
        bytes calldata params
    ) external;
}

interface IDEXRouter {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function getAmountsOut(uint amountIn, address[] calldata path)
        external view returns (uint[] memory amounts);
}

/**
 * @title ARBITRON Flash Loan Arbitrage
 * @dev Execute capital-efficient arbitrage using flash loans
 */
contract ArbitronFlashLoan is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct FlashArbitrageParams {
        address tokenA;
        address tokenB;
        address dexA;
        address dexB;
        uint256 amountIn;
        uint256 minProfitBPS; // Minimum profit in basis points
        address[] pathA; // Trading path on DEX A
        address[] pathB; // Trading path on DEX B
        uint256 deadline;
    }

    mapping(address => bool) public authorizedCallers;
    address public immutable arbitronPrime;
    uint256 public constant MIN_PROFIT_BPS = 10; // 0.1% minimum profit

    event FlashArbitrageExecuted(
        address indexed executor,
        address indexed tokenA,
        address indexed tokenB,
        uint256 profit,
        uint256 volume
    );

    modifier onlyAuthorized() {
        require(
            authorizedCallers[msg.sender] || msg.sender == arbitronPrime,
            "Not authorized"
        );
        _;
    }

    constructor(address _arbitronPrime) {
        arbitronPrime = _arbitronPrime;
        authorizedCallers[_arbitronPrime] = true;
    }

    /**
     * @dev Execute flash loan arbitrage
     */
    function executeFlashArbitrage(
        address flashLoanProvider,
        FlashArbitrageParams memory params
    ) external onlyAuthorized nonReentrant {
        require(params.minProfitBPS >= MIN_PROFIT_BPS, "Profit too low");
        require(params.deadline > block.timestamp, "Deadline passed");

        // Encode parameters for flash loan callback
        bytes memory data = abi.encode(params, msg.sender);

        // Initiate flash loan
        IFlashLoanProvider(flashLoanProvider).flashLoan(
            params.tokenA,
            params.amountIn,
            data
        );
    }

    /**
     * @dev Flash loan callback - execute arbitrage
     */
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 fee,
        bytes calldata params
    ) external returns (bool) {
        (FlashArbitrageParams memory arbParams, address executor) = abi.decode(
            params,
            (FlashArbitrageParams, address)
        );

        // Step 1: Swap on DEX A
        uint256 amountOut1 = _swapOnDEX(
            arbParams.dexA,
            arbParams.amountIn,
            arbParams.pathA,
            arbParams.deadline
        );

        // Step 2: Swap back on DEX B
        uint256 amountOut2 = _swapOnDEX(
            arbParams.dexB,
            amountOut1,
            arbParams.pathB,
            arbParams.deadline
        );

        // Calculate profit after repaying flash loan
        uint256 totalRepayment = amount + fee;
        require(amountOut2 > totalRepayment, "Arbitrage not profitable");
        
        uint256 profit = amountOut2 - totalRepayment;
        uint256 profitBPS = (profit * 10000) / amount;
        require(profitBPS >= arbParams.minProfitBPS, "Profit below minimum");

        // Repay flash loan
        IERC20(asset).safeTransfer(msg.sender, totalRepayment);

        // Send profit to executor
        IERC20(asset).safeTransfer(executor, profit);

        emit FlashArbitrageExecuted(
            executor,
            arbParams.tokenA,
            arbParams.tokenB,
            profit,
            amount
        );

        return true;
    }

    /**
     * @dev Internal function to execute swap on DEX
     */
    function _swapOnDEX(
        address dexRouter,
        uint256 amountIn,
        address[] memory path,
        uint256 deadline
    ) internal returns (uint256) {
        IERC20(path[0]).safeApprove(dexRouter, amountIn);
        
        uint256[] memory amounts = IDEXRouter(dexRouter).swapExactTokensForTokens(
            amountIn,
            0, // Accept any amount of tokens out
            path,
            address(this),
            deadline
        );

        return amounts[amounts.length - 1];
    }

    /**
     * @dev Calculate potential arbitrage profit
     */
    function calculateArbitrageProfit(
        address dexA,
        address dexB,
        address[] memory pathA,
        address[] memory pathB,
        uint256 amountIn
    ) external view returns (uint256 profit, uint256 profitBPS) {
        // Get amounts out from DEX A
        uint256[] memory amountsA = IDEXRouter(dexA).getAmountsOut(amountIn, pathA);
        uint256 amountOut1 = amountsA[amountsA.length - 1];

        // Get amounts out from DEX B
        uint256[] memory amountsB = IDEXRouter(dexB).getAmountsOut(amountOut1, pathB);
        uint256 amountOut2 = amountsB[amountsB.length - 1];

        if (amountOut2 > amountIn) {
            profit = amountOut2 - amountIn;
            profitBPS = (profit * 10000) / amountIn;
        } else {
            profit = 0;
            profitBPS = 0;
        }
    }

    /**
     * @dev Authorize caller for flash arbitrage
     */
    function setAuthorizedCaller(address caller, bool authorized) external {
        require(msg.sender == arbitronPrime, "Only ARBITRON PRIME");
        authorizedCallers[caller] = authorized;
    }

    /**
     * @dev Emergency withdrawal function
     */
    function emergencyWithdraw(address token) external {
        require(msg.sender == arbitronPrime, "Only ARBITRON PRIME");
        IERC20 tokenContract = IERC20(token);
        uint256 balance = tokenContract.balanceOf(address(this));
        tokenContract.safeTransfer(arbitronPrime, balance);
    }
}