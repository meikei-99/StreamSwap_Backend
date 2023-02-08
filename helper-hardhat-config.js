require("dotenv").config()

const networkConfig = {
    default: {
        name: "hardhat",
        fDAIxAddress: process.env.FDAIX_ADDRESS,
    },
    80001: {
        name: "mumbai",
        fDAIxAddress: process.env.FDAIX_ADDRESS,
        ETHxContract: "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
    },
    31337: {
        name: "localhost",
        fDAIxAddress: process.env.FDAIX_ADDRESS,
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    developmentChains,
    networkConfig,
}
