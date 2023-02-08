require("dotenv").config()
const hre = require("hardhat")
const { network } = require("hardhat")
const { BigNumber } = require("ethers")
const { developmentChains } = require("../helper-hardhat-config")
const { Framework } = require("@superfluid-finance/sdk-core")

let MATICBalance
let MATICxBalance

async function upgrade() {
    const upgradeAmount = ethers.utils.parseEther("0.01")
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
            `Upgrading ${upgradeAmount / 1e18} MATIC on the mumbai testnet...`
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
            //Go to polygonscan >> under token will show how much have been upgraded to MATICx
            const receipt = await SuperfluidStream.upgradeMATIC({
                value: upgradeAmount,
            })
            await receipt.wait().then(function (tx) {
                console.log(
                    `You've just upgraded ${
                        upgradeAmount / 1e18
                    } MATIC to MATICx!`
                )
                console.log(`Tx hash: ${JSON.stringify(tx.transactionHash)}`)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

upgrade()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
