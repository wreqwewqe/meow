import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Transaction from "../components/Trasaction"
import { Progress, Skeleton } from "antd"
import { WalletOutlined } from '@ant-design/icons';
import { useAccount, useConnect, useSwitchNetwork, useNetwork } from 'wagmi'
import { getProviderOrSigner } from '../utils/ProviderOrSigner';
import { post, get } from '../utils/funcaxios'
import { BaseURI, ETHEREUM_ADDRESS } from '../utils/constants';
import { BigNumber, Contract, ethers } from 'ethers'
import ERC20, { ERC20ABI } from '../ABIs/ERC20';
import { PoolABI } from '../ABIs/LendingPool';
import { total, calculateInterest, rayMul, rayToWad, rayDiv } from '../utils/getPrice';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from 'recharts';
import { intersetRate } from "../utils/constants"
import { EthereumCode, ScrollCode } from '../utils/constants'

export default function EthDetails() {
    const rcharts = useRef();
    const [asset, setAsset] = useState("");
    const [targetChain, setTargetChain] = useState("")
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
    const [infoEnable, setInfoEnable] = useState(true)
    const { address, isConnecting, isDisconnected } = useAccount()

    const { chains, isLoading, pendingChainId, switchNetwork, status } =
        useSwitchNetwork({
            chainId: targetChain,
        })
    useEffect(() => {
        if (targetChain != "") {
            switchNetwork()
        }
    }, [targetChain])

    // useEffect(()=>{
    //     if(window.ethereum){
    //         if(network=="Scroll"){
    //             if(chain.id!=ScrollCode){
    //                 setTargetChain(ScrollCode)
    //             }
    //         }
    //         if(network=="Ethereum"){
    //             if(chain.id!=EthereumCode){
    //                 setTargetChain(EthereumCode)
    //             }
    //         }
    //     }
    // },[network,chain])

    useEffect(() => {
        const queryString = window.location.search;
        const queryParams = new URLSearchParams(queryString);
        var assetname = queryParams.get('asset');
        var net = queryParams.get("net")
        if (assetname == null) {
            assetname = "ETH"
        }
        if (net == null) {
            net = "Scroll"
        }
        setAsset(assetname);
        setNetwork(net)
    }, [address, chain])
    useEffect(() => {
        if (isDisconnected) {
            setInfoEnable(true)
        }
    }, [isDisconnected])

    const fetchData = async () => {
        try {
            const Data = await get('/detail', { asset: asset, net: network })
            const data = Data.data.assetdata
            // console.log(data);
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
            const Data = await get('/v1/details', { asset: asset, address: address, net: network })
            const data = Data.data.assetdata
            const availableBorrow = Data.data.availableBorrow
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
            borrowdata.healthFactor = Data.data.healthFactor
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
            supplydata.healthFactor = Data.data.healthFactor
            supplydata.assetAddress = data["TokenAddress"]
            supplydata.APY = assetDate.supplyapy
            supplydata.collateral = collateral
            supplydata.price = BigNumber.from(data["Price"])
            supplydata.walletBalance = balance
            supplydata.buttonEnable = supplyEnable
            setDetail(assetDate)
            setSupply(supplydata)
            setBorrow(borrowdata)
            setInfoEnable(false)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (asset !== "" && network !== "") {
            // console.log("我进来了");
            fetchData();
        }
    }, [asset, network])
    useEffect(() => {
        if (asset !== "" && network !== "" && address) {
            // console.log("我也进来了");
            fetchAssetData();
        }
    }, [chain, asset, address])
    useEffect(() => {
        console.log(error);
    }, [error])
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border-transparent border-2 rounded-lg text-black p-4 shadow-md border-gray-300">
                    <p className="mb-2 text-[14px]">{`Utilization Rate: ${payload[0].payload["Utilization Rate"]}%`}</p>
                    <p className="text-[14px] ">{`Borrow APR, variable: ${payload[0].payload["Borrow APR, variable"]}%`}</p>
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
            <div className=' box-border py-[64px] px-[11.2rem] mb-[64px]'>
                <div className='font-bold text-[24px] md:text-[3.2rem] mb-[1.6rem]'>{network} Market</div>
                <div className='flex justify-between flex-wrap md:w-[80rem] mb-[64px] '>
                    <div className='w-[48%] md:flex-1 mt-[16px] md:mt-[0px]'>
                        <div className='text-[#5F6D7E] mb-[8px] text-[16px]'>{asset}</div>
                        <div className='text-[#272D37] text-[22px] font-bold '>{detailData.name}</div>
                    </div>
                    {/* <hr className=' mx-0 border-[#EAEBF0] border-solid vertical-line ' /> */}
                    <div className='w-[48%] md:flex-1 pl-[16px] mt-[16px] md:mt-[0px]  md:border md:border-solid border-[white] md:border-l-[#EAEBF0]'>
                        <div className='text-[#5F6D7E] mb-[8px] md:text-center text-[16px]'>Reserve Size</div>
                        <div className='text-[#272D37] text-[22px]  font-bold md:text-center'>{detailData.size}</div>
                    </div>
                    <div className='w-[48%] md:flex-1 mt-[16px] md:mt-[0px]'>
                        <div className='text-[#5F6D7E] mb-[8px] md:text-center text-[16px]'>Available liquidity</div>
                        <div className='text-[#272D37] text-[22px]  font-bold md:text-center'>{detailData.totalsupply}</div>
                    </div>
                    <div className='w-[48%] md:flex-1 mt-[16px] md:mt-[0px]'>
                        <div className='text-[#5F6D7E] mb-[8px] md:text-center text-[16px]'>Utilization Rate</div>
                        <div className='text-[#272D37] text-[22px]  font-bold md:text-center'>{detailData.ur}%</div>
                    </div>
                    <div className='w-[48%] md:flex-1 mt-[16px] md:mt-[0px]'>
                        <div className='text-[#5F6D7E] mb-[8px] md:text-center text-[16px]'>Oracle price</div>
                        <div className='text-[#272D37] text-[22px] font-bold md:text-center'>${detailData["oraclePrice"]}</div>
                    </div>
                </div>
                <div className='md:flex md:justify-between'>
                    <div className='basis-[64%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                        <div className='text-[24px] md:text-[2.6rem] font-bold mb-[24px]'>Reserve status & configuration</div>
                        <div className='text-[18px] font-bold mb-[8px]'>Supply Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='md:w-[60%]  flex justify-between mb-[3rem] items-center'>
                                <div> <Progress type="circle" percent={detailData.cycle} /></div>
                                <div >
                                    <div className='mb-[10px] text-[#5F6D7E] text-[14px]'>Total supplied</div>
                                    <div className='mb-[10px] text-[16px] font-bold'>{detailData.totalsupply} of {detailData.size}</div>
                                    <div className='text-[12px] text-[#5F6D7E]'>${detailData.supplyprice} of ${detailData.sizeprice}</div>
                                </div>
                                <div >
                                    <div className='mb-[1rem] text-[#5F6D7E] md:pl-[30px] text-[14px]'>APY</div>
                                    <div className=' font-bold text-[16px] h-[40px] flex justify-center items-center md:pl-[30px] border border-solid border-[white] border-l-[#EAEBF0]'>{detailData.supplyapy}%</div>
                                </div>
                            </div>
                            <div className='flex mb-[2rem] font-bold'>
                                <div className='text-[#272D37] mr-[30px] text-[14px]'>Collateral</div>
                                <div className='text-[green] whitespace-nowrap text-[14px]'>Can be Collateral</div>
                            </div>
                            <div className='md:flex md:justify-between'>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px] mb-[8px] md:mb-[0px]'>
                                    <div className='text-[#5F6D7E] mb-[15px] text-[14px]'>Max LTV</div>
                                    <div className='text-[14px]'>{detailData.ltv}%</div>
                                </div>

                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px] mb-[8px] md:mb-[0px]'>
                                    <div className='text-[#5F6D7E] mb-[15px] text-[14px]'>Liquidation threshold</div>
                                    <div className='text-[14px]'>{detailData.lt}%</div>
                                </div>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px] mb-[8px] md:mb-[0px]'>
                                    <div className='text-[#5F6D7E]  mb-[15px] text-[14px]'>Liquidation penalty</div>
                                    <div className='text-[14px]'>{detailData.lp}%</div>
                                </div>
                            </div>
                        </div>
                        <div className='text-[18px] font-bold mb-[8px] mt-[24px]'>Borrow Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='md:w-[60%]  flex justify-between mb-[30px]'>
                                <div className='pr-[15px] md:pr-[0px]'>
                                    <div className='mb-[10px] text-[#5F6D7E] text-[14px]'>Total borrowed</div>
                                    <div className='mb-[10px] font-bold text-[16px]'>{detailData.totalBorrow}</div>
                                    <div className='text-[12px] text-[#5F6D7E]'>${detailData.borrowprice}</div>
                                </div >
                                <div className=' md:justify-center  md:items-center px-[15px] md:pl-[30px] border border-solid border-[white] border-l-[#EAEBF0]'>
                                    <div className='mb-[10px] text-[#5F6D7E] text-[14px]'>APY,variable</div>
                                    <div className='mb-[10px] font-bold text-[16px]'>{detailData.apyv}%</div>
                                </div>
                                <div className=' md:justify-center md:items-center px-[15px] md:pl-[30px] border border-solid border-[white] border-l-[#EAEBF0]'>
                                    <div className='mb-[1rem] text-[#5F6D7E] text-[14px]'>APY,stable</div>
                                    <div className='font-bold text-[16px]'>{detailData.apys}%</div>
                                </div>
                            </div>
                            {/* <div className='mt-[3rem] font-bold text-[1.4rem]'>Collateral Info</div> */}
                        </div>
                        <div className='mt-[24px] font-bold text-[18px]'>Interest rate model</div>
                        <div ref={rcharts} className='border border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='mb-[10px] text-[14px] text-[#5F6D7E]'>Utilzation Rate</div>
                            <div className='mb-[20px] font-bold text-[16px]'>{detailData.ur}%</div>
                            {render(detailData.ur, detailData.apyv)}
                        </div>
                    </div>
                    {infoEnable ? <div className='basis-[32%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'><Skeleton loading={true} active></Skeleton></div>
                        : (<div className='basis-[32%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                            <div className='text-[#272D37] text-[26px] mb-[24px] font-bold'>Your Info</div>
                            <div className='box-border p-[10px] border-solid border-[0.5px] border-[#EAEBF0]'>
                                <div className='flex mb-[20px]'>
                                    <WalletOutlined className='text-[20px] mr-[30px]' />
                                    <div>
                                        <div className='text-[#5F6D7E] whitespace-nowrap text-[14px]'>Wallet balance</div>
                                        <div className='text-[16px]'><span className='font-bold mt-[5px] '>{detailData.balance} </span>{detailData.coin}</div>
                                    </div>
                                </div>
                                <hr className='mb-[20px] border-[#EAEBF0] border-solid' />
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <div className='text-[14px] text-[#5F6D7E]'>Avaliable to supply</div>
                                        <div className='text-[16px] mt-[4px]'><span className='font-bold mt-[5px]'>{detailData.balance} </span>{detailData.coin}</div>
                                        <div className='mt-[4px] text-[12px] text-[#5F6D7E]'>${detailData.balanceprice}</div>
                                    </div>
                                    <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none' onClick={() => { setOperation("Supply"); setBoxData(supplyData); setOpen(true) }}>Supply</button></div>
                                </div>
                                <div className='flex justify-between mt-[20px] items-center'>
                                    <div>
                                        <div className='text-[#5F6D7E] text-[14px]'>Avaliable to borrow</div>
                                        <div className='text-[16px] mt-[4px]'><span className='font-bold mt-[5px]'>{detailData.availableBorrow} </span>{detailData.coin}</div>
                                        <div className='mt-[4px] text-[#5F6D7E] text-[12px]'>${detailData.availableprice}</div>
                                    </div>
                                    <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none' onClick={() => { setOperation("Borrow"); setBoxData(borrowData); setOpen(true) }}>Borrow</button></div>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
            <Transaction title={operation} open={open} setOpen={setOpen} data={boxData} web3modal={web3ModalRef} address={address} chain={chain}></Transaction>
            <Footer></Footer>
        </div>
    )
}
