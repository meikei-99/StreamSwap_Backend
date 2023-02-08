const hre = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
const { BigNumber } = require("ethers")
require("dotenv").config()

let MATICBalance
let MATICxBalance

async function downgrade() {
    const downgradeAmount = ethers.utils.parseEther("0.1")
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]
    const superfluidStream = await deployments.get("SuperfluidStream")
    const SuperfluidStream = await ethers.getContractAt(
        superfluidStream.abi,
        superfluidStream.address
    )
    if (!developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log(
            `Downgrading ${
                downgradeAmount / 1e18
            } MATICx on the mumbai testnet...`
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
            const downgradeOperation = await SuperfluidStream.downgradeMATICx(
                downgradeAmount
            )
            await downgradeOperation.wait().then(function (tx) {
                console.log(
                    `You've just downgraded ${
                        downgradeAmount / 1e18
                    } MATICx to MATIC! `
                )
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

downgrade()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
