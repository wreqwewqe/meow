import React from 'react'
import { Table, Skeleton, Button } from "antd"
import Image from 'next/image';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import bowl from "../public/bowl.png"
import light from "../public/light.png"
import eth from "../public/eth.png"
export default function ShowList({ title, about_me, data, columns, header, supply = true, loading }) {
    console.log("a", loading);
    if (loading) {
        return (
            <div className='box-border w-[100%]  py-[2.4rem] px-[3.2rem] border border-solid border-[#b0b6bd] rounded-[0.5rem]  '>
                <div className='text-[2.2rem] font-semibold mb-[0.8rem] '>{title}</div>
                <Skeleton loading={loading} active></Skeleton>
            </div>
        )
    }
    return (
        (
            data && data.length > 0 ?
                <div className=' box-border py-[24px] px-[32px] border border-solid border-[#EAEBF0] rounded-[5px]  '>
                    <div className='md:text-[2.2rem] text-[16px]  font-semibold mb-[16px] md:mb-[8px] '>{title}</div>
                    {about_me && data.length > 0 ? <div className='flex '>
                        <div className='mr-[0.6rem] text-[#5F6D7E] border border-solid border-[#b0b6bd] py-[0.3rem] px-[0.5rem] '>Balance <span className='text-[#272D37]'>${header[0]}</span></div>
                        <div className='mr-[0.6rem] text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[0.3rem] px-[0.5rem] ' >APY <span className='text-[#272D37]'>{header[1]}%</span></div>
                        <div className='text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[0.3rem] px-[0.5rem]'>{supply ? "Collateral" : "Borrow power used"} <span className='text-[#272D37]'>{header[2]}</span></div>
                    </div> : ""}

                    <div className='block md:hidden '>
                        <div className='mb-[16px] flex'>
                            <Image src={eth} width={38}></Image>
                            <div className='ml-[10px]'>
                                <div className='text-[12px] text-[#5F6D7E]'>Asset</div>
                                <div className='text-[16px] font-bold'>Ethereum</div>
                            </div>
                        </div>
                        <div className='flex justify-between mb-[16px]'>
                            <div>
                                <div className='text-[12px] text-[#5F6D7E] mb-[5px]'>Wallet balance</div>
                                <div className='text-[16px] font-bold'>0.02</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-[#5F6D7E] mb-[5px]'>APY</div>
                                <div className='text-[16px] font-bold'>0.04%</div>
                            </div>
                            <div>
                                <div className='text-[12px] text-[#5F6D7E] mb-[5px]'>Can be collateral</div>
                                <div className='text-[16px] font-bold'>0.04%</div>
                            </div>
                        </div>

                        <div className='flex flex-row-reverse text-[14px] font-bold '>

                            <div className='px-[9.5px] py-[5.5px] rounded-[6px] border border-solid border-[#b0b6bd]'>Details</div>
                            <div className='mr-[6px] px-[9.5px] py-[5.5px] bg-[#F4B512] text-[white] rounded-[6px]'>Supply</div>
                            {/* <Button className=' text-[1.2rem] bg-[#F4B512] text-[white] rounded-[0.5rem] py-[0.3rem] px-[0.6rem] mr-[0.4rem] cursor-pointer border-none' onClick={() => { setOperation("Repay"); setBoxData(record); setOpen(true) }}>Repay</Button> */}
                            {/* <Button className=' text-[1.2rem] py-[0.3rem] px-[0.5rem] rounded-[0.6rem] border border-solid border-[#b0b6bd] cursor-pointer flex items-center justify-center' disabled={!record.borrowIsable} onClick={() => { setOperation("Borrow"); setBoxData(record); setOpen(true) }}>Borrow</Button> */}
                        </div>
                    </div>
                    <div className='hidden md:block  rounded-[1px] border border-solid border-[#EAEBF0] mt-[0.8rem] overflow-x-scroll no_scroll' >
                        <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div> :
                <div className='box-border py-[24px] px-[32px] border border-solid border-[#EAEBF0] rounded-[5px]'>
                    {title == "Your supplies" || title == "Your borrows" ?
                        (<div>
                            {title == "Your supplies" ? <Image src={bowl} height={32}></Image> : <Image src={light} height={32}></Image>}
                            <div className='mt-[2.4rem] mb-[8px]  text-[16px] md:text-[2.2rem] font-bold'>{title}</div>
                            <div className='text-[#5F6D7E] text-[16px]'>{title == "Your supplies" ? "Nothing supplied yet" : "Nothing borrowed yet"}</div>
                        </div>)
                        : (<div className='mt-[2.4rem] mb-[0.8rem] text-[2.2rem] font-bold'>{title}</div>)}
                </div>
        )
    )
}
