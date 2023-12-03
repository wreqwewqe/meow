import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Transaction from "../components/Trasaction"
import { Progress } from "antd"
import { WalletOutlined } from '@ant-design/icons';
import { useAccount, useConnect, useSwitchNetwork, useNetwork } from 'wagmi'
import { getProviderOrSigner } from '../utils/ProviderOrSigner';
import axios from 'axios'
import { BaseURI, ETHEREUM_ADDRESS } from '../utils/constants';
import { BigNumber, Contract, ethers } from 'ethers'
import ERC20, { ERC20ABI } from '../ABIs/ERC20';
import { PoolABI } from '../ABIs/LendingPool';
import { total, calculateInterest, rayMul, rayToWad, rayDiv } from '../utils/getPrice';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { intersetRate } from "../utils/constants"

export default function EthDetails() {
    axios.defaults.baseURL = BaseURI
    const rcharts = useRef();
    const [asset, setAsset] = useState("");
    const [network, setNetwork] = useState("");
    const [detailData, setDetail] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { chain } = useNetwork()
    const web3ModalRef = useRef();
    const [borrowData, setBorrow] = useState({})
    const [supplyData, setSupply] = useState({})
    const [open, setOpen] = useState(false)
    const [operation, setOperation] = useState("")
    const [boxData, setBoxData] = useState()
    const { address, isConnecting, isDisconnected } = useAccount()
    useEffect(() => {
        const queryString = window.location.search;
        const queryParams = new URLSearchParams(queryString);
        var assetname = queryParams.get('asset');
        var net = queryParams.get("net")
        if (assetname == null) {
            assetname = "ETH"
        }
        setAsset(assetname);
        setNetwork(net)
    }, [address, chain])

    const fetchData = async () => {
        try {
            const Data = await axios.get('/detail', { params: { asset: asset, net: network } })
            const data = Data.data.data.assetdata
            console.log(data);
            const E2 = BigNumber.from(100)

            const assetDate = {}
            assetDate.name = data["Name"]
            assetDate.ltv = data["LTV"]
            assetDate.lt = data["LiquidationThreshold"]
            assetDate.lp = data["LiquidationBonus"]
            assetDate.coin = data["Asset"]
            assetDate.supplyapy = (BigNumber.from(data['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.apys = (BigNumber.from(data['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.apyv = (BigNumber.from(data['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.totalBorrow = total(BigNumber.from(data['TotalBorrow']).div(BigNumber.from(10).pow(data["Decimals"] - 2)))
            assetDate.totalsupply = total(BigNumber.from(data['TotalLiquidity']).div(BigNumber.from(10).pow(data["Decimals"] - 2)))
            assetDate.size = total(BigNumber.from(data['MaxSupply']).mul(BigNumber.from(100)))
            assetDate.cycle = (BigNumber.from(data['TotalLiquidity']).div(BigNumber.from(data['MaxSupply'])).div(BigNumber.from(10).pow(data["Decimals"] - 4)).toNumber() / 100).toFixed(2)
            assetDate.supplyprice = total(BigNumber.from(data['TotalSupplied']))
            assetDate.borrowprice = total(BigNumber.from(data['TotalBorrowed']))
            assetDate.sizeprice = total(BigNumber.from(data['MaxSupply']).mul(BigNumber.from(data['Price'])))
            // assetDate.balance = balance
            assetDate.oraclePrice = ((parseFloat(data["Price"]) / 100).toFixed(2)).toString()
            // assetDate.balanceprice = total(BigNumber.from(Math.trunc(balance*100)).mul(BigNumber.from(data['Price'])).div(BigNumber.from(100)))
            // assetDate.availableprice = total(BigNumber.from(Math.trunc(assetDate.availableBorrow*100)).mul(BigNumber.from(data['Price'])).div(BigNumber.from(100)))
            if (data['Collateral'] == 1) {
                assetDate.enable = true
            } else {
                assetDate.enable = false
            }
            if (BigNumber.from(data['TotalLiquidity']).isZero()) {
                assetDate.ur = (0).toFixed(2)
            } else {
                assetDate.ur = BigNumber.from(data['TotalBorrow']).mul(BigNumber.from(10000)).div(BigNumber.from(data['TotalLiquidity'])).toNumber() / 100
            }

            setDetail(assetDate)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAssetData = async () => {
        try {
            const provider = await getProviderOrSigner(false, web3ModalRef);
            const Data = await axios.get('/details', { params: { asset: asset, address: address, net: network } })
            const data = Data.data.data.assetdata
            const availableBorrow = Data.data.data.availableBorrow
            const E2 = BigNumber.from(100)



            var balance
            if (data["TokenAddress"] == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
                const balanceeth = await provider.getBalance(address);
                var ethBalance = ethers.utils.formatEther(balanceeth);
                // balance = ethBalance.substring(0, ethBalance.indexOf('.', 0) + 3);
                balance = parseFloat(ethBalance).toFixed(2)
            } else {
                const ERC20Contract = new Contract(
                    data["TokenAddress"],
                    ERC20ABI.abi,
                    provider
                )
                const erc20balance = await ERC20Contract.balanceOf(address);
                // const decimals = await ERC20Contract.decimals();
                balance = ((erc20balance.div(BigNumber.from(10).pow(data["Decimals"] - 2)).toNumber()) / 100).toFixed(2);
            }
            const assetDate = {}
            assetDate.name = data["Name"]
            assetDate.ltv = data["LTV"]
            assetDate.lt = data["LiquidationThreshold"]
            assetDate.lp = data["LiquidationBonus"]
            assetDate.coin = data["Asset"]
            assetDate.supplyapy = (BigNumber.from(data['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.apys = (BigNumber.from(data['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.apyv = (BigNumber.from(data['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100).toFixed(2)
            assetDate.totalBorrow = total(BigNumber.from(data['TotalBorrow']).div(BigNumber.from(10).pow(data["Decimals"] - 2)))
            assetDate.totalsupply = total(BigNumber.from(data['TotalLiquidity']).div(BigNumber.from(10).pow(data["Decimals"] - 2)))
            assetDate.size = total(BigNumber.from(data['MaxSupply']).mul(BigNumber.from(100)))
            assetDate.cycle = (BigNumber.from(data['TotalLiquidity']).div(BigNumber.from(data['MaxSupply'])).div(BigNumber.from(10).pow(data["Decimals"] - 4)).toNumber() / 100).toFixed(2)
            assetDate.supplyprice = total(BigNumber.from(data['TotalSupplied']))
            assetDate.borrowprice = total(BigNumber.from(data['TotalBorrowed']))
            assetDate.sizeprice = total(BigNumber.from(data['MaxSupply']).mul(BigNumber.from(data['Price'])))
            if (BigNumber.from(data['PriceOracle']).eq(BigNumber.from(0))) {
                assetDate.availableBorrow = (0).toFixed(2)
            } else {
                let bigAvailableBorrow = BigNumber.from(availableBorrow).mul(BigNumber.from(100)).div(BigNumber.from(data['PriceOracle']))
                let bigAvailableLiquidity = BigNumber.from(data["AvailableLiquidity"]).div(BigNumber.from(10).pow(data["Decimals"] - 2))
                if (bigAvailableBorrow.lt(bigAvailableLiquidity)) {
                    assetDate.availableBorrow = (bigAvailableBorrow.toNumber() / 100).toFixed(2)
                } else {
                    assetDate.availableBorrow = (bigAvailableLiquidity.toNumber()) / 100
                }
            }
            assetDate.balance = balance
            assetDate.oraclePrice = ((parseFloat(data["Price"]) / 100).toFixed(2)).toString()
            assetDate.balanceprice = total(BigNumber.from(Math.trunc(balance * 100)).mul(BigNumber.from(data['Price'])).div(BigNumber.from(100)))
            assetDate.availableprice = total(BigNumber.from(Math.trunc(assetDate.availableBorrow * 100)).mul(BigNumber.from(data['Price'])).div(BigNumber.from(100)))
            if (data['Collateral'] == 1) {
                assetDate.enable = true
            } else {
                assetDate.enable = false
            }
            if (BigNumber.from(data['TotalLiquidity']).isZero()) {
                assetDate.ur = (0).toFixed(2)
            } else {
                assetDate.ur = BigNumber.from(data['TotalBorrow']).mul(BigNumber.from(10000)).div(BigNumber.from(data['TotalLiquidity'])).toNumber() / 100
            }

            var borrowEnable = false
            if (availableBorrow == "0" || data["AvailableLiquidity"] == "0") {
                borrowEnable = true
            }
            const borrowdata = {}
            borrowdata.name = [data["Asset"], data["Name"]]
            borrowdata.healthFactor = Data.data.data.healthFactor
            borrowdata.assetAddress = data["TokenAddress"]
            borrowdata.available = assetDate.availableBorrow
            borrowdata.buttonEnable = borrowEnable
            borrowdata.price = BigNumber.from(data["Price"])

            var supplyEnable = true
            if (parseFloat(balance) != 0) {
                supplyEnable = false
            }
            var collateral = ""
            if (data["Collateral"] == 1) {
                collateral = "\u2714"
            } else {
                collateral = "——"
            }
            var supplydata = {}
            supplydata.name = [data["Asset"], data["Name"]]
            supplydata.healthFactor = Data.data.data.healthFactor
            supplydata.assetAddress = data["TokenAddress"]
            supplydata.APY = assetDate.supplyapy
            supplydata.collateral = collateral
            supplydata.price = BigNumber.from(data["Price"])
            supplydata.walletBalance = balance
            supplydata.buttonEnable = supplyEnable
            setDetail(assetDate)
            setSupply(supplydata)
            setBorrow(borrowdata)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (asset !== "" && network !== "") {
            console.log("我进来了");
            fetchData();
        }
    }, [asset, network])
    useEffect(() => {
        if (asset !== "" && network !== "" && address) {
            console.log("我也进来了");
            fetchAssetData();
        }
    }, [chain, asset, address])
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border-transparent border-2 rounded-lg text-black p-4 shadow-md border-gray-300">
                    <p className="mb-2 ">{`Utilization Rate: ${payload[0].payload["Utilization Rate"]}%`}</p>
                    <p className=" ">{`Borrow APR, variable: ${payload[0].payload["Borrow APR, variable"]}%`}</p>
                </div>
            );
        }

        return null;
    };



    const render = (currtenUR, apyv) => {
        const data = [...intersetRate, { "Utilization Rate": currtenUR, "Borrow APR, variable": apyv }];
        data.sort((a, b) => a["Utilization Rate"] - b["Utilization Rate"])

        return (
            <LineChart width={rcharts.current && rcharts.current.clientWidth * 0.9 || 0} height={300} data={data} margin={{ top: 20, right: 30, bottom: 20, left: 5 }}>
                {/* <Line type="linear" dataKey="Utilization Rate" stroke="#8884d8" />Borrow APR, variable */}
                <Line type="monotone" dataKey="Borrow APR, variable" stroke="#F4B512" dot={false} strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
                <ReferenceLine x={currtenUR > 80 ? 80 : Number.isInteger(currtenUR) ? 81 : 80} stroke="#0062D2" label={{ value: "Optimal 80%", position: "top" }} strokeDasharray="3 3" />
                <ReferenceLine x={currtenUR} stroke="#0062D2" label={{ value: `Currten ${currtenUR}%`, position: "insideTop" }} strokeDasharray="3 3" />
                <XAxis dataKey="Utilization Rate" ticks={[0, 25, 50, 75, 100]} tickFormatter={(value) => `${value}%`} axisLine={{ stroke: '#ccc' }} tickLine={{ stroke: '#ccc', display: 'none' }} tick={{ fill: '#ccc' }} />
                <YAxis tickFormatter={(value) => `${value}%`} axisLine={{ stroke: '#' }} tickLine={{ stroke: '#' }} tick={{ fill: '#ccc' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#66ccff', strokeWidth: 2 }} />
                {/* <Legend /> */}
            </LineChart>
        );
    }

    return (
        <div className='min-h-full '>
            <Header></Header>
            <div className=' box-border py-[64px] px-[112px] mb-[64px]'>
                <div className='font-bold text-[32px] mb-[16px]'>{asset} Market</div>
                <div className='flex justify-between w-[800px] mb-[64px]'>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>{asset}</div>
                        <div className='text-[#272D37] text-[22px] font-bold'>{detailData.name}</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Reserve Size</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>{detailData.size}</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Available liquidity</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>{detailData.totalsupply}</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Utilization Rate</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>{detailData.ur}%</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Oracle price</div>
                        <div className='text-[#272D37] text-[22px] font-bold'>${detailData["oraclePrice"]}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='basis-[64%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                        <div className='text-[26px] font-bold mb-[24px]'>Reserve status & configuration</div>
                        <div className='text-[18px] font-bold mb-[8px]'>Supply Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='w-[60%]  flex justify-between mb-[30px]'>
                                <div> <Progress type="circle" percent={detailData.cycle} /></div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>Total supplied</div>
                                    <div className='mb-[10px]'>{detailData.totalsupply} of {detailData.size}</div>
                                    <div>${detailData.supplyprice} of ${detailData.sizeprice}</div>
                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY</div>
                                    <div>{detailData.supplyapy}%</div>
                                </div>
                            </div>
                            <div className='flex mb-[20px] font-bold'>
                                <div className='text-[#272D37] mr-[30px]'>Collateral</div>
                                <div className='text-[green]'>Can be Collateral</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E] mb-[15px]'>Max LTV</div>
                                    <div>{detailData.ltv}%</div>
                                </div>

                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E] mb-[15px]'>Liquidation threshold</div>
                                    <div>{detailData.lt}%</div>
                                </div>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E]  mb-[15px]'>Liquidation penalty</div>
                                    <div>{detailData.lp}%</div>
                                </div>
                            </div>
                        </div>
                        <div className='text-[18px] font-bold mb-[8px] mt-[24px]'>Borrow Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='w-[60%]  flex justify-between mb-[30px]'>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>Total borrowed</div>
                                    <div className='mb-[10px] font-bold'>{detailData.totalBorrow}</div>
                                    <div>${detailData.borrowprice}</div>
                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY,variable</div>
                                    <div className='mb-[10px] font-bold'>{detailData.apyv}%</div>
                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY,stable</div>
                                    <div className='font-bold'>{detailData.apys}%</div>
                                </div>
                            </div>
                            <div className='mt-[30px] font-bold'>Collateral Info</div>
                        </div>
                        <div className='mt-[24px] font-bold'>Interest rate model</div>
                        <div ref={rcharts} className='border border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='mb-[10px]'>Utilzation Rate</div>
                            <div className='mb-[20px] font-bold'>{detailData.ur}%</div>
                            {render(detailData.ur, detailData.apyv)}
                        </div>
                    </div>
                    <div className='basis-[32%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                        <div className='text-[#272D37] text-[26px] mb-[24px] font-bold'>Your Info</div>
                        <div className='box-border p-[10px] border-solid border-[1px] border-[#EAEBF0]'>
                            <div className='flex mb-[20px]'>
                                <WalletOutlined className='text-[20px] mr-[30px]' />
                                <div>
                                    <div className='text-[#5F6D7E]'>Wallet balance</div>
                                    <div><span className='font-bold mt-[5px]'>{detailData.balance} </span>{detailData.coin}</div>
                                </div>
                            </div>
                            <hr className='mb-[20px] border-[#EAEBF0]' />
                            <div className='flex justify-between items-center'>
                                <div>
                                    <div>Avaliable to supply</div>
                                    <div><span className='font-bold mt-[5px]'>{detailData.balance} </span>{detailData.coin}</div>
                                    <div className='mt-[15px]'>${detailData.balanceprice}</div>
                                </div>
                                <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none' onClick={() => { setOperation("Supply"); setBoxData(supplyData); setOpen(true) }}>Supply</button></div>
                            </div>
                            <div className='flex justify-between mt-[20px] items-center'>
                                <div>
                                    <div>Avaliable to borrow</div>
                                    <div><span className='font-bold mt-[5px]'>{detailData.availableBorrow} </span>{detailData.coin}</div>
                                    <div className='mt-[15px]'>${detailData.availableprice}</div>
                                </div>
                                <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none' onClick={() => { setOperation("Borrow"); setBoxData(borrowData); setOpen(true) }}>Borrow</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Transaction title={operation} open={open} setOpen={setOpen} data={boxData} web3modal={web3ModalRef} address={address} chain={chain}></Transaction>
            <Footer></Footer>
        </div>
    )
}
