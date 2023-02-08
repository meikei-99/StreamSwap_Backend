require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-waffle")
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-ethers")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY

module.exports = {
    allowUnlimitedContractSize: true,
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            { version: "0.8.17" },
            { version: "0.8.16" },
            { version: "0.8.9" },
            { version: "0.7.6" },
        ],
    },
    networks: {
        localhost: {
            chainId: 31337,
            // allowUnlimitedContractSize: true,
            // // gas: 2100000,
            // // gasPrice: 8000000000,
        },
        hardhat: {
            chainId: 31337,
            // allowUnlimitedContractSize: true,
            // gas: 2100000,
            // gasPrice: 8000000000,
        },
        mumbai: {
            chainId: 80001,
            url: MUMBAI_RPC_URL,
            blockConfirmation: 1,
            accounts: [PRIVATE_KEY],
            gas: 20000000,
        },
    },
    mocha: {
        timeout: 120000,
    },
    etherscan: { apiKey: POLYGONSCAN_API_KEY },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
}
