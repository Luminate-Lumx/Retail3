import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLoyaltyRewards: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const Tether = await hre.ethers.getContract("Tether", deployer);

  await deploy("LoyaltyRewards", {
    from: deployer,
    args: [deployer, await Tether.getAddress()],
    log: true,
    autoMine: true,
  });
};

export default deployLoyaltyRewards;
deployLoyaltyRewards.tags = ["LoyaltyRewards"];
