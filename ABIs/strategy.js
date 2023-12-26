const address = "0x69ed2c19b58d54c43fa52b6b6f530f851b28251b"
const abi =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_reserve",
          "type": "address"
        },
        {
          "internalType": "contract LendingPoolAddressesProvider",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_baseVariableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_variableRateSlope1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_variableRateSlope2",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stableRateSlope1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stableRateSlope2",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "EXCESS_UTILIZATION_RATE",
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
      "name": "OPTIMAL_UTILIZATION_RATE",
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
      "inputs": [],
      "name": "baseVariableBorrowRate",
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
          "name": "_reserve",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_availableLiquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalBorrowsStable",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalBorrowsVariable",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_averageStableBorrowRate",
          "type": "uint256"
        }
      ],
      "name": "calculateInterestRates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "currentLiquidityRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentStableBorrowRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentVariableBorrowRate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBaseVariableBorrowRate",
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
      "name": "getStableRateSlope1",
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
      "name": "getStableRateSlope2",
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
      "name": "getVariableRateSlope1",
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
      "name": "getVariableRateSlope2",
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
      "name": "stableRateSlope1",
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
      "name": "stableRateSlope2",
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
      "name": "variableRateSlope1",
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
      "name": "variableRateSlope2",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  module.exports = {
    StrategyABI: {
        abi,
        address,
    },
}