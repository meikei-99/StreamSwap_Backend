const { ethers, deployments } = require("hardhat")
const fs = require("fs")
const frontEndAddressFile = "../frontend/constants/SuperfluidStreamAddress.json"
const frontEndAbiFileSuperfluidStream = "../frontend/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("--------------------------------------")
        console.log("Deploying 99-deploy to front-end...")
        console.log("Writing address to front end...")
        await updateContractAddress()
        console.log("Writing abi to front end...")
        await updateAbi()
        console.log("Done writing to front end...")
        console.log("--------------------------------------")
    }
}

async function updateAbi() {
    // await deployments.fixture(["SuperfluidStream"])
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )
    fs.writeFileSync(
        frontEndAbiFileSuperfluidStream,
        SuperfluidStream.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddress() {
    const superfluidStream = await deployments.get("SuperfluidStream")
    const chainId = network.config.chainId.toString()
    const contractAddress = JSON.parse(
        fs.readFileSync(frontEndAddressFile, "utf8")
    )

    if (chainId in contractAddress) {
        if (!contractAddress[chainId].includes(superfluidStream.address)) {
            contractAddress[chainId].push(superfluidStream.address)
        }
    }
    {
        contractAddress[chainId] = [superfluidStream.address]
    }

    fs.writeFileSync(frontEndAddressFile, JSON.stringify(contractAddress))
}

module.exports.tags = ["all", "front-end"]
