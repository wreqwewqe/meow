const EthereumAddress = "0x2B794E2dd68495384496f5289e90fc50218fb7B2"
const ScrollAddress  = "0x466C687C7a9257541443A2Fc5885d704c90dd181"
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "HEALTH_FACTOR_LIQUIDATION_THRESHOLD",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "addressesProvider",
        "outputs": [
            {
                "internalType": "contract LendingPoolAddressesProvider",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "balanceDecreaseAllowed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_userCurrentBorrowBalanceTH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_userCurrentFeesETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_userCurrentLtv",
                "type": "uint256"
            }
        ],
        "name": "calculateCollateralNeededInETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "calculateUserGlobalData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalLiquidityBalanceETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalCollateralBalanceETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalBorrowBalanceETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalFeesETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentLtv",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentLiquidationThreshold",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "healthFactor",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "healthFactorBelowThreshold",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "core",
        "outputs": [
            {
                "internalType": "contract LendingPoolCore",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getHealthFactorLiquidationThreshold",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "getReserveConfigurationData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "ltv",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidationThreshold",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidationBonus",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "rateStrategyAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "usageAsCollateralEnabled",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "borrowingEnabled",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "stableBorrowRateEnabled",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "getReserveData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "totalLiquidity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "availableLiquidity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalBorrowsStable",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalBorrowsVariable",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "liquidityRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "variableBorrowRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stableBorrowRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "averageStableBorrowRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "utilizationRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "liquidityIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "variableBorrowIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "aTokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint40",
                        "name": "lastUpdateTimestamp",
                        "type": "uint40"
                    }
                ],
                "internalType": "struct LendingPoolDataProvider.Reserve",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserAccountData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalLiquidityETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalCollateralETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalBorrowsETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalFeesETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "availableBorrowsETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentLiquidationThreshold",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ltv",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "healthFactor",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserReserveData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "currentATokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentBorrowBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "principalBorrowBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "borrowRateMode",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "borrowRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidityRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "originationFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "variableBorrowIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastUpdateTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "usageAsCollateralEnabled",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract LendingPoolAddressesProvider",
                "name": "_addressesProvider",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

module.exports = {
    DataProviderABI: {
        abi,
        EthereumAddress,
        ScrollAddress
    },
}