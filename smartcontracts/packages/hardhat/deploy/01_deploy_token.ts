import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTether: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Tether", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

export default deployTether;

deployTether.tags = ["Tether"];
