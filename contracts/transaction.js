export default {
    address: "0xc0905433AB6D7Ae60Cf4f2d68d1047b11c4C2AD6",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_coin_address",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_airdrop_address",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_stake_address",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "receive_amount",
                    "type": "uint256"
                }
            ],
            "name": "add_buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "pay_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "receive_amount",
                    "type": "uint256"
                }
            ],
            "name": "add_sell",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "buy_lists",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tran_no",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "start_time",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "pay_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "receive_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "is_redress",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tran_no",
                    "type": "uint256"
                }
            ],
            "name": "compensate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_all_buy_lists",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "trader",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tran_no",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "start_time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pay_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "receive_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "is_redress",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct Transaction.BuyTran[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_all_sell_lists",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "trader",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tran_no",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "start_time",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "pay_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "receive_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "is_redress",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct Transaction.SellTran[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_buy_lowest_price",
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
            "name": "get_sell_lowest_price",
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
                    "internalType": "uint256",
                    "name": "_tran_no",
                    "type": "uint256"
                }
            ],
            "name": "retract_buy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tran_no",
                    "type": "uint256"
                }
            ],
            "name": "retract_sell",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "sell_lists",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tran_no",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "start_time",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "pay_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "receive_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "is_redress",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tran_no",
                    "type": "uint256"
                }
            ],
            "name": "success_buy_list",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tran_no",
                    "type": "uint256"
                }
            ],
            "name": "success_sell_list",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eth",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_cb",
                    "type": "uint256"
                }
            ],
            "name": "with_draw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
