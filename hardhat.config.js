/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "local",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "cec39a07463ecd28f7c6073d52aebdd9ed2933aa36eeb074b258aa4a73f11699",
      ],
    },
    // rinkeby: {
    //   url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
    //   accounts: [privateKey1, privateKey2, ...]
    // }
  },
  solidity: "0.7.3",
  paths: {
    sources: "./packages/contracts/src",
    tests: "./packages/contracts/tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
