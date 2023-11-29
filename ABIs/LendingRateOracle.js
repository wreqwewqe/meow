const EthereumAddress = "0x7A5CCc62968BF8D12B6c3ACc83228Da877122d54"
const ScrollAddress = "0xA2378033c0892a8BD0c46166debd660E02367403"
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_asset",
                "type": "address"
            }
        ],
        "name": "getMarketBorrowRate",
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
                "name": "_asset",
                "type": "address"
            }
        ],
        "name": "getMarketLiquidityRate",
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
                "name": "_asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "setMarketBorrowRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "setMarketLiquidityRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

module.exports = {
    RateOracleABI: {
        abi,
        EthereumAddress,
        ScrollAddress
    },
}