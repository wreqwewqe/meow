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
            <div className='box-border px-[11.2rem] py-[6.4rem]'>
                {/* <div className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]'></div> */}
                <Blockies className='w-[8rem] h-[8rem] bg-[yellow] rounded-[50%] mb-[1.6rem]' seed={address ? address.toLowerCase() : ""} size={24} scale={4} />
                <div suppressHydrationWarning className='text-[3.2rem] font-bold mb-[1.6rem]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                <div className='mb-[6.4rem]'><Image src={copy} onClick={copy_address} className='cursor-pointer mr-[8px]' height={15}></Image><span className='text-[1.6rem] text-[#5F6D7E]'>Copy address to clipboard</span></div>
                <div className='flex justify-between mb-[3.2rem]'>
                    <div className='px-[3.2rem] py-[2.4rem] border-solid border border-[#EAEBF0] rounded-[0.5rem] w-[46%] box-border'>
                        <div className='mb-[2.4rem] flex items-center text-[1.6rem] text-[#272D37] font-bold'>$ MEO <Popover content={content1}><Image src={exclaim_point} className='cursor-pointer ml-[0.6rem]' height={15} /></Popover></div>
                        <div className='text-[2.2rem] font-bold'>{loading ? "" : data.integral}</div>
                    </div>
                    <div className='px-[3.2rem] py-[2.4rem] border-solid border border-[#EAEBF0] rounded-[0.5rem] w-[46%] box-border'>
                        <div className='mb-[2.4rem] flex items-center text-[1.6rem] text-[#272D37] font-bold'>$ Meow <Popover content={content2}><Image src={exclaim_point} className='cursor-pointer ml-[0.6rem]' height={15} /></Popover></div>
                        <div className='text-[2.2rem] font-bold'>{loading ? "" : data.token}</div>
                    </div >
                </div>
                <div className='box-border border-solid border p-[3.2rem] border-[#EAEBF0] rounded-[0.5rem] mb-[3.2rem]'>
                    <div className='text-[2.4rem] font-bold mb-[4rem]'>Invite My Friends <Popover content={content3}><Image src={exclaim_point} className='cursor-pointer' height={16} /></Popover></div>
                    <div className='flex mb-[2.4rem]'><Input className='mr-[2.3rem]' value={loading ? "" : data.inviteCode} readOnly></Input> <div className='box-border bg-[#F4B512] px-[2rem] py-[1.2rem] w-[11.9rem] h-[4.8rem] rounded-[0.6rem] text-[white] font-semibold cursor-pointer text-[1.4rem] border-none' onClick={copy_link}>Copy Link</div></div>
                    <div className='text-[1.6rem] text-[#5F6D7E]'>Copy the link above to start inviting friends</div>
                </div>

                <div className='p-[3.2rem] h-[71rem] border-solid rounded-[0.5rem]  border-[#EAEBF0] mb-[1.2rem]' >
                    <div className='flex justify-between items-end mb-[1.6rem]'>
                        <div className='text-[2.4rem] font-bold'>Monthly $Meow Earning Ranking</div>
                        <div className='text-[1.6rem] font-bold'>My Monthly $Meow Earning: <span className='text-[#F4B512]'>{loading ? "" : data.monthIntegral}</span></div>
                    </div>
                    <div className='flex justify-between text-[#5F6D7E] text-[1.6rem]  h-[4.4rem]  border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] '>
                        <div className='basis-[13%]'>Number</div>
                        <div className='basis-[80%] whitespace-nowrap '>Wallet Address</div>
                        <div className='basis-[6.7%]'>Quantity</div>
                    </div>
                    <div className='overflow-y-auto h-[55.2rem] no_scroll'>
                        {loading ? "" : data.top50.map((item, index) => (
                            <div className={' flex justify-between items-center h-[7.2rem] box-border   border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] text-[1.6rem] font-bold ' + (item.Address.toLowerCase() == address.toLowerCase() ? "bg-[#F4B512]/[0.3]" : "")}>
                                <div className='basis-[13%] text-[#3d331b]'>{index + 1}</div>
                                <div className='basis-[80%] flex items-center'>
                                    <Blockies className='w-[4.8rem] h-[4.8rem] rounded-[50%] bg-[#F4B5121A] mr-[1.2rem]' seed={item.Address.toLowerCase()} size={10} scale={4} />
                                    <div className={item.Address.toLowerCase() == address.toLowerCase() ? "text-[#F4B512]" : ""}>{item.Address.slice(0, 6) + "..." + item.Address.slice(-4)}</div>
                                </div>
                                <div className={item.Address.toLowerCase() == address.toLowerCase() ? " text-right basis-[6.7%]" : "  text-right basis-[6.7%]"}>{item.Quantity}</div>
                            </div>
                        ))}
                    </div>

                    <div className='text-[1.6rem] text-[#5F6D7E]'>Display up to 50 lines</div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}