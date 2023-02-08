// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
pragma abicoder v2;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";
import {ISETHCustom} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ISETH.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

error SuperfluidStream__NotEnoughSuperToken(
    address sender,
    uint256 superAmount
);
error SuperfluidStream__NoSuperTokenToDowngrade();
error SuperfluidStream__FlowHadBeenCreatedToThisReceiver(
    address sender,
    uint superAmount
);
error SuperfluidStream__FlowToTheReceiverExist();

contract SuperfluidStream is ReentrancyGuard, AutomationCompatibleInterface {
    /**Type Variables */
    enum SwapState {
        OPEN,
        PENDING,
        CLOSE
    }

    struct SwappingAddress {
        address from;
        address to;
    }
    event UpgradeSuccess(address sender, uint256 upgradeAmount);
    event DowngradeSuccess(address sender, uint256 downgradeAmount);
    event FlowCreated(address sender, address receiver, int96 flowRatePerMonth);
    event FlowDeleted(address sender, address receiver);
    event SwapSuccess();

    /**State Variable */
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaLib;
    using SuperTokenV1Library for ISuperToken;

    ISuperToken private immutable i_tokenAddress;
    ISuperToken private immutable i_fDAIAddress;
    ISwapRouter private immutable i_swapRouter;
    SwapState private s_swapState;
    uint24 public constant POOL_FEE = 3000;
    uint256 private immutable i_interval;
    uint256 private lastTimeStamp;
    uint256 private s_swapperSwapAmount;
    address private s_swapFrom;
    address private s_swapTo;
    uint256 private s_swapTime;
    uint256 private s_duration;

    mapping(address => mapping(address => int96)) private s_streamCreated;

    constructor(
        ISuperfluid host,
        ISuperToken tokenAddress,
        ISwapRouter _swapRouter,
        uint256 interval,
        ISuperToken fDAIAddress
    ) {
        i_tokenAddress = tokenAddress;
        i_swapRouter = _swapRouter;
        i_interval = interval;
        s_swapState = SwapState.CLOSE;
        i_fDAIAddress = fDAIAddress;

        cfaLib = CFAv1Library.InitData(
            host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    receive() external payable {}

    fallback() external payable {}

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bool isSwapOpen = (SwapState.OPEN == s_swapState);
        bool isSwapPending = (SwapState.PENDING == s_swapState);
        bool timePassed = (block.timestamp - lastTimeStamp) >= i_interval;
        upkeepNeeded = (isSwapOpen || isSwapPending) && timePassed;
    }

    //TODO:link swapstate to each msg.sender to allow multiple entry at one time
    //TODO:amend block.timestamp so that lastTimeStamp will be taken during "swap" not "enterSwap"
    function enterSwap() external {
        s_swapState = SwapState.OPEN;
        lastTimeStamp = block.timestamp;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        s_swapTime += 1;
        if (s_swapTime < s_duration) {
            if (upkeepNeeded) {
                swap(s_swapperSwapAmount, s_swapFrom, s_swapTo, s_duration);
                lastTimeStamp = block.timestamp;
            }
            s_swapState = SwapState.PENDING;
        }
        if (s_swapTime == s_duration) {
            s_swapState = SwapState.CLOSE;
            s_swapTime = 0;
            emit SwapSuccess();
        }
    }

    function swap(
        uint256 amountIn,
        address tokenIn,
        address tokenOut,
        uint256 duration
    ) public returns (uint256 amountOut) {
        s_swapperSwapAmount = amountIn;
        s_swapFrom = tokenIn;
        s_swapTo = tokenOut;
        s_duration = duration;
        TransferHelper.safeApprove(tokenIn, address(i_swapRouter), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: POOL_FEE,
                recipient: address(this),
                deadline: block.timestamp, //make sure the swap wont go on forever as the price of token might shift
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
        amountOut = i_swapRouter.exactInputSingle(params);
    }

    function upgradeMATIC() external payable nonReentrant {
        if (msg.value <= 0) {
            revert SuperfluidStream__NotEnoughSuperToken(msg.sender, msg.value);
        }

        ISETHCustom(address(i_tokenAddress)).upgradeByETHTo{value: msg.value}(
            address(this)
        );
        emit UpgradeSuccess(msg.sender, msg.value);
    }

    function downgradeMATICx(uint256 wad) external {
        ISETHCustom(address(i_tokenAddress)).downgradeToETH(wad); //this will transfer MATIC back to smart contract address
        payable(msg.sender).transfer(wad); //this is to transfer the MATIC back to sender's account
        emit DowngradeSuccess(msg.sender, wad);
    }

    function createFlow(address receiver, int96 flowRatePerMonth) external {
        if (s_streamCreated[msg.sender][receiver] > 0) {
            revert SuperfluidStream__FlowToTheReceiverExist();
        }
        s_streamCreated[msg.sender][receiver] = flowRatePerMonth;
        int96 flowRatePerSecond = (flowRatePerMonth / 3600 / 24 / 30);
        i_tokenAddress.createFlow(receiver, flowRatePerSecond);
        emit FlowCreated(msg.sender, receiver, flowRatePerMonth);
    }

    function updateFlow(address receiver, int96 flowRatePerMonth) external {
        s_streamCreated[msg.sender][receiver] = flowRatePerMonth;
        int96 flowRatePerSecond = (flowRatePerMonth / 3600 / 24 / 30);
        i_tokenAddress.updateFlow(receiver, flowRatePerSecond);
        emit FlowCreated(msg.sender, receiver, flowRatePerMonth);
    }

    function deleteFlow(address receiver) external {
        delete (s_streamCreated[msg.sender][receiver]);
        i_tokenAddress.deleteFlow(address(this), receiver);
        emit FlowDeleted(msg.sender, receiver);
    }

    function withdrawfDAI(uint256 fDAIAmountOut) external {
        ISuperToken(i_fDAIAddress).transfer(msg.sender, fDAIAmountOut);
    }

    function getMATICxBalance(address receiver) public view returns (uint256) {
        return ISuperToken(i_tokenAddress).balanceOf(receiver);
    }

    function getSwapState() public view returns (SwapState) {
        return s_swapState;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return lastTimeStamp;
    }

    function getSwapperSwapAmount() public view returns (uint256) {
        return s_swapperSwapAmount;
    }

    function getSwapFrom() public view returns (address) {
        return s_swapFrom;
    }

    function getSwapTo() public view returns (address) {
        return s_swapTo;
    }

    function getSwapTime() public view returns (uint256) {
        return s_swapTime;
    }

    function getDuration() public view returns (uint256) {
        return s_duration;
    }
}
