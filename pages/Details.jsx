import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Progress } from "antd"
import { WalletOutlined } from '@ant-design/icons';
export default function EthDetails() {
    return (
        <div className='min-h-full '>
            <Header></Header>
            <div className=' box-border py-[64px] px-[112px] mb-[64px]'>
                <div className='font-bold text-[32px] mb-[16px]'>Ethereum Market</div>
                <div className='flex justify-between w-[800px] mb-[64px]'>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>ETH</div>
                        <div className='text-[#272D37] text-[22px] font-bold'>Ethereum</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Reserve Size</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>100</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Available liquidity</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>0</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Utilization Rate</div>
                        <div className='text-[#272D37] text-[22px]  font-bold'>1.61%</div>
                    </div>
                    <div>
                        <div className='text-[#5F6D7E] mb-[8px]'>Oracle price</div>
                        <div className='text-[#272D37] text-[22px] font-bold'>$1889.00</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='basis-[64%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                        <div className='text-[26px] font-bold mb-[24px]'>Reserve status & configuration</div>
                        <div className='text-[18px] font-bold mb-[8px]'>Supply Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='w-[60%]  flex justify-between mb-[30px]'>
                                <div> <Progress type="circle" percent={75} /></div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>Total supplied</div>
                                    <div className='mb-[10px]'>0.39 of 100</div>
                                    <div>$748.29 of $188.9K</div>
                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY</div>
                                    <div>0.04%</div>
                                </div>
                            </div>
                            <div className='flex mb-[20px] font-bold'>
                                <div className='text-[#272D37] mr-[30px]'>Collateral</div>
                                <div className='text-[green]'>Can be Collateral</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E] mb-[15px]'>Max LTV</div>
                                    <div>75%</div>
                                </div>

                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E] mb-[15px]'>Liquidation threshold</div>
                                    <div>80%</div>
                                </div>
                                <div className='basis-[32%] border-solid border-[1px] border-[#EAEBF0] box-border p-[10px]'>
                                    <div className='text-[#5F6D7E]  mb-[15px]'>Liquidation penalty</div>
                                    <div>5%</div>
                                </div>
                            </div>
                        </div>
                        <div className='text-[18px] font-bold mb-[8px] mt-[24px]'>Borrow Info</div>
                        <div className='border-[1px] border-solid border-[#EAEBF0] box-border p-[20px]'>
                            <div className='w-[60%]  flex justify-between mb-[30px]'>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>Total borrowed</div>
                                    <div className='mb-[10px] font-bold'>0</div>
                                    <div>$12</div>
                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY,variable</div>
                                    <div className='mb-[10px] font-bold'>3.10%</div>

                                </div>
                                <div>
                                    <div className='mb-[10px] text-[#5F6D7E] '>APY,stable</div>
                                    <div className='font-bold'>0.13%</div>
                                </div>
                            </div>
                            <div className='mt-[30px] font-bold'>Collateral Info</div>
                        </div>
                        <div className='mt-[24px] font-bold'>Interest rate model</div>

                    </div>
                    <div className='basis-[32%] box-border py-[24px] px-[32px] border-solid border-[1px] border-[#EAEBF0]'>
                        <div className='text-[#272D37] text-[26px] mb-[24px] font-bold'>Your Info</div>
                        <div className='box-border p-[10px] border-solid border-[1px] border-[#EAEBF0]'>
                            <div className='flex mb-[20px]'>
                                <WalletOutlined className='text-[20px] mr-[30px]' />
                                <div>
                                    <div className='text-[#5F6D7E]'>Wallet balance</div>
                                    <div><span className='font-bold mt-[5px]'>0.02</span>ETH</div>
                                </div>
                            </div>
                            <hr className='mb-[20px] border-[#EAEBF0]' />
                            <div className='flex justify-between items-center'>
                                <div>
                                    <div>Avaliable to supply</div>
                                    <div><span className='font-bold mt-[5px]'>0.02</span>ETH</div>
                                    <div className='mt-[15px]'>$37.78</div>
                                </div>
                                <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none'>Supply</button></div>
                            </div>
                            <div className='flex justify-between mt-[20px] items-center'>
                                <div>
                                    <div>Avaliable to borrow</div>
                                    <div><span className='font-bold mt-[5px]'>0.00</span>ETH</div>
                                    <div className='mt-[15px]'>$0</div>
                                </div>
                                <div><button className='box-border bg-[#F4B512] p-[10px]  rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none'>Borrow</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}
