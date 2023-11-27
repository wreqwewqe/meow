import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAccount, useConnect, useSwitchNetwork } from 'wagmi'
import Image from 'next/image';
import copy from "../public/github.jpg"
import exclaim_point from "../public/github.jpg"
import { Popover, Input, message } from 'antd';
import Blockies from 'react-blockies';
import { BaseURI } from '../utils/constants';
import axios from 'axios'
import { BigNumber } from 'ethers'
export default function Profile() {
    axios.defaults.baseURL = BaseURI
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { address, isConnecting, isDisconnected } = useAccount();
    const content1 = (<div className='text-[14px] font-medium' >Governance Token</div>)
    const content2 = (<div className='text-[14px] font-medium' >Reputation Token</div>)
    const content3 = (<div className='text-[14px] font-medium' >Invite your friends to join Meow, and you can earn more rewards.</div>)
    const copy_address = () => {
        navigator.clipboard.writeText(address).then(() => {
            message.success("copy success!");
        })
    }
    const copy_link = () => {
        navigator.clipboard.writeText(data.data.inviteCode).then(() => {
            message.success("copy success!");
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Profile', { params: { address: address } });
                if (response.data.data.token == "" || response.data.data.token == "0") {
                    response.data.data.token = 0
                } else {
                    response.data.data.token = ((BigNumber.from(response.data.data.token).div(BigNumber.from(10).pow(16)).toNumber()) / 100).toFixed(2)
                }
                response.data.data.inviteCode = "https://meowprotocol.xyz/Dashboard?" + response.data.data.inviteCode
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])
    return (
        <div className='h-screen'>
            <Header></Header>
            <div className='box-border px-[112px] py-[64px]'>
                {/* <div className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]'></div> */}
                <Blockies className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]' seed={address ? address.toLowerCase() : ""} size={24} scale={4} />
                <div suppressHydrationWarning className='text-[32px] font-bold mb-[16px]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                <div className='mb-[64px]'><Image src={copy} onClick={copy_address} className='cursor-pointer mr-[8px]' height={15}></Image><span className='text-[16px] text-[#5F6D7E]'>Copy address to clipboard</span></div>
                <div className='flex justify-between mb-[32px]'>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] w-[46%] box-border'>
                        <div className='mb-[24px]'>$ MEO <Popover content={content1}><Image src={exclaim_point} className='cursor-pointer' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>{loading ? "" : data.data.integral}</div>
                    </div>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] w-[46%] box-border'>
                        <div className='mb-[24px]'>$ Meow <Popover content={content2}><Image src={exclaim_point} className='cursor-pointer' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>{loading ? "" : data.data.token}</div>
                    </div >
                </div>
                <div className='box-border border-solid border p-[32px] border-[#EAEBF0] rounded-[5px] mb-[32px]'>
                    <div className='text-[24px] font-bold mb-[40px]'>Invite My Friends <Popover content={content3}><Image src={exclaim_point} className='cursor-pointer' height={16} /></Popover></div>
                    <div className='flex mb-[24px]'><Input className='mr-[23px]' value={loading ? "" : data.data.inviteCode} readOnly></Input> <div className='box-border bg-[#F4B512] px-[21px] py-[12px] w-[119px] h-[48px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[14px] border-none' onClick={copy_link}>Copy Link</div></div>
                    <div className='text-[16px] text-[#5F6D7E]'>Copy the link above to start inviting friends</div>
                </div>

                <div className='p-[32px] h-[710px] border-solid rounded-[5px]  border-[#EAEBF0] mb-[12px]' >
                    <div className='flex justify-between items-end mb-[16px]'>
                        <div className='text-[24px] font-bold'>Monthly $Meow Earning Ranking</div>
                        <div className='text-[16px] font-bold'>My Monthly $Meow Earning: <span className='text-[#F4B512]'>{loading ? "" : data.data.monthIntegral}</span></div>
                    </div>
                    <div className='flex justify-between text-[#5F6D7E] tet-[16px] h-[44px]  border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[6px]'>
                        <div className='basis-[13%]'>Number</div>
                        <div className='basis-[80%]'>Wallet Address</div>
                        <div className='basis-[6.7%]'>Quantity</div>
                    </div>
                    <div className='overflow-y-auto h-[552px] no_scroll'>
                        {loading ? "" : data.data.top50.map((item, index) => (
                            <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px] text-[16px] font-bold'>
                                <div className='basis-[13%] text-[#F4B512]'>{index + 1}</div>
                                <div className='basis-[80%] flex items-center'>
                                    <Blockies className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]' seed={item.Address} size={10} scale={4} />
                                    <div >{item.Address.slice(0, 6) + "..." + address.slice(-4)}</div>
                                </div>
                                <div className='basis-[6.7%]'>{item.Quantity}</div>
                            </div>
                        ))}
                    </div>

                    <div className='text-[16px] text-[#5F6D7E]'>Display up to 50 lines</div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}