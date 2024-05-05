import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, ethers } from "ethers";

const deployUserManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const Tether = await hre.ethers.getContract<Contract>("Tether", deployer);

  console.log("Deploying UserManager...");
  await deploy("UserManager", {
    from: deployer,
    args: [await Tether.getAddress()],
    log: true,
  });
  console.log("UserManager deployed!");

  const UserManager = await hre.ethers.getContract("UserManager", deployer);

  console.log("Transferring 1,000,000 Tether to UserManager...");
  await Tether.transfer(await UserManager.getAddress(), ethers.parseEther("1000000"));
  console.log("Transferred 1,000,000 Tether to UserManager!");
};

export default deployUserManager;

deployUserManager.tags = ["UserManager"];
