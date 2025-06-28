// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title ARBITRON Governance Token
 * @dev ERC20 token with voting capabilities for ARBITRON PRIME governance
 */
contract ArbitronToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("ARBITRON", "ARB") ERC20Permit("ARBITRON") {
        _mint(msg.sender, 1000000 * 10**decimals()); // 1M tokens
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}

/**
 * @title ARBITRON PRIME Governance
 * @dev Decentralized governance for ARBITRON PRIME protocol
 */
contract ArbitronGovernance is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    struct ProposalMetadata {
        string title;
        string description;
        string category; // "TECHNICAL", "ECONOMIC", "GOVERNANCE"
        uint256 aiConfidenceScore;
        bool requiresAIApproval;
    }

    mapping(uint256 => ProposalMetadata) public proposalMetadata;
    mapping(string => bool) public aiModelApprovals;
    
    event ProposalCreatedWithMetadata(
        uint256 indexed proposalId,
        string title,
        string category,
        uint256 aiConfidenceScore
    );

    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("ARBITRON PRIME Governance")
        GovernorSettings(1, 50400, 0) // 1 block delay, 1 week voting period
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {}

    /**
     * @dev Create proposal with AI metadata
     */
    function proposeWithMetadata(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        string memory title,
        string memory category,
        uint256 aiConfidenceScore,
        bool requiresAIApproval
    ) public returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description);
        
        proposalMetadata[proposalId] = ProposalMetadata({
            title: title,
            description: description,
            category: category,
            aiConfidenceScore: aiConfidenceScore,
            requiresAIApproval: requiresAIApproval
        });

        emit ProposalCreatedWithMetadata(proposalId, title, category, aiConfidenceScore);
        
        return proposalId;
    }

    /**
     * @dev AI model approval for proposals
     */
    function setAIModelApproval(
        uint256 proposalId,
        string memory modelName,
        bool approved
    ) external {
        // Only authorized AI oracles can call this
        require(hasRole(keccak256("AI_ORACLE_ROLE"), msg.sender), "Not AI oracle");
        
        string memory key = string(abi.encodePacked(proposalId, "-", modelName));
        aiModelApprovals[key] = approved;
    }

    /**
     * @dev Override _execute to check AI approval if required
     */
    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        ProposalMetadata memory metadata = proposalMetadata[proposalId];
        
        if (metadata.requiresAIApproval) {
            require(_checkAIApproval(proposalId), "AI approval required");
        }

        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    /**
     * @dev Check if proposal has required AI approvals
     */
    function _checkAIApproval(uint256 proposalId) internal view returns (bool) {
        string[] memory models = new string[](3);
        models[0] = "ARBITRON_LSTM";
        models[1] = "CROSS_CHAIN_GNN";
        models[2] = "SENTIMENT_ANALYZER";

        uint256 approvals = 0;
        for (uint256 i = 0; i < models.length; i++) {
            string memory key = string(abi.encodePacked(proposalId, "-", models[i]));
            if (aiModelApprovals[key]) {
                approvals++;
            }
        }

        return approvals >= 2; // Require 2 out of 3 AI model approvals
    }

    // Override required functions
    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}