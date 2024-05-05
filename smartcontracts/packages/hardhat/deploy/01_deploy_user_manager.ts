import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployUserManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const Tether = await hre.ethers.getContract<Contract>("Tether", deployer);

  await deploy("UserManager", {
    from: deployer,
    args: [await Tether.getAddress()],
    log: true,
    autoMine: true,
  });

  const UserManager = await hre.ethers.getContract("UserManager", deployer);

  Tether.transfer(await UserManager.getAddress(), 1000000 * 10 ** 18);
};

export default deployUserManager;

deployUserManager.tags = ["UserManager"];
