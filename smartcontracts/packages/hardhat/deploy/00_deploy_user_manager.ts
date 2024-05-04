import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployUserManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("UserManager", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

export default deployUserManager;

deployUserManager.tags = ["UserManager"];
