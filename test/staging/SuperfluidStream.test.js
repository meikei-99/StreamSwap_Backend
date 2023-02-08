const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("SuperfluidStream.sol Staging Test", function () {
          let superfluidStream
          let SuperfluidStream
          let deployer
          const upgradeAmount = ethers.utils.parseEther("0.1")
          const downgradeAmount = ethers.utils.parseEther("0.04")
          const flowRatePerMonth = ethers.utils.parseEther("0.01")
          const updatedFlowRatePerMonth = ethers.utils.parseEther("0.02")
          const swapAmount = ethers.utils.parseEther("0.001")
          const tokenIn = process.env.MATICX_ADDRESS_MUMBAI
          const tokenOut = process.env.fDAI_ADDRESS_MUMBAI
          const duration = 3
          const player = "0xd803b0e6DC96a911f2314D3306E5f3779DbEF951"

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              superfluidStream = await deployments.get("SuperfluidStream")
              SuperfluidStream = await ethers.getContractAt(
                  superfluidStream.abi,
                  superfluidStream.address
              )
          })

          it("Upgrade function reverted if msg value < 0", async function () {
              const upgradeTx = await SuperfluidStream.upgradeMATIC({
                  value: ethers.utils.parseEther("0"),
              })
              await expect(upgradeTx.wait(1)).to.be.reverted
          })

          it("MATIC can be upgraded to MATICx", async () => {
              await expect(
                  SuperfluidStream.upgradeMATIC({
                      value: upgradeAmount,
                  })
              ).to.emit(SuperfluidStream, "UpgradeSuccess")
              const MATICxBalance = await SuperfluidStream.getMATICxBalance(
                  superfluidStream.address
              )
              assert.equal(MATICxBalance.toString(), upgradeAmount.toString())
          })

          it("MATICx can be donwgraded to MATIC", async () => {
              await expect(
                  SuperfluidStream.downgradeMATICx(downgradeAmount)
              ).to.emit(SuperfluidStream, "DowngradeSuccess")
              const MATICxBalance = await SuperfluidStream.getMATICxBalance(
                  superfluidStream.address
              )
              assert.equal((MATICxBalance / 1e18).toString(), 0.05)
          })

          it("Flow was created", async () => {
              const flowRatePerSecond = Math.floor(
                  flowRatePerMonth / 3600 / 24 / 30
              )
              await expect(
                  SuperfluidStream.createFlow(player, flowRatePerSecond)
              ).to.emit(SuperfluidStream, "FlowCreated")
          })

          it("Flow cannot be created if it was created before", async () => {
              const flowRatePerSecond = Math.floor(
                  flowRatePerMonth / 3600 / 24 / 30
              )
              const flowTx = await SuperfluidStream.createFlow(
                  player,
                  flowRatePerSecond
              )
              await expect(flowTx.wait(1)).to.be.reverted
          })

          it("Flow was updated", async () => {
              const flowRatePerSecond = Math.floor(
                  updatedFlowRatePerMonth / 3600 / 24 / 30
              )
              await expect(
                  SuperfluidStream.updateFlow(player, flowRatePerSecond)
              ).to.emit(SuperfluidStream, "FlowCreated")
          })

          it("Flow was deleted", async () => {
              await expect(SuperfluidStream.deleteFlow(player)).to.emit(
                  SuperfluidStream,
                  "FlowDeleted"
              )
          })

          it("Enter swap state successfully", async () => {
              const enterSwapTx = await SuperfluidStream.enterSwap()
              await enterSwapTx.wait(1)
              const swapState = await SuperfluidStream.getSwapState()
              assert.equal(swapState, 0)
          })

          //TODO:swap correctly with the specified duration
          //   it("Perform Upkeep", async () => {
          //       await new Promise(async (resolve, reject) => {
          //           console.log("In the promise...")
          //           SuperfluidStream.once("SwapSuccess", async () => {
          //               console.log("Swap Success!!!")
          //               try {
          //                   const swapState =
          //                       await SuperfluidStream.getSwapState()
          //                   assert.equal(swapState, 2)
          //                   resolve()
          //               } catch (e) {
          //                   console.log(e)
          //                   reject(e)
          //               }
          //           })
          //           console.log("Entering Swap....")
          //           const enterTx = await SuperfluidStream.enterSwap()
          //           await enterTx.wait(1)
          //           const swapStateEnter = await SuperfluidStream.getSwapState()
          //           assert.equal(swapStateEnter, 0)
          //           const swapTx = await SuperfluidStream.swap(
          //               swapAmount,
          //               tokenIn,
          //               tokenOut,
          //               duration
          //           )
          //           await swapTx.wait(1)
          //           console.log("Time to wait...")
          //       })
          //   })
      })
