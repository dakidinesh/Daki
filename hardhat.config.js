require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");

// const INFURA_API_KEY = process.env.INFURA_API_KEY;
// const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './frontend/src/artifacts'
  },
   networks: {
    sepolia: {
    url: `https://sepolia.infura.io/v3/10f21a06822b405cbaaae80175e208a5`,
    accounts: ["d95f106bcb8016b7e6fa7c53333e054af5247bb9ed7838a9fa2b1a5246f1fe40"]
    }
   }
};
