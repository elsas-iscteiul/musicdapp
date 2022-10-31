const Migrations = artifacts.require("Migrations");
const RegisterWork = artifacts.require("RegisterWork")
const Sync = artifacts.require("Sync")
const Pro = artifacts.require("Pro")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(RegisterWork);
  deployer.deploy(Sync);
  deployer.deploy(Pro);
};
