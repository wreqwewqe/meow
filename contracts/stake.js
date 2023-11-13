export default {
    address: "0xa6d1383B722FDDd874123F6D5C016106CA39513A",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_coin_address",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "power",
                    "type": "uint256"
                }
            ],
            "name": "Power",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "address_to_discount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "recommend_transaction_fee",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "my_transaction_fee",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "address_to_power",
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
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "address_to_stake_order",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "stake_no",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stake_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stake_period",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "start_stake_time_timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "power",
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
                    "name": "stake_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stake_period",
                    "type": "uint256"
                }
            ],
            "name": "calculate_power",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "get_order_list",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "stake_no",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stake_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "stake_period",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "start_stake_time_timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "power",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Stake.StakeOrder[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_order_list_length",
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
                    "name": "stake_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "stake_period",
                    "type": "uint256"
                }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "stake_no",
                    "type": "uint256"
                }
            ],
            "name": "withdraw_stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
};
