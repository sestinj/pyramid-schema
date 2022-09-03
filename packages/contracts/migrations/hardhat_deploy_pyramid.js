const hre = require("hardhat");
const { ethers } = hre;
async function main() {
  const Pyramid = await ethers.getContractFactory("Pyramid");
  const pyramid = await Pyramid.deploy();
  await pyramid.deployed();
  console.log("Pyramid deployed to:", pyramid.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
