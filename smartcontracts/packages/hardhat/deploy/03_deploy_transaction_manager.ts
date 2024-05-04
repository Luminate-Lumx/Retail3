import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTransactionManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const UserManager = await hre.ethers.getContract("UserManager", deployer);

  const transactionManager = await deploy("TransactionManager", {
    from: deployer,
    args: [await UserManager.getAddress()],
    log: true,
    autoMine: true,
  });

  return transactionManager;
};

export default deployTransactionManager;
deployTransactionManager.tags = ["TransactionManager"];
