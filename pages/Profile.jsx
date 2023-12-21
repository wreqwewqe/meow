import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAccount, useConnect, useSwitchNetwork } from 'wagmi'
import Image from 'next/image';
import copy from "../public/copy.png"
import exclaim_point from "../public/exclaim_point.png"
import { Popover, Input, message } from 'antd';
import Blockies from 'react-blockies';
import { BaseURI } from '../utils/constants';
import { post, get } from '../utils/funcaxios'
import { BigNumber } from 'ethers'
import { create } from 'blockies';
// import clipboardCopy from 'clipboard-copy';
export default function Profile() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { address, isConnecting, isDisconnected } = useAccount();
    const content1 = (<div className='text-[1.4rem] font-medium' >Governance Token</div>)
    const content2 = (<div className='text-[1.4rem] font-medium' >Reputation Token</div>)
    const content3 = (<div className='text-[1.4rem] font-medium' >Invite your friends to join Meow, and you can earn more rewards.</div>)
    const copy_address = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(address).then(() => {
                message.success("copy success!");
            })
        } else {
            clipboardCopy(address)
            message.success("copy success!");
        }
    }
    const copy_link = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(data.inviteCode).then(() => {
                message.success("copy success!");
            })
        } else {
            clipboardCopy(data.inviteCode)
            message.success("copy success!");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('/v1/Profile', { address: address });
                if (response.data.token == "" || response.data.token == "0") {
                    response.data.token = 0
                } else {
                    response.data.token = ((BigNumber.from(response.data.token).div(BigNumber.from(10).pow(16)).toNumber()) / 100).toFixed(2)
                }
                response.data.inviteCode = "https://meowprotocol.xyz/Dashboard?code=" + response.data.inviteCode
                setData(response.data);
                console.log(data.top50);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [address])
    return (
        <div className='h-screen'>
            <Header></Header>
            <div className='box-border px-[11.2rem] py-[64px]'>
                {/* <div className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]'></div> */}
                <Blockies className='w-[8rem] h-[8rem] bg-[yellow] rounded-[50%] mb-[1.6rem]' seed={address ? address.toLowerCase() : ""} size={24} scale={4} />
                <div suppressHydrationWarning className='min-[1px]:text-[24px] md:text-[3.2rem] font-bold mb-[1.6rem]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                <div className='mb-[64px]'><Image src={copy} onClick={copy_address} className='cursor-pointer mr-[8px]' height={15}></Image><span className='text-[16px]  text-[#5F6D7E]'>Copy address to clipboard</span></div>
                <div className='md:flex md:justify-between mb-[32px]'>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] mb-[32px] md:mb-[0px] md:w-[46%] box-border'>
                        <div className='mb-[24px] flex items-center text-[16px] text-[#272D37] font-bold'>$ MEO <Popover content={content1}><Image src={exclaim_point} className='cursor-pointer ml-[0.6rem]' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>{loading ? "" : data.integral}</div>
                    </div>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] md:w-[46%] box-border'>
                        <div className='mb-[24px] flex items-center text-[16px] text-[#272D37] font-bold'>$ Meow <Popover content={content2}><Image src={exclaim_point} className='cursor-pointer ml-[0.6rem]' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>{loading ? "" : data.token}</div>
                    </div >
                </div>
                <div className='box-border border-solid border p-[32px] border-[#EAEBF0] rounded-[5px] mb-[32px]'>
                    <div className='text-[24px] font-bold mb-[12px] '>Invite My Friends <Popover content={content3}><Image src={exclaim_point} className='cursor-pointer' height={16} /></Popover></div>
                    <div className='mb-[32px] md:flex md:mb-[2.4rem]'><Input className='md:mr-[2.3rem] mb-[26px] md:mb-[0px]' value={loading ? "" : data.inviteCode} readOnly></Input> <span className='md:box-border bg-[#F4B512] px-[20px] py-[12px] md:w-[11.9rem] min-[1px]:inline  rounded-[6px] text-[white] font-semibold cursor-pointer  text-[16px] border-none' onClick={copy_link}>Copy Link</span></div>
                    <div className='text-[16px] text-[#5F6D7E]'>Copy the link above to start inviting friends</div>
                </div>

                <div className='p-[32px] md:h-[71rem] border-solid rounded-[0.5rem]  border-[#EAEBF0] mb-[1.2rem]' >
                    <div className='md:flex md:justify-between md:items-end mb-[16px]'>
                        <div className=' text-[24px]   font-bold mb-[10px] mdLmb-[10px]'>Monthly $Meow Earning Ranking</div>
                        <div className='text-[16px] font-bold'>My Monthly $Meow Earning: <span className='text-[#F4B512]'>{loading ? "" : data.monthIntegral}</span></div>
                    </div>
                    <div className='hidden md:flex justify-between text-[#5F6D7E] text-[1.6rem]  h-[4.4rem]  border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] '>
                        <div className='basis-[13%]'>Number</div>
                        <div className='basis-[80%] whitespace-nowrap '>Wallet Address</div>
                        <div className='basis-[6.7%]'>Quantity</div>
                    </div>


                    <div className='hidden md:block overflow-y-auto h-[55.2rem] no_scroll'>
                        {loading ? "" : data.top50.map((item, index) => (
                            <div className={' flex justify-between items-center h-[7.2rem] box-border   border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] text-[1.6rem] font-bold ' + (item.Address.toLowerCase() == address.toLowerCase() ? "bg-[#F4B512]/[0.3]" : "")}>
                                <div className='basis-[13%] text-[#3d331b]'>{index + 1}</div>
                                <div className='basis-[80%] flex items-center'>
                                    <Blockies className='w-[4.8rem] h-[4.8rem] rounded-[50%] bg-[#F4B5121A] mr-[1.2rem]' seed={item.Address.toLowerCase()} size={10} scale={4} />
                                    <div className={item.Address.toLowerCase() == address.toLowerCase() ? "text-[#F4B512]" : ""}>{item.Address.slice(0, 6) + "..." + item.Address.slice(-4)}</div>
                                </div>
                                <div className={item.Address.toLowerCase() == address.toLowerCase() ? " text-right basis-[6.7%] text-[#F4B512]" : "  text-right basis-[6.7%]"}>{item.Quantity}</div>
                            </div>
                        ))}
                    </div>
                    <div className='md:hidden  h-[600px] overflow-auto '>
                        {loading ? "" : data.top50.map((item, index) => (
                            <div className='py-[16px]  border-solid boder-1 border-[white] border-t-[#EAEBF0]'>
                                <div className='flex'>
                                    <div className='w-[65px]'>
                                        <div className='text-[12px] text-[#5F6D7E]'>{index + 1}</div>
                                        {/* <div className='text-[16px] text-[#F4B512]'>1</div> */}
                                    </div>
                                    <div>
                                        <div className='text-[12px] text-[#5F6D7E]'>Wallet Address</div>
                                        <div className='text-[16px] flex items-center'>
                                            {/* <div className='w-[48px] h-[48px] bg-[#F4B512] mr-[12px] rounded-[50%]' ></div> */}
                                            <Blockies className='w-[4.8rem] h-[4.8rem] rounded-[50%] bg-[#F4B5121A] mr-[1.2rem]' seed={item.Address.toLowerCase()} size={8} scale={4} />
                                            <div className={item.Address.toLowerCase() == address.toLowerCase() ? 'text-[16px] font-bold text-[#F4B512]' : 'text-[16px] font-bold'}>{item.Address.slice(0, 6) + "..." + item.Address.slice(-4)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='text-[12px] text-[#5F6D7E] mt-[16px]'>Quantity</div>
                                    <div className={item.Address.toLowerCase() == address.toLowerCase() ? 'text-[16px] font-bold text-[#F4B512]' : 'text-[16px] font-bold'}>{item.Quantity}</div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className='hidden md:block text-[1.6rem] text-[#5F6D7E]'>Display up to 50 lines</div>
                    <div className='md:block text-[12px] text-[#5F6D7E]'>Display up to 50 lines</div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}