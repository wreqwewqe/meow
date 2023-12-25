const EthereumAddress = "0x1d7FcEFB785af9B9B4f2ca4a90F58daFECcFc34E"
const ScrollAddress = "0x64dAc864Ac782A79063a54d6b195E3899e54369D"
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "BorrowingDisabledOnReserve",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "_stableRateEnabled",
                "type": "bool"
            }
        ],
        "name": "BorrowingEnabledOnReserve",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveActivated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_ltv",
                "type": "uint256"
            }
        ],
        "name": "ReserveBaseLtvChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveDeactivated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_decimals",
                "type": "uint256"
            }
        ],
        "name": "ReserveDecimalsChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveDisabledAsCollateral",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_ltv",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_liquidationThreshold",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_liquidationBonus",
                "type": "uint256"
            }
        ],
        "name": "ReserveEnabledAsCollateral",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveFreezed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_aToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_interestRateStrategyAddress",
                "type": "address"
            }
        ],
        "name": "ReserveInitialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_strategy",
                "type": "address"
            }
        ],
        "name": "ReserveInterestRateStrategyChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_bonus",
                "type": "uint256"
            }
        ],
        "name": "ReserveLiquidationBonusChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_threshold",
                "type": "uint256"
            }
        ],
        "name": "ReserveLiquidationThresholdChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "ReserveUnfreezed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "StableRateDisabledOnReserve",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "StableRateEnabledOnReserve",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserve",
                "type": "address"
            }
        ],
        "name": "activateReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "deactivateReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "disableBorrowingOnReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "disableReserveAsCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "disableReserveStableBorrowRate",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "bool",
                "name": "_stableBorrowRateEnabled",
                "type": "bool"
            }
        ],
        "name": "enableBorrowingOnReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_baseLTVasCollateral",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_liquidationThreshold",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_liquidationBonus",
                "type": "uint256"
            }
        ],
        "name": "enableReserveAsCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "enableReserveStableBorrowRate",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "freezeReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "uint8",
                "name": "_underlyingAssetDecimals",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "_interestRateStrategyAddress",
                "type": "address"
            }
        ],
        "name": "initReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "string",
                "name": "_aTokenName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_aTokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "_underlyingAssetDecimals",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "_interestRateStrategyAddress",
                "type": "address"
            }
        ],
        "name": "initReserveWithData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract LendingPoolAddressesProvider",
                "name": "_poolAddressProvider",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolAddressesProvider",
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
        "inputs": [],
        "name": "refreshLendingPoolCoreConfiguration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_reserveToRemove",
                "type": "address"
            }
        ],
        "name": "removeLastAddedReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_ltv",
                "type": "uint256"
            }
        ],
        "name": "setReserveBaseLTVasCollateral",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_decimals",
                "type": "uint256"
            }
        ],
        "name": "setReserveDecimals",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_rateStrategyAddress",
                "type": "address"
            }
        ],
        "name": "setReserveInterestRateStrategyAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_bonus",
                "type": "uint256"
            }
        ],
        "name": "setReserveLiquidationBonus",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "name": "_threshold",
                "type": "uint256"
            }
        ],
        "name": "setReserveLiquidationThreshold",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "unfreezeReserve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

module.exports = {
    ConfiguratorABI: {
        abi,
        EthereumAddress,
        ScrollAddress
    },
}