module.exports.MATICxABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
            },
        ],
        name: "AgreementCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "penaltyAccount",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "rewardAccount",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardAmount",
                type: "uint256",
            },
        ],
        name: "AgreementLiquidated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "liquidatorAccount",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "penaltyAccount",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "bondAccount",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bailoutAmount",
                type: "uint256",
            },
        ],
        name: "AgreementLiquidatedBy",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "liquidatorAccount",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "targetAccount",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "rewardAccount",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rewardAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "int256",
                name: "targetAccountBalanceDelta",
                type: "int256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "liquidationTypeData",
                type: "bytes",
            },
        ],
        name: "AgreementLiquidatedV2",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "slotId",
                type: "uint256",
            },
        ],
        name: "AgreementStateUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "AgreementTerminated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
            },
        ],
        name: "AgreementUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenHolder",
                type: "address",
            },
        ],
        name: "AuthorizedOperator",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "bailoutAccount",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "bailoutAmount",
                type: "uint256",
            },
        ],
        name: "Bailout",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "operatorData",
                type: "bytes",
            },
        ],
        name: "Burned",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "operatorData",
                type: "bytes",
            },
        ],
        name: "Minted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "tokenHolder",
                type: "address",
            },
        ],
        name: "RevokedOperator",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "operatorData",
                type: "bytes",
            },
        ],
        name: "Sent",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "TokenDowngraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "TokenUpgraded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "authorizeOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
            },
        ],
        name: "createAgreement",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "defaultOperators",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "downgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "downgradeToETH",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "getAccountActiveAgreements",
        outputs: [
            {
                internalType: "contract ISuperAgreement[]",
                name: "activeAgreements",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "dataLength",
                type: "uint256",
            },
        ],
        name: "getAgreementData",
        outputs: [
            {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "agreementClass",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "slotId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "dataLength",
                type: "uint256",
            },
        ],
        name: "getAgreementStateSlot",
        outputs: [
            {
                internalType: "bytes32[]",
                name: "slotData",
                type: "bytes32[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getHost",
        outputs: [
            {
                internalType: "address",
                name: "host",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getUnderlyingToken",
        outputs: [
            {
                internalType: "address",
                name: "tokenAddr",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "granularity",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "underlyingToken",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "underlyingDecimals",
                type: "uint8",
            },
            {
                internalType: "string",
                name: "n",
                type: "string",
            },
            {
                internalType: "string",
                name: "s",
                type: "string",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "isAccountCritical",
        outputs: [
            {
                internalType: "bool",
                name: "isCritical",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isAccountCriticalNow",
        outputs: [
            {
                internalType: "bool",
                name: "isCritical",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "isAccountSolvent",
        outputs: [
            {
                internalType: "bool",
                name: "isSolvent",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "isAccountSolventNow",
        outputs: [
            {
                internalType: "bool",
                name: "isSolvent",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "tokenHolder",
                type: "address",
            },
        ],
        name: "isOperatorFor",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "liquidationTypeData",
                type: "bytes",
            },
            {
                internalType: "address",
                name: "liquidatorAccount",
                type: "address",
            },
            {
                internalType: "bool",
                name: "useDefaultRewardAccount",
                type: "bool",
            },
            {
                internalType: "address",
                name: "targetAccount",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "rewardAmount",
                type: "uint256",
            },
            {
                internalType: "int256",
                name: "targetAccountBalanceDelta",
                type: "int256",
            },
        ],
        name: "makeLiquidationPayoutsV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "operationApprove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "operationDowngrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "operationTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "operationUpgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "operatorData",
                type: "bytes",
            },
        ],
        name: "operatorBurn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "operatorData",
                type: "bytes",
            },
        ],
        name: "operatorSend",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "realtimeBalanceOf",
        outputs: [
            {
                internalType: "int256",
                name: "availableBalance",
                type: "int256",
            },
            {
                internalType: "uint256",
                name: "deposit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "owedDeposit",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "realtimeBalanceOfNow",
        outputs: [
            {
                internalType: "int256",
                name: "availableBalance",
                type: "int256",
            },
            {
                internalType: "uint256",
                name: "deposit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "owedDeposit",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "revokeOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "selfApproveFor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "userData",
                type: "bytes",
            },
        ],
        name: "selfBurn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "userData",
                type: "bytes",
            },
        ],
        name: "selfMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "selfTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "send",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "int256",
                name: "delta",
                type: "int256",
            },
        ],
        name: "settleBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "dataLength",
                type: "uint256",
            },
        ],
        name: "terminateAgreement",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
        ],
        name: "transferAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
            },
        ],
        name: "updateAgreementData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "slotId",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "slotData",
                type: "bytes32[]",
            },
        ],
        name: "updateAgreementStateSlot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "upgrade",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "upgradeByETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "upgradeByETHTo",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "upgradeTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

module.exports.tags = ["MATICxABI"]
