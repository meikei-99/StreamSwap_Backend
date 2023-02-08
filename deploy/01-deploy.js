const fs = require("fs")
require("dotenv").config()
const hre = require("hardhat")
const { verify } = require("../utils/verify")
const { network, ethers } = require("hardhat")
const { MATICxABI } = require("../interfaces/MaticxAbi")
const { Framework } = require("@superfluid-finance/sdk-core")
const { developmentChains } = require("../helper-hardhat-config")
const MATICxLocalAddress = "../frontend/constants/MATICxLocalAddress.json"
const {
    deployTestFramework,
} = require("@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework")
const TestToken = require("@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json")

module.exports = async function deploy() {
    const { deployments, getNamedAccounts } = hre
    const { deployer } = await getNamedAccounts()
    const { deploy } = deployments
    const accounts = await ethers.getSigners()

    let sf
    let MATICx

    if (developmentChains.includes(network.name)) {
        console.log("--------------------------------------")
        console.log("Deploy on the local/hardhat network...")
        //Set up & deploy superfluid framework locally
        const sfDeployer = await deployTestFramework()
        const contractsFramework = await sfDeployer.getFramework()
        const provider = accounts[0].provider
        sf = await Framework.create({
            chainId: 31337,
            provider: provider,
            resolverAddress: contractsFramework.resolver, //this is how to get the resolveraddress
            protocolReleaseVersion: "test",
        })
        console.log("Done initializing local superfluid framework...")

        //---------------------------------------------//
        //-----------Initialize Super Token------------//
        //---------------------------------------------//
        console.log("--------------------------------------")
        const MATICtokenDeployment = await sfDeployer.deployWrapperSuperToken(
            "Fake MATIC Token",
            "MATIC",
            18,
            ethers.utils.parseEther("300000000").toString()
        )
        MATICx = await sf.loadSuperToken("MATICx")
        await updateMATICxLocalAddress()
    } else {
        console.log("--------------------------------------")
        console.log("Deploy on the mumbai testnet...")
        const provider = new hre.ethers.providers.JsonRpcProvider(
            process.env.MUMBAI_RPC_URL
        )
        sf = await Framework.create({
            chainId: (await provider.getNetwork()).chainId,
            provider,
            customSubgraphQueriesEndpoint: "",
            dataMode: "WEB3_ONLY",
        })
        const MATICxAddress = process.env.MATICX_ADDRESS_MUMBAI
        const customHttpProvider = new ethers.providers.JsonRpcProvider(
            process.env.MUMBAI_RPC_URL
        )
        MATICx = new ethers.Contract(
            MATICxAddress,
            MATICxABI,
            customHttpProvider
        )
    }

    //--------------------------------------------//
    //------------DEPLOY SCRIPT-------------------//
    //--------------------------------------------//
    const args = [
        sf.settings.config.hostAddress,
        MATICx.address,
        process.env.UNISWAP_ROUTER_MUMBAI,
        30,
        process.env.fDAI_ADDRESS_MUMBAI,
    ]
    console.log("--------------------------------------")
    console.log("Deploying Superfluid Contract...")
    const SuperfluidStream = await deploy("SuperfluidStream", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmation: network.config.blockConfirmations || 1,
    })
    console.log("Contract deployed successfully...")
    console.log(`SuperfluidStream address:${SuperfluidStream.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.POLYGONSCAN_API_KEY
    ) {
        await verify(SuperfluidStream.address, args)
        console.log("Done verification...")
    }

    async function updateMATICxLocalAddress() {
        if (process.env.UPDATE_FRONT_END) {
            console.log("Updating MATICx local address to front-end...")
            const chainId = network.config.chainId.toString()
            const contractAddress = JSON.parse(
                fs.readFileSync(MATICxLocalAddress, "utf8")
            )
            if (chainId in contractAddress) {
                if (!contractAddress[chainId].includes(MATICx.address)) {
                    contractAddress[chainId].push(MATICx.address)
                }
            }
            {
                contractAddress[chainId] = [MATICx.address]
            }

            fs.writeFileSync(
                MATICxLocalAddress,
                JSON.stringify(contractAddress)
            )
            console.log("Done updating to front-end...")
        }
    }
}

module.exports.tags = ["all", "01-deploy"]
