const Pyramid = artifacts.require("Pyramid");

module.exports = function(deployer) {
  deployer.deploy(Pyramid);
};
