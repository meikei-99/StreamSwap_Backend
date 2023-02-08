require("dotenv").config()
const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

async function withdraw() {
    const withdrawAmount = ethers.utils.parseEther("0.005")
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )

    if (!developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log(`Withdrawing ${withdrawAmount / 1e18} fDAI...`)
        try {
            const withdraw = await SuperfluidStream.withdrawfDAI(withdrawAmount)
            await withdraw.wait().then(function (tx) {
                console.log(
                    `You've just withdrew ${withdrawAmount / 1e18} fDAI!`
                )
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

withdraw()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
