import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShowList from "../components/ShowList"
import Transaction from "../components/Trasaction"
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { useAccount, useConnect, useSwitchNetwork, useNetwork } from 'wagmi'
import { Popover, Skeleton, Button, message } from "antd"
import ERC20, { ERC20ABI } from '../ABIs/ERC20';
import { getProviderOrSigner } from '../utils/ProviderOrSigner';
import { PoolABI } from '../ABIs/LendingPool';
import { total, calculateInterest, rayMul, rayToWad, rayDiv } from '../utils/getPrice';
import { CoreABI } from '../ABIs/LendingPoolCore';
import { PriceOracleABI } from '../ABIs/PriceOralce';
import axios from 'axios'
import { BaseURI, ETHEREUM_ADDRESS, EthereumCode, ScrollCode } from '../utils/constants';
import { BigNumber, Contract, ethers } from 'ethers'
import { useRouter } from 'next/router'
import { onChangeToScroll, userMessage } from '../utils/contractfunc'
import Eth from "../public/eth.png"
import Scroll from "../public/scroll.png"
export default function Dashboard() {
    axios.defaults.baseURL = BaseURI
    const [targetChain, setTargetChain] = useState("");
    const web3ModalRef = useRef();
    const [Supply, setSupply] = useState([]);
    const [AssetSupply, setAssetSupply] = useState([]);
    const [Borrow, setBorrow] = useState([]);
    const [AssetBorrow, setAssetBorrow] = useState([]);
    const [supplyBox, setSupplyBox] = useState([]);
    const [borrowBox, setBorrowBox] = useState([]);
    const [headBlockData, setHeadBlockData] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [assetSupplies, setAssetSupplies] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [assetBorrows, setAssetBorrows] = useState([]);
    const [rateMode, setRateMode] = useState(2);
    // const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false)
    const [operation, setOperation] = useState("")
    const [boxData, setBoxData] = useState()
    const [isChain, setIsChain] = useState(true)
    const [isError, setisError] = useState(false)
    const router = useRouter()
    const { chains, isLoading, pendingChainId, switchNetwork, status } =
        useSwitchNetwork({
            chainId: targetChain,
        })
    const { address, isConnecting, isDisconnected } = useAccount()
    const { chain } = useNetwork()
    const fetchData = async () => {
        try {
            const provider = await getProviderOrSigner(false, web3ModalRef);
                const queryString = window.location.search;
                const queryParams = new URLSearchParams(queryString);
                var code = queryParams.get('code');
                // console.log("code:",code?code:"");
                if ((chain.id == EthereumCode || chain.id == ScrollCode)) {
                    await userMessage(web3ModalRef, address, chain, code?code:"")
                }
            const PoolContract = new Contract(
                chain.id == EthereumCode ? PoolABI.EthereumAddress : PoolABI.ScrollAddress,
                PoolABI.abi,
                provider
            );
            const priceOracleContract = new Contract(
                chain.id == EthereumCode ? PriceOracleABI.EthereumAddress : PriceOracleABI.ScrollAddress,
                PriceOracleABI.abi,
                provider
            );
            const poolCore = new Contract(
                chain.id == EthereumCode ? CoreABI.EthereumAddress : CoreABI.ScrollAddress,
                CoreABI.abi,
                provider
            );

            let assetSupply = []
            let supplyData = []
            let assetBorrow = []
            let borrowData = []
            let supplies = []
            let assetSupplies = []
            let borrows = []
            let assetBorrows = []
            let net = ""
            if (chain.id == EthereumCode) {
                net = "Ethereum"
            }
            console.log(chain.id == 5);
            if (chain.id == ScrollCode) {
                net = "Scroll"
            }

            let totalAssetSupplyAPY = 0
            let totalAssetSupplyBalance = 0
            let totalAssetBorrowAPY = 0
            let totalAssetBorrowBalance = 0
            let collateralBalance = 0
            let supplyAPRave = 0
            var borrowButtonEnable = true;
            const borrowDatA = await axios.get('/borrow', { params: { address: address, net: net } })
            const userData = borrowDatA.data.data.userData
            // console.log("ssssadasd");
            // console.log(userData);
            const data = borrowDatA.data.data.borrowData
            const price = borrowDatA.data.data.borrowData[0].ETHUsd
            const healthFactor = userData.HealthFactor
            const E16 = BigNumber.from(10).pow(16)
            const bigZero = BigNumber.from(0)
            const E25 = BigNumber.from(10).pow(25)
            const E9 = BigNumber.from(10).pow(9)
            const E2 = BigNumber.from(100)
            const E18 = BigNumber.from(10).pow(18)


            for (let index = 0; index < data.length; index++) {
                const assetPrice = BigNumber.from(data[index]["PriceOracle"])
                const assetPriceUSD = assetPrice.mul(BigNumber.from(price)).div(E16).toNumber() / 100;

                if (BigNumber.from(userData.AvailableBorrow).gt(bigZero)) {
                    borrowButtonEnable = false;
                }

                const ERC20Contract = new Contract(
                    data[index]["TokenAddress"],
                    ERC20ABI.abi,
                    provider
                )
                const aToken = new Contract(
                    data[index]["ATokenAddress"],
                    ERC20ABI.abi,
                    provider
                )
                const atokenBalance = await aToken.balanceOf(address)
                var ERC20Balance = 0
                if (atokenBalance.isZero()) {
                    var ERC20Name = data[index]["Asset"]

                    var collateral = ""
                    var buttonEnable = false;


                    if (data[index]["TokenAddress"] == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
                        const balance = await provider.getBalance(address);
                        var ethBalance = ethers.utils.formatEther(balance);
                        ERC20Balance = ethBalance.substring(0, ethBalance.indexOf('.', 0) + 3);
                    } else {
                        const erc20balance = await ERC20Contract.balanceOf(address);
                        // const decimals = await ERC20Contract.decimals();
                        ERC20Balance = ((erc20balance.div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber()) / 100).toFixed(2);
                    }

                    if (data[index]["Collateral"] == 1) {
                        collateral = "\u2714"
                    } else {
                        collateral = "——"
                    }

                    if (ERC20Balance == 0) {
                        buttonEnable = true;
                    }
                    assetSupplies.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "key": assetSupplies.length + 1, "name": [data[index]["Name"], ERC20Name], "ERC20Name": ERC20Name, "balance": ERC20Balance, "APY": (BigNumber.from(data[index]["SupplyAPY"]).div(E25).toNumber() / 100).toFixed(2), "collateral": collateral, "buttonEnable": buttonEnable, "assetAddress": data[index]["TokenAddress"], "walletBalance": ERC20Balance, "price": assetPriceUSD, "healthFactor": healthFactor, "Balance": 0 })
                } else {
                    var ERC20Name = data[index]["Asset"]
                    var collateral = ""

                    if (data[index]["TokenAddress"] == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
                        const balance = await provider.getBalance(address);
                        var ethBalance = ethers.utils.formatEther(balance);
                        ERC20Balance = ethBalance.substring(0, ethBalance.indexOf('.', 0) + 3);
                    } else {
                        const erc20balance = await ERC20Contract.balanceOf(address);
                        // const decimals = await ERC20Contract.decimals();
                        ERC20Balance = ((erc20balance.div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber()) / 100).toFixed(2);
                    }


                    var assetBalance = (atokenBalance.div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber() / 100).toFixed(2);
                    var assetAPY = (BigNumber.from(data[index]["SupplyAPY"]).div(E25).toNumber() / 100).toFixed(2);
                    var TotalAssetSupplyAPY = totalAssetSupplyAPY + assetAPY * assetBalance * assetPriceUSD;
                    totalAssetSupplyAPY = Math.floor(TotalAssetSupplyAPY);

                    if (data[index]["Collateral"] == 1) {
                        collateral = "\u2714"
                        collateralBalance += assetBalance * assetPriceUSD;
                    } else {
                        collateral = "——"
                    }
                    supplies.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "withdrawIsable": healthFactor > 1||healthFactor=="\u00A0\u00A0\u00A0\u00A0\u221E", "key": supplies.length + 1, "name": [data[index]["Name"], ERC20Name], "totalDeposit": assetBalance, "ERC20Name": ERC20Name, "balance": assetBalance, "APY": assetAPY, "collateral": collateral, "walletBalance": ERC20Balance, "price": assetPriceUSD, "healthFactor": healthFactor, "assetAddress": data[index]["TokenAddress"], "Balance": assetBalance, "aTokenAddress": data[index]["ATokenAddress"] })
                }

                if (data[index]["Balance"] == "" || data[index]["Balance"] === "0") {
                    // console.log("sssssssssssssssssssssssssssssss");
                    var ERC20Name = data[index]["Asset"]
                    var ERC20Balance = 0


                    if (assetPrice.eq(bigZero) || userData["AvailableBorrow"] == "0" || data[index]["AvailableLiquidity"] == "0") {
                        console.log(data[index]["Name"]);
                        assetBorrows.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "borrowIsable": healthFactor > 1||healthFactor=="\u00A0\u00A0\u00A0\u00A0\u221E", "key": assetBorrows.length + 1, "name": [data[index]["Name"],ERC20Name], "price": assetPriceUSD, "balance": 0, "assetAddress": data[index]["TokenAddress"], "healthFactor": healthFactor, "ERC20Name": ERC20Name, "available": (0).toFixed(2), "APYV": (BigNumber.from(data[index]["BorrowAPYv"]).div(E25).toNumber() / 100).toFixed(2), "APYS": (BigNumber.from(data[index]["BorrowAPYs"]).div(E25).toNumber() / 100).toFixed(2), "buttonEnable": true })
                    } else {
                        var availableBorrow = 0
                        if (BigNumber.from(userData["AvailableBorrow"]).div(assetPrice).lt(BigNumber.from(data[index]["AvailableLiquidity"]).div(BigNumber.from(10).pow(data[index]["Decimals"])))) {
                            availableBorrow = BigNumber.from(userData["AvailableBorrow"]).mul(E2).div(assetPrice).toNumber() / 100
                            console.log("上",data[index]["Name"]);
                        } else {
                            console.log("下",data[index]["Name"]);
                            availableBorrow = (BigNumber.from(data[index]["AvailableLiquidity"]).div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber() / 100).toFixed(2)
                        }
                        assetBorrows.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "borrowIsable": healthFactor > 1 ||healthFactor=="\u00A0\u00A0\u00A0\u00A0\u221E", "key": assetBorrows.length + 1, "name": [data[index]["Name"], ERC20Name], "price": assetPriceUSD, "balance": 0, "assetAddress": data[index]["TokenAddress"], "healthFactor": healthFactor, "ERC20Name": ERC20Name, "available": availableBorrow, "APYV": (BigNumber.from(data[index]["BorrowAPYv"]).div(E25).toNumber() / 100).toFixed(2), "APYS": (BigNumber.from(data[index]["BorrowAPYs"]).div(E25).toNumber() / 100).toFixed(2), "buttonEnable": borrowButtonEnable })
                    }
                } else {
                    var ERC20Name = data[index]["Asset"]
                    var borrowRateMode = ""
                    var borrowAPY
                    let cumlatedInterest = bigZero

                    if (data[index]["RateMode"] == 1) {
                        borrowRateMode = "Stable";
                        const userlastupdate = await poolCore.getUserLastUpdate(data[index]["TokenAddress"], address)
                        borrowAPY = (BigNumber.from(data[index]["BorrowAPYs"]).div(E25).toNumber() / 100).toFixed(2);
                        // console.log("borrowapyssssssssssssss"+borrowAPY);
                        cumlatedInterest = calculateInterest(BigNumber.from(data[index]["BorrowAPYs"]), userlastupdate)
                    } else {
                        borrowRateMode = "Variable";
                        const userlastindex = await poolCore.getUserVariableBorrowCumulativeIndex(data[index]["TokenAddress"], address)
                        borrowAPY = (BigNumber.from(data[index]["BorrowAPYv"]).div(E25).toNumber() / 100).toFixed(2);
                        cumlatedInterest = rayDiv(rayMul(calculateInterest(BigNumber.from(data[index]["BorrowAPYv"]), parseInt(data[index]["LastUpdate"])), BigNumber.from(data[index]["LastIndex"])), userlastindex)
                    }

                    let currentBorrowBalancE = rayToWad(rayMul(BigNumber.from(data[index]["Balance"]).mul(E9), cumlatedInterest))

                    let borrowBalance = (currentBorrowBalancE.div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber() / 100).toFixed(2);
                    var TotalAssetBorrowAPY = totalAssetBorrowAPY + borrowAPY * borrowBalance * assetPriceUSD;
                    totalAssetBorrowAPY = Math.floor(TotalAssetBorrowAPY);
                    if (assetPrice.eq(bigZero) || data[index]["AvailableLiquidity"] == "0") {
                        borrows.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "borrowIsable": healthFactor > 1||healthFactor=="\u00A0\u00A0\u00A0\u00A0\u221E", "key": borrows.length + 1, "name": [data[index]["Name"], ERC20Name], "totalBorrow": currentBorrowBalancE, "ERC20Name": ERC20Name, "balance": borrowBalance, "APY": borrowAPY, "APYType": borrowRateMode, "price": assetPriceUSD, "assetAddress": data[index]["TokenAddress"], "healthFactor": healthFactor, "available": (0).toFixed(2), "WalletBalance": ERC20Balance })
                    } else {
                        var availableBorrow = 0
                        if (BigNumber.from(userData["AvailableBorrow"]).div(assetPrice).lt(BigNumber.from(data[index]["AvailableLiquidity"]).div(BigNumber.from(10).pow(data[index]["Decimals"])))) {
                            availableBorrow = BigNumber.from(userData["AvailableBorrow"]).mul(E2).div(assetPrice).toNumber() / 100
                            console.log("上",data[index]["Name"]);
                        } else {
                            console.log("下",data[index]["Name"]);
                            availableBorrow = (BigNumber.from(data[index]["AvailableLiquidity"]).div(BigNumber.from(10).pow(data[index]["Decimals"] - 2)).toNumber() / 100).toFixed(2)
                        }
                        borrows.push({ "net": chain.id == EthereumCode ? "Ethereum" : "Scroll", "borrowIsable": healthFactor > 1||healthFactor=="\u00A0\u00A0\u00A0\u00A0\u221E", "key": borrows.length + 1, "name": [data[index]["Name"], ERC20Name], "totalBorrow": currentBorrowBalancE, "ERC20Name": ERC20Name, "balance": borrowBalance, "APY": borrowAPY, "APYType": borrowRateMode, "price": assetPriceUSD, "assetAddress": data[index]["TokenAddress"], "healthFactor": healthFactor, "available": availableBorrow, "WalletBalance": ERC20Balance })
                    }
                }
            }

            //todo
            if (userData["TotalLiquidity"] == "0") {
                setSupplyBox(
                    []
                )
            } else {
                var SupplyBalance = BigNumber.from(userData["TotalLiquidity"]).mul(BigNumber.from(price)).div(E18);
                totalAssetSupplyBalance = total(SupplyBalance);
                var supplyAPYAve = (BigNumber.from(totalAssetSupplyAPY).mul(E2).div(SupplyBalance).toNumber() / 100).toFixed(2);
                supplyAPRave = supplyAPYAve;
                var CollateralBalance = total(BigNumber.from(userData["TotalCollateral"]).mul(BigNumber.from(price)).div(E18));
                var supplyBoxTitle = [totalAssetSupplyBalance, supplyAPYAve, "$" + CollateralBalance];
                //todo
                setSupplyBox(supplyBoxTitle)
            }
            var BorrowBalance = BigNumber.from(userData["TotalBorrow"]).mul(BigNumber.from(price)).div(E18);
            if (BorrowBalance.eq(BigNumber.from(0))) {
                setBorrowBox(
                    <div class="MuiBox-root css-1xifpgy">
                        <p class="MuiTypography-root MuiTypography-description css-1kns0b6"> Nothing borrowed yet</p>
                    </div>
                )
            } else {
                totalAssetBorrowBalance = total(BorrowBalance);
                // console.log("total"+totalAssetBorrowAPY);
                var borrowAPYAve = (BigNumber.from(totalAssetBorrowAPY).mul(E2).div(BorrowBalance).toNumber() / 100).toFixed(2);
                var borrowUsed = 100
                if (!BigNumber.from(userData["AvailableBorrow"]).isZero()) {
                    const a = (BigNumber.from(userData["TotalCollateral"])).mul(userData["Ltv"]).div(E2)
                    const b = BigNumber.from(25).mul(BigNumber.from(10).pow(14))
                    const c = E18
                    const d = a.sub(c.div(2).add(a.mul(b)).div(c))
                    borrowUsed = (BigNumber.from(userData["TotalBorrow"]).add(BigNumber.from(userData["TotalFee"])).mul(BigNumber.from(10000)).div(d).toNumber() / 100).toFixed(2)
                }
                // var borrowUsed = (userData.totalBorrowsETH.mul(BigNumber.from(10000))).div(userData.totalCollateralETH.mul(userData.currentLiquidationThreshold)).toNumber();
                var borrowBoxTitle = [totalAssetBorrowBalance, borrowAPYAve, borrowUsed + "%"];
                //todo
                setBorrowBox(borrowBoxTitle)
            }


            setSupplies(supplies);
            setAssetSupplies(assetSupplies);
            setBorrows(borrows)
            setAssetBorrows(assetBorrows)

            setSupply(supplyData);
            setAssetSupply(assetSupply);
            setBorrow(borrowData);
            setAssetBorrow(assetBorrow);
            setHeadBlockData(["$" + totalAssetSupplyBalance, supplyAPRave + "%", healthFactor])

            // setData(true);

        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // console.log("chainssssssssssssss",chains);
        if (targetChain) {
            if (targetChain == "534352") {
                // switchNetwork();
                onChangeToScroll(ethereum, setLoading)
            } else {
                switchNetwork();
            }

        }

    }, [targetChain])
    useEffect(() => {
        if (address && chain.id) {
            setLoading(true)
            fetchData()
        }
    }, [address])

    useEffect(() => {
        if (status == "loading" && targetChain != chain.id.toString()) {
            setLoading(true)
        }
        if (status == "error") {
            setTargetChain(chain.id.toString())
            setLoading(false)
        }
    }, [status, targetChain])

    useEffect(() => {
        setError("")
        if (chain) {
            if (address && chain.id) {
                setLoading(true)
                fetchData()
            }
            if (chain.id == EthereumCode || chain.id == ScrollCode) {
                setIsChain(false)
            } else {
                setIsChain(true)
            }
        }
    }, [chain])
    useEffect(() => {
        if (error) {
            setisError(true)
        } else {
            setisError(false)
        }
        console.log("error:",error);
        console.log("iserror:", isError);
    }, [error])

    const content = (
        <div className='w-[317px] text-[18px] font-medium'>
            <p className='cursor-pointer flex items-center' onClick={() => {
                setTargetChain("5");
            }}> <Image width={40} src={Eth} className='mr-[13px]'></Image> Ethereum Market</p>
            <p className='cursor-pointer flex items-center' onClick={() => {
                setTargetChain("534351");
            }}> <Image width={40} src={Scroll} className='mr-[13px]'></Image>Scroll Market</p>
        </div>
    );
    const button_style = 'box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none';


    const your_supply_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<div className='font-bold text-[16px]' >{text[0]}<div className='font-normal text-[#c8cad3] text-[16px]'>{text[1]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Balance</div>,
            dataIndex: 'balance',
            key: 'balance',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'APY',
            key: 'APY',
            render: (text) => (<div className='font-semibold'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>Can be Collateral</div>,
            dataIndex: 'collateral',
            key: 'collateral',
            render: (text) => <div className='text-center'> {text} </div>
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>
                <button className={record.withdrawIsable ? 'bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none' : 'bg-[#F4B512]/[0.6] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none'} onClick={() => { setOperation("Withdraw"); setBoxData(record); setOpen(true) }} disabled={!record.withdrawIsable}>Withdraw</button>
                <Button className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer' onClick={() => { setOperation("Supply"); setBoxData(record); setOpen(true) }}>Supply</Button>
            </div>)
        }
    ];
    const your_borrow_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<div className='font-bold text-[16px]' >{text[0]}<div className='font-normal text-[#c8cad3] text-[16px]'>{text[1]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Debt</div>,
            dataIndex: 'balance',
            key: 'balance',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'APY',
            key: 'APY',
            render: (text) => (<div className='font-semibold'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>APY type</div>,
            dataIndex: 'APYType',
            key: 'APYType',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>
                <Button className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none' onClick={() => { setOperation("Repay"); setBoxData(record); setOpen(true) }}>Repay</Button>
                <Button className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer' disabled={!record.borrowIsable} onClick={() => { setOperation("Borrow"); setBoxData(record); setOpen(true) }}>Borrow</Button>
            </div>)
        }
    ];

    const supply_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<div className='font-bold text-[16px]' >{text[0]}<div className='font-normal text-[#c8cad3] text-[16px]'>{text[1]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Wallet balance</div>,
            dataIndex: 'balance',
            key: 'balance',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'APY',
            key: 'APY',
            render: (text) => (<div className='font-semibold'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>Can be Collateral</div>,
            dataIndex: 'collateral',
            key: 'collateral',
            render: (text) => <div className='text-center'> {text} </div>
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>
                <Button className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none' onClick={() => { setOperation("Supply"); setBoxData(record); setOpen(true) }}>Supply</Button>
                <Button className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer' onClick={() => router.push('/Details?asset=' + record.name[0] + '&&net=' + record.net)}>Details</Button>
            </div>)
        }
    ];

    const borrow_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<div className='font-bold text-[16px]' >{text[0]}<div className='font-normal text-[#c8cad3] text-[16px]'>{text[1]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Available</div>,
            dataIndex: 'available',
            key: 'available',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY,variable</div>,
            dataIndex: 'APYV',
            key: 'APYV',
            render: (text) => (<div className='font-semibold'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY,stable</div>,
            dataIndex: 'APYS',
            key: 'APYS',
            render: (text) => (<div className='font-semibold'>{text}%</div>)
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>
                <button className={record.borrowIsable ? 'bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none' : 'bg-[#F4B512]/[0.6] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer border-none'} onClick={() => { setOperation("Borrow"); setBoxData(record); setOpen(true) }} disabled={!record.borrowIsable}>Borrow</button>
                <Button className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer' onClick={() => router.push('/Details?asset=' + record.name[0] + '&&net=' + record.net)}>Details</Button>
            </div>)
        }
    ];
    // if(error){
    //     return <p>Error: {error.message}</p>;
    // }
    return (
        <div className='min-h-full '>
            <Header></Header>
            {address ? <div className='box-border  py-[64px] px-[112px] '>
                <div className='h-[118px] mb-[64px]'>
                    <Popover content={content} placement="bottom">
                        <div className='text-[32px] font-bold w-[317px]'>{chain.id == EthereumCode ? "Ethereum Market" : chain.id == ScrollCode ? "Scroll Market" : "Please select the network you want!"} <DownOutlined className='text-[16px] cursor-pointer ' /> </div>
                    </Popover>
                    <div className='flex mt-[16px] mb-[8px] text-[16px] font-normal text-[#5F6D7E] '>
                        <div className='w-[174px] mr-[16px]'>Net worth</div>
                        <div className='w-[174px] mr-[16px]'>Net APY</div>
                        <div className='w-[174px]'>Health Factor</div>
                    </div>
                    <div className='flex text-[22px] text-[#272D37] font-semibold'>
                        <div className='w-[174px] mr-[16px]'>{loading || isChain || isError ? "" : headBlockData[0]}</div>
                        <div className='w-[174px] mr-[16px]'>{loading || isChain || isError ? "" : headBlockData[1]}</div>
                        <div>{loading || isChain || isError ? "" : headBlockData[2]}</div>
                    </div>
                </div>
                {/* <div className='flex mb-[29px] justify-between'>
                    <div className=' basis-[48%]'>
                        <ShowList title="Your supplies" about_me={true} data={supplies} columns={your_supply_columns} header={supplyBox} loading={loading || isChain || isError}></ShowList>
                    </div>
                    <div className=' basis-[48%]'>
                        <ShowList title="Your borrows" about_me={true} data={borrows} columns={your_borrow_columns} header={borrowBox} supply={false} loading={loading || isChain || isError}></ShowList>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className=' basis-[48%]'>
                        <ShowList title="Assets to supply" data={assetSupplies} columns={supply_columns} loading={loading || isChain || isError}></ShowList>
                    </div>
                    <div className=' basis-[48%]'>
                        <ShowList title="Assets to borrow" data={assetBorrows} columns={borrow_columns} loading={loading || isChain || isError}></ShowList>
                    </div>
                </div> */}
                 <div className='columns-2'>
                    <div className='inline-block w-full  mb-[10px]' >
                        <ShowList title="Your supplies" about_me={true} data={supplies} columns={your_supply_columns} header={supplyBox} loading={loading || isChain || isError}></ShowList>
                    </div>
                    <div className='inline-block w-full  '>
                        <ShowList title="Assets to supply" data={assetSupplies} columns={supply_columns} loading={loading || isChain || isError}></ShowList>
                    </div >
                    <div className=' inline-block w-full  mb-[10px]'>
                        <ShowList title="Your borrows" about_me={true} data={borrows} columns={your_borrow_columns} header={borrowBox} supply={false} loading={loading || isChain || isError}></ShowList>
                    </div>

                    <div className='inline-block w-full  '>
                        <ShowList title="Assets to borrow" data={assetBorrows} columns={borrow_columns} loading={loading || isChain || isError}></ShowList>
                    </div>
                </div>
            </div>: <div className=' text-center h-[400px]'>
                <div className='mt-[200px] font-bold text-[24px] mb-[64px]'>please,connet your wallet</div>
                <ConnectButton.Custom>
                    {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        authenticationStatus,
                        mounted,
                    }) => {
                        // Note: If your app doesn't use authentication, you
                        // can remove all 'authenticationStatus' checks

                        const ready = mounted && authenticationStatus !== 'loading';
                        const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                                authenticationStatus === 'authenticated');

                        return (
                            <div
                                {...(!ready && {
                                    'aria-hidden': true,
                                    'style': {
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        userSelect: 'none',
                                    },
                                })}
                            >
                                {(() => {
                                    if (!connected) {
                                        return (
                                            <button onClick={openConnectModal} type="button" className={button_style}>
                                                Connect Wallet
                                            </button>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button onClick={openChainModal} type="button" className={button_style}>
                                                Wrong network
                                            </button>
                                        );
                                    }

                                    return (
                                        <Popover content={content}>
                                            <div style={{ display: 'flex', gap: 12 }}>

                                                <button type="button" className={button_style}>
                                                    {account.displayName}

                                                </button>
                                            </div>
                                        </Popover>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
                {/* <button className='box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none'>Connect wallet</button> */}
            </div>
            }
            <Transaction title={operation} open={open} setOpen={setOpen} data={boxData} web3modal={web3ModalRef} address={address} chain={chain}></Transaction>
            <Footer></Footer>
        </div >
    )
}
