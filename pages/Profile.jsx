import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAccount, useConnect, useSwitchNetwork } from 'wagmi'
import Image from 'next/image';
import copy from "../public/copy.jpg"
import exclaim_point from "../public/exclaim_point.jpg"
import { Popover, Input, message } from 'antd';
export default function Profile() {
    const { address, isConnecting, isDisconnected } = useAccount();
    const content1 = (<div className='text-[14px] font-medium' >Governance Token</div>)
    const content2 = (<div className='text-[14px] font-medium' >Reputation Token</div>)
    const content3 = (<div className='text-[14px] font-medium' >Invite your friends to join Meow, and you can earn more rewards.</div>)
    const copy_address = () => {
        navigator.clipboard.writeText(address);
        message.success("copy success")
    }
    return (
        <div className='h-screen'>
            <Header></Header>
            <div className='box-border px-[112px] py-[64px]'>
                <div className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]'></div>
                <div suppressHydrationWarning className='text-[32px] font-bold mb-[16px]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                <div className='mb-[64px]'><Image src={copy} onClick={copy_address} className='cursor-pointer mr-[8px]' height={15}></Image><span className='text-[16px] text-[#5F6D7E]'>Copy address to clipboard</span></div>
                <div className='flex justify-between mb-[32px]'>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] w-[46%] box-border'>
                        <div className='mb-[24px]'>$ MEO <Popover content={content1}><Image src={exclaim_point} className='cursor-pointer' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>258</div>
                    </div>
                    <div className='px-[32px] py-[24px] border-solid border border-[#EAEBF0] rounded-[5px] w-[46%] box-border'>
                        <div className='mb-[24px]'>$ Meow <Popover content={content2}><Image src={exclaim_point} className='cursor-pointer' height={15} /></Popover></div>
                        <div className='text-[22px] font-bold'>0.1</div>
                    </div >
                </div>
                <div className='box-border border-solid border p-[32px] border-[#EAEBF0] rounded-[5px] mb-[32px]'>
                    <div className='text-[24px] font-bold mb-[40px]'>Invite My Friends <Popover content={content3}><Image src={exclaim_point} className='cursor-pointer' height={16} /></Popover></div>
                    <div className='flex mb-[24px]'><Input className='mr-[23px]' placeholder='Https//www.Meow.xyz/46Juzcyx'></Input> <div className='box-border bg-[#F4B512] px-[21px] py-[12px] whitespace-nowrap rounded-[6px] text-[white] font-semibold cursor-pointer text-[14px] border-none'>Copy Link</div></div>
                    <div className='text-[16px] text-[#5F6D7E]'>Copy the link above to start inviting friends</div>
                </div>

                <div className='p-[32px] h-[710px] border-solid rounded-[5px]  border-[#EAEBF0] mb-[12px]' >
                    <div className='flex justify-between items-end mb-[16px]'>
                        <div className='text-[24px] font-bold'>Monthly $Meow Earning Ranking</div>
                        <div className='text-[16px] font-bold'>My Monthly $Meow Earning: <span className='text-[#F4B512]'>126</span></div>
                    </div>
                    <div className='flex justify-between text-[#5F6D7E] tet-[16px] h-[44px]  border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[6px]'>
                        <div className='basis-[13%]'>Number</div>
                        <div className='basis-[80%]'>Wallet Address</div>
                        <div className='basis-[6.7%]'>Quantity</div>
                    </div>
                    <div className='overflow-y-auto h-[552px] no_scroll'>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px] text-[16px] font-bold'>
                            <div className='basis-[13%] text-[#F4B512]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div >0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>1</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>
                        <div className='flex justify-between items-center h-[72px] box-border pb-[24px] border-solid border-x-0 border-t-0  border-b-1 border-[#EAEBF0] mb-[24px]'>
                            <div className='basis-[13%]'>100</div>
                            <div className='basis-[80%] flex items-center'><div className='w-[48px] h-[48px] rounded-[50%] bg-[#F4B5121A] mr-[12px]'></div><div className='text-[16px] font-bold'>0x174...4aed</div></div>
                            <div className='basis-[6.7%]'>Quantity</div>
                        </div>

                    </div>

                    <div className='text-[16px] text-[#5F6D7E]'>Display up to 50 lines</div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
