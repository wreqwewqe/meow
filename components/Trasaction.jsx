import React, { useState, useRef, useEffect } from 'react'
import { Modal, Input, notification } from "antd"
import axios from 'axios';
import { total } from "../utils/getPrice"
import { DataProviderABI } from "../ABIs/LendingPoolDataProvider";
import { PoolABI } from "../ABIs/LendingPool";
import { deposit, redeem, borrow, repay } from "../utils/contractfunc"
import { BaseURI } from '../utils/constants';
import { getProviderOrSigner } from '../utils/ProviderOrSigner';
import { Contract, providers, BigNumber } from 'ethers';
export default function Trasaction({ title, open, setOpen, data, web3modal, address }) {
    const [value, setValue] = useState("");
    const variable = useRef();
    const stable = useRef();
    const [input, setInput] = useState(0)
    const [loading, setLoading] = useState(false)
    const [rateMode, setRateMode] = useState(1)
    useEffect(() => {
        console.log("ratemode:", rateMode);
    })
    axios.defaults.baseURL = BaseURI;
    const openNotification = (api, content) => {
        api.info({
            message: content,
            placement: 'top',
            duration: 0,
        });
    };
    const [api, contextHolder] = notification.useNotification();

    const handleDeposit = async () => {
        if (input == 0) {
            openNotification(api, "Value must >0!")
            return
        }
        setLoading(true)
        const result = await deposit(data.assetAddress, value, web3modal)
        setLoading(false)
        if (result == "") {
            window.location.reload()
        } else {
            // console.log(result);
            if (result.code != "ACTION_REJECTED") {
                try {
                    openNotification(api, result.error.message + " Please try again!")
                } catch (error) {
                    openNotification(api, "Transaction failed, please try again!")
                }
            }
        }

    }

    const handleRedeem = async () => {
        if (input == 0) {
            openNotification(api, "Value must >0!")
            return
        }
        setLoading(true)
        const result = await redeem(data.assetAddress, data.aTokenAddress, web3modal, value)
        setLoading(false)
        if (result == "") {
            window.location.reload()
        } else {
            // console.log(result);
            if (result.code != "ACTION_REJECTED") {
                try {
                    openNotification(api, result.error.message + " Please try again!")
                } catch (error) {
                    openNotification(api, "Transaction failed, please try again!")
                }
            }
        }
    }

    const handleBorrow = async () => {
        if (input == 0) {
            openNotification(api, "Value must >0!")
            return
        }
        // console.log("ratemode:"+rateMode);
        setLoading(true)
        console.log("ratemode:" + data.assetAddress);
        const result = await borrow(data.assetAddress, value, web3modal, rateMode)
        // console.log(result.error.message);
        setLoading(false)
        if (result == "") {
            const provider = await getProviderOrSigner(false, web3modal);
            const poolContract = new Contract(
                DataProviderABI.EthereumAddress,
                DataProviderABI.abi,
                provider
            );
            const PoolContract = new Contract(
                PoolABI.EthereumAddress,
                PoolABI.abi,
                provider
            );
            const reserveData = await poolContract.getUserReserveData(data.assetAddress, address);
            await axios.post("/updateBorrow", { "asset": data.ERC20Name, "balance": reserveData.principalBorrowBalance.toString(), "user": address, "rateMode": rateMode, "net": "Ethereum" })
            const userData = await PoolContract.getUserAccountData(address);
            const healthFactor = total((userData.healthFactor).div(BigNumber.from(10).pow(16)));
            await axios.post('/user', {
                "address": address,
                "healthFactor": healthFactor,
                "ltv": userData.ltv.toString(),
                "totalliquidity": userData.totalLiquidityETH.toString(),
                "totalcollateral": userData.totalCollateralETH.toString(),
                "availableborrow": userData.availableBorrowsETH.toString(),
                "totalborrow": userData.totalBorrowsETH.toString(),
                "totalfee": userData.totalFeesETH.toString(),
                "net": "Ethereum"
            })
            window.location.reload()
        } else {
            // console.log(result);
            if (result.code != "ACTION_REJECTED") {
                try {
                    openNotification(api, result.error.message + " Please try again!")
                } catch (error) {
                    openNotification(api, "Transaction failed, please try again!")
                }
            }
        }
    }

    const handleRepay = async () => {
        if (input == 0) {
            openNotification(api, "Value must >0!")
            return
        }
        setLoading(true)
        var addValue = Number(value)
        if (data.ERC20Name != "ETH" && value == data.balance) {
            addValue = Number(value) + 1
        }
        const result = await repay(data.assetAddress, addValue, web3modal)
        setLoading(false)
        if (result == "") {
            const provider = await getProviderOrSigner(false, web3modal);
            const poolContract = new Contract(
                DataProviderABI.EthereumAddress,
                DataProviderABI.abi,
                provider
            );
            const userData = await poolContract.getUserReserveData(data.assetAddress, address);
            await axios.post("/updateBorrow", { "asset": data.ERC20Name, "balance": userData.principalBorrowBalance.toString(), "user": address, "net": "Ethereum" })
            window.location.reload()
        } else {
            // console.log(result);
            if (result.code != "ACTION_REJECTED") {
                try {
                    openNotification(api, result.error.message + " Please try again!")
                } catch (error) {
                    openNotification(api, "Transaction failed, please try again!")
                }
            }
        }
    }

    const handlePrice = (event) => {
        var price = (event.target.value * data.price / 100).toFixed(2)
        setInput(price)
    }

    const checkValueSupply = (event) => {
        event.target.value = event.target.value.match(/^\d*(\.?\d{0,2})/g)
        if (event.target.value > Number(data.walletBalance)) {
            event.target.value = Number(data.walletBalance)
        }
        setValue(event.target.value)
    }

    const checkValueWithdraw = (event) => {
        event.target.value = event.target.value.match(/^\d*(\.?\d{0,2})/g)
        if (event.target.value > Number(data.Balance)) {
            event.target.value = Number(data.Balance)
        }
        setValue(event.target.value)
    }

    const checkValueBorrow = (event) => {
        event.target.value = event.target.value.match(/^\d*(\.?\d{0,2})/g)
        if (event.target.value > Number(data.available)) {
            event.target.value = Number(data.available)
        }
        setValue(event.target.value)
    }
    const checkValueRepay = (event) => {
        event.target.value = event.target.value.match(/^\d*(\.?\d{0,2})/g)
        var min = Number(data.balance)
        if (min > Number(data.WalletBalance)) {
            min = Number(data.WalletBalance)
        }
        if (event.target.value > min) {
            event.target.value = min
        }
        setValue(event.target.value)
    }
    const handleOk = () => {

    }
    const handleCancel = () => {
        setOpen(false)
        setInput(0)
        setValue("")
    }
    const onChange = (values) => {
        console.log("values", values.target.value);
        setValue(values.target.value)
    }
    const rate_change = (e) => {
        console.log('e', e.target == stable.current);
        console.log("variable", variable)
        variable.current.style.backgroundColor = "#919AA6";
        stable.current.style.backgroundColor = '#919AA6'
        e.target.style.backgroundColor = "white"
        if (e.target == stable.current) {
            setRateMode(1)
        } else {
            setRateMode(2)
        }

    }
    if (title == "Borrow") {
        return (
            <div><Modal title={title + " " + data.name[0]} open={open} onOk={handleOk} onCancel={handleCancel} footer="">
                <div>
                    <div className='font-medium text-[16px] mb-[12px]'>Borrow APY Rate</div>
                    <div className="box-border p-[4px] bg-[#919AA6] flex" onClick={rate_change}>
                        <div ref={stable} className='basis-1/2 bg-[white] rounded-[6px] font-bold text-center cursor-pointer' >Stable</div>
                        <div ref={variable} className='basis-1/2  rounded-[6px] font-bold text-center cursor-pointer' >Variable</div>
                    </div>
                </div>
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Amount</div>
                <div className='relative zdy-input border border-solid border-[#E5E3E6] rounded-[6px]'>
                    <Input value={value} bordered={false} onChange={handlePrice} placeholder='Enther the Amount' type="text" onInput={checkValueBorrow} suffix={
                        <div>
                            <div className='font-bold text-[20px] text-right'>{data.name[1]}</div>
                        </div>
                    }></Input>
                    <div className='flex justify-between box-border px-[10px] mb-[5px]'><div className='text-[#D7D7D7] '>${input} </div> <div><span className='text-[14px] text-[#919AA6]'>Available</span> {data.available}<span className='text-[#F4B512] cursor-pointer'> Max</span></div></div>
                </div>
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Transaction OverView</div>
                <div className='border border-solid border-[#E5E3E6] rounded-[6px] box-border py-[12px] px-[16px] mb-[20px]'>
                    <div className='flex justify-between mt-[12px]'>
                        <div className='text-[#919AA6]'>Health factor</div>
                        {data.healthFactor > 1 ? <div className='font-bold text-[#00B600]'>{data.healthFactor}</div> : <div className='font-bold text-[#FF0000]'>{data.healthFactor}</div>}
                    </div>
                    <div className='text-[#919AA6] text-right'>Liquidation at &lt; 1.0 </div>
                </div>
                {value ?
                    <button className='bg-[#F4B512] text-[white] box-border py-[12px] font-bold text-center cursor-pointer rounded-[6px] mb-[8px]' onClick={handleBorrow} disabled={loading}>{title + " " + value + " " + data.name[1]}</button>
                    : <div className='bg-[#F4B512]/[0.6] text-[white] box-border py-[12px] font-bold text-center rounded-[6px] mb-[8px]'>Enter An Amount</div>
                }
                <div className=' border-solid border border-[#EAEBF0] py-[12px] font-bold text-center cursor-pointer' onClick={() => handleCancel()}>Close</div>
            </Modal></div>
        )
    }
    if (title == "Supply") {
        return (
            <div><Modal title={title + " " + data.name[0]} open={open} onOk={handleOk} onCancel={handleCancel} footer="">
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Amount</div>
                <div className='relative zdy-input border border-solid border-[#E5E3E6] rounded-[6px]'>
                    <Input value={value} bordered={false} onChange={handlePrice} placeholder='Enther the Amount' type="text" onInput={checkValueSupply} suffix={
                        <div>
                            <div className='font-bold text-[20px] text-right'>{data.name[1]}</div>
                        </div>
                    }></Input>
                    <div className='flex justify-between box-border px-[10px] mb-[5px]'><div className='text-[#D7D7D7] '>${input} </div> <div><span className='text-[14px] text-[#919AA6]'>Wallet Balance </span>{data.walletBalance}<span className='text-[#F4B512] cursor-pointer'> Max</span></div></div>
                </div>
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Transaction OverView</div>
                <div className='border border-solid border-[#E5E3E6] rounded-[6px] box-border py-[12px] px-[16px] mb-[20px]'>
                    <div className='flex justify-between mb-[12px]'>
                        <div className='text-[#919AA6]'>Supply APY</div>
                        <div className='font-bold'>{data.APY}%</div>
                    </div>
                    <>
                        <div className='flex justify-between'>
                            <div className='text-[#919AA6]'>Collateralization</div>
                            <div>✅</div>
                        </div>
                    </>
                    <div className='flex justify-between mt-[12px]'>
                        <div className='text-[#919AA6]'>Health factor</div>
                        {data.healthFactor > 1 ? <div className='font-bold text-[#00B600]'>{data.healthFactor}</div> : <div className='font-bold text-[#FF0000]'>{data.healthFactor}</div>}
                    </div>
                    <div className='text-[#919AA6] text-right'>Liquidation at &lt; 1.0 </div>
                </div>
                <div className='flex mb-[8px] text-[12px] text-[#919AA6]'>
                    <div className='basis-1/2 bg-[#EAEBF0] mr-[5px] box-border py-[6px] text-center'>1.Approved</div>
                    <div className='basis-1/2 bg-[#EAEBF0] box-border py-[6px] text-center'>2.Finished</div>
                </div>
                {value ?
                    <button className='bg-[#F4B512] text-[white] box-border py-[12px] font-bold text-center cursor-pointer rounded-[6px] mb-[8px]' onClick={handleDeposit} disabled={loading}>{title + " " + value + " " + data.name[1]}</button>
                    : <div className='bg-[#F4B512]/[0.6] text-[white] box-border py-[12px] font-bold text-center rounded-[6px] mb-[8px]'>Enter An Amount</div>
                }
                <div className=' border-solid border border-[#EAEBF0] py-[12px] font-bold text-center cursor-pointer' onClick={() => handleCancel()}>Close</div>
            </Modal></div>
        )
    }
    if (title == "Withdraw") {
        return (
            <div><Modal title={title + " " + data.name[0]} open={open} onOk={handleOk} onCancel={handleCancel} footer="">
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Amount</div>
                <div className='relative zdy-input border border-solid border-[#E5E3E6] rounded-[6px]'>
                    <Input value={value} bordered={false} onChange={handlePrice} placeholder='Enther the Amount' type="text" onInput={checkValueWithdraw} suffix={
                        <div>
                            <div className='font-bold text-[20px] text-right'>{data.name[1]}</div>
                        </div>
                    }></Input>
                    <div className='flex justify-between box-border px-[10px] mb-[5px]'><div className='text-[#D7D7D7] '>${input} </div> <div><span className='text-[14px] text-[#919AA6]'>Supply Balance</span> {data.Balance} <span className='text-[#F4B512] cursor-pointer'>Max</span></div></div>
                </div>
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Transaction OverView</div>
                <div className='border border-solid border-[#E5E3E6] rounded-[6px] box-border py-[12px] px-[16px] mb-[20px]'>
                    <div className='flex justify-between mb-[12px]'>
                        <div className='text-[#919AA6]'>Remaining Supply</div>
                        <div className='font-bold'>{data.Balance}{data.name[1]}</div>
                    </div>
                    <div className='flex justify-between mt-[12px]'>
                        <div className='text-[#919AA6]'>Health factor</div>
                        {data.healthFactor > 1 ? <div className='font-bold text-[#00B600]'>{data.healthFactor}</div> : <div className='font-bold text-[#FF0000]'>{data.healthFactor}</div>}
                    </div>
                    <div className='text-[#919AA6] text-right'>Liquidation at &lt; 1.0 </div>
                </div>
                {value ?
                    <button className='bg-[#F4B512] text-[white] box-border py-[12px] font-bold text-center cursor-pointer rounded-[6px] mb-[8px]' onClick={handleRedeem} disabled={loading}>{title.split(" ")[0] + " " + value + " " + data.name[1]}</button>
                    : <div className='bg-[#F4B512]/[0.6] text-[white] box-border py-[12px] font-bold text-center rounded-[6px] mb-[8px]'>Enter An Amount</div>
                }
                <div className=' border-solid border border-[#EAEBF0] py-[12px] font-bold text-center cursor-pointer' onClick={() => handleCancel()}>Close</div>
            </Modal></div>
        )
    }
    if (title == "Repay") {
        return (
            <div><Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel} footer="">
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Amount</div>
                <div className='relative zdy-input border border-solid border-[#E5E3E6] rounded-[6px]'>
                    <Input value={value} bordered={false} onChange={handlePrice} placeholder='Enther the Amount' type="text" onInput={checkValueRepay} suffix={
                        <div>
                            <div className='font-bold text-[20px] text-right'>{data.name[1]}</div>
                        </div>
                    }></Input>
                    <div className='flex justify-between box-border px-[10px] mb-[5px]'><div className='text-[#D7D7D7] '>${input} </div> <div><span className='text-[14px] text-[#919AA6]'>Wallet Balance</span> {data.WalletBalance} <span className='text-[#F4B512] cursor-pointer'>Max</span></div></div>
                </div>
                <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Transaction OverView</div>
                <div className='border border-solid border-[#E5E3E6] rounded-[6px] box-border py-[12px] px-[16px] mb-[20px]'>
                    <div className='flex justify-between mb-[12px]'>
                        <div className='text-[#919AA6]'>Remaining Debt</div>
                        <div className='font-bold'>{data.balance}{data.name[1]}-&gt;{parseFloat(data.balance - value).toFixed(2)}{data.name[1]}</div>
                    </div>
                    <div className='text-[#919AA6] text-right'>${parseFloat(data.balance * Number(data.price) / 100).toFixed(2)}-&gt;${parseFloat((data.balance - value) * data.price / 100).toFixed(2)} </div>
                    <div className='flex justify-between mt-[12px]'>
                        <div className='text-[#919AA6]'>Health factor</div>
                        {data.healthFactor > 1 ? <div className='font-bold text-[#00B600]'>{data.healthFactor}</div> : <div className='font-bold text-[#FF0000]'>{data.healthFactor}</div>}
                    </div>
                    <div className='text-[#919AA6] text-right'>Liquidation at &lt; 1.0 </div>
                </div>
                {value ?
                    <button className='bg-[#F4B512] text-[white] box-border py-[12px] font-bold text-center cursor-pointer rounded-[6px] mb-[8px]' onClick={handleRepay} disabled={!loading}>{title.split(" ")[0] + " " + value + " " + data.name[1]}</button>
                    : <div className='bg-[#F4B512]/[0.6] text-[white] box-border py-[12px] font-bold text-center rounded-[6px] mb-[8px]'>Enter An Amount</div>
                }
                <div className=' border-solid border border-[#EAEBF0] py-[12px] font-bold text-center cursor-pointer' onClick={() => handleCancel()}>Close</div>
            </Modal></div>
        )
    }
    return (
        <></>
    )
}
