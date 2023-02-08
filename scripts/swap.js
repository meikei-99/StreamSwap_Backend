require("dotenv").config()
const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

async function swap() {
    const swapAmount = ethers.utils.parseEther("0.001")
    const MATICxAddress = process.env.MATICX_ADDRESS_MUMBAI
    const fDAIAddress = process.env.fDAI_ADDRESS_MUMBAI
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )

    if (!developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log(`Swapping ${swapAmount / 1e18} MATICx to fDAI...`)
        try {
            const enteringSwap = await SuperfluidStream.enterSwap()
            await enteringSwap.wait()
            const receipt = await SuperfluidStream.swap(
                swapAmount,
                MATICxAddress,
                fDAIAddress,
                3
            )
            await receipt.wait().then(function (tx) {
                console.log(
                    `You've just swapped ${swapAmount / 1e18} MATICx to fDAI!`
                )
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

swap()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
