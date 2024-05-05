import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployInventoryManagement: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const UserManager = await hre.ethers.getContract("UserManager", deployer);
  const Tether = await hre.ethers.getContract("Tether", deployer);
  const LoyaltyRewards = await hre.ethers.getContract<Contract>("LoyaltyRewards", deployer);
  const TransactionManager = await hre.ethers.getContract<Contract>("TransactionManager", deployer);

  await deploy("InventoryManagement", {
    from: deployer,
    args: [
      await UserManager.getAddress(),
      await Tether.getAddress(),
      await LoyaltyRewards.getAddress(),
      await TransactionManager.getAddress(),
    ],
    log: true,
    autoMine: true,
  });
  const InventoryManagement = await hre.ethers.getContract("InventoryManagement", deployer);
  await LoyaltyRewards.setAuthorizedContract(await InventoryManagement.getAddress());

  await TransactionManager.setInventoryManagement(await InventoryManagement.getAddress());
};

export default deployInventoryManagement;
deployInventoryManagement.tags = ["InventoryManagement"];
