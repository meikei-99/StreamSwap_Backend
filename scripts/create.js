require("dotenv").config()
const hre = require("hardhat")
const { network } = require("hardhat")
const { BigNumber } = require("ethers")
const { developmentChains } = require("../helper-hardhat-config")
const { Framework } = require("@superfluid-finance/sdk-core")

async function create() {
    const flowAmountInput = 0.001
    const monthlyFlowAmount = ethers.utils.parseEther(
        flowAmountInput.toString()
    )
    const player = "0xd803b0e6DC96a911f2314D3306E5f3779DbEF951"
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )

    if (!developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log(
            `Creating stream of ${flowAmountInput}/month MATICx to ${player}`
        )
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
            const receipt = await SuperfluidStream.createFlow(
                player,
                monthlyFlowAmount
            )
            await receipt.wait().then(function (tx) {
                console.log(
                    `You've just created a stream of ${flowAmountInput}/month MATICx!`
                )
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(`Error:${error}`)
            console.log(
                `Possible error: You have created a stream to ${player} before. Please update the flow rate instead of creating a new flow again.`
            )
        }
    }
}

create()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
