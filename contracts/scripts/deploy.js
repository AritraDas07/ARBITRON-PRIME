const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying ARBITRON PRIME Smart Contracts...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy ARBITRON Token first
  console.log("\n📄 Deploying ARBITRON Token...");
  const ArbitronToken = await ethers.getContractFactory("ArbitronToken");
  const arbitronToken = await ArbitronToken.deploy();
  await arbitronToken.deployed();
  console.log("✅ ARBITRON Token deployed to:", arbitronToken.address);

  // Deploy Timelock Controller for governance
  console.log("\n⏰ Deploying Timelock Controller...");
  const TimelockController = await ethers.getContractFactory("TimelockController");
  const timelock = await TimelockController.deploy(
    86400, // 1 day delay
    [deployer.address], // proposers
    [deployer.address], // executors
    deployer.address // admin
  );
  await timelock.deployed();
  console.log("✅ Timelock Controller deployed to:", timelock.address);

  // Deploy ARBITRON PRIME main contract
  console.log("\n🤖 Deploying ARBITRON PRIME...");
  const ArbitronPrime = await ethers.getContractFactory("ArbitronPrime");
  const arbitronPrime = await ArbitronPrime.deploy(deployer.address); // Fee recipient
  await arbitronPrime.deployed();
  console.log("✅ ARBITRON PRIME deployed to:", arbitronPrime.address);

  // Deploy Flash Loan contract
  console.log("\n⚡ Deploying ARBITRON Flash Loan...");
  const ArbitronFlashLoan = await ethers.getContractFactory("ArbitronFlashLoan");
  const flashLoan = await ArbitronFlashLoan.deploy(arbitronPrime.address);
  await flashLoan.deployed();
  console.log("✅ ARBITRON Flash Loan deployed to:", flashLoan.address);

  // Deploy Governance contract
  console.log("\n🏛️ Deploying ARBITRON Governance...");
  const ArbitronGovernance = await ethers.getContractFactory("ArbitronGovernance");
  const governance = await ArbitronGovernance.deploy(
    arbitronToken.address,
    timelock.address
  );
  await governance.deployed();
  console.log("✅ ARBITRON Governance deployed to:", governance.address);

  // Setup initial configurations
  console.log("\n⚙️ Setting up initial configurations...");

  // Authorize some mock DEXs for testing
  const mockDEXs = [
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
    "0x10ED43C718714eb63d5aA57B78B54704E256024E", // PancakeSwap Router
    "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // QuickSwap Router
  ];

  for (const dex of mockDEXs) {
    await arbitronPrime.authorizeDEX(dex, true);
    console.log(`✅ Authorized DEX: ${dex}`);
  }

  // Delegate tokens to enable governance
  await arbitronToken.delegate(deployer.address);
  console.log("✅ Delegated governance tokens");

  // Transfer some tokens to governance contract for testing
  const tokenAmount = ethers.utils.parseEther("100000"); // 100k tokens
  await arbitronToken.transfer(governance.address, tokenAmount);
  console.log("✅ Transferred tokens to governance contract");

  console.log("\n🎉 ARBITRON PRIME deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("==========================================");
  console.log("ARBITRON Token:", arbitronToken.address);
  console.log("ARBITRON PRIME:", arbitronPrime.address);
  console.log("Flash Loan:", flashLoan.address);
  console.log("Governance:", governance.address);
  console.log("Timelock:", timelock.address);
  console.log("==========================================");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    contracts: {
      arbitronToken: arbitronToken.address,
      arbitronPrime: arbitronPrime.address,
      flashLoan: flashLoan.address,
      governance: governance.address,
      timelock: timelock.address
    },
    timestamp: new Date().toISOString()
  };

  console.log("\n💾 Deployment info saved for frontend integration");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });