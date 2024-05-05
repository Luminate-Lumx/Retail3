import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLoyaltyRewards: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const Tether = await hre.ethers.getContract("Tether", deployer);
  const nonce = await hre.ethers.provider.getTransactionCount(deployer);
  console.log("Deploying LoyaltyRewards...");
  await deploy("LoyaltyRewards", {
    from: deployer,
    args: [await Tether.getAddress()],
    log: true,
    nonce: nonce + 1,
  });
  console.log("LoyaltyRewards deployed!");
};

export default deployLoyaltyRewards;
deployLoyaltyRewards.tags = ["LoyaltyRewards"];
