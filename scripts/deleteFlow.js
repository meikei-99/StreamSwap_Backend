require("dotenv").config()
const hre = require("hardhat")
const { network } = require("hardhat")
const { BigNumber } = require("ethers")
const { developmentChains } = require("../helper-hardhat-config")
const { Framework } = require("@superfluid-finance/sdk-core")

async function deleteFlow() {
    const player = "0xd803b0e6DC96a911f2314D3306E5f3779DbEF951"
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )

    if (!developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log(`Deleting stream of ${player}...`)
        const provider = new hre.ethers.providers.JsonRpcProvider(
            process.env.MUMBAI_RPC_URL
        )

        sf = await Framework.create({
            chainId: (await provider.getNetwork()).chainId,
            provider,
            customSubgraphQueriesEndpoint: "",
            dataMode: "WEB3_ONLY",
        })

        try {
            const receipt = await SuperfluidStream.deleteFlow(player)
            await receipt.wait().then(function (tx) {
                console.log(`You've just deleted stream of ${player}`)
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(`Error:${error}`)
        }
    }
}

deleteFlow()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
