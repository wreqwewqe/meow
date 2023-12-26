import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, Table } from "antd"
import { Skeleton } from 'antd'
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { post, get } from '../utils/funcaxios'
import { BaseURI, ETHEREUM_ADDRESS } from '../utils/constants';
import { total, total4 } from '../utils/getPrice'
import { useRouter } from 'next/router';
import { BigNumber } from 'ethers'
import Eth from "../public/eth.png"
import Weth from "../public/WETH.png"
import Usdc from "../public/USDC.png"
import Dai from "../public/DAI.png"
import Image from 'next/image';
import { useAccount, useConnect, useSwitchNetwork, useNetwork } from 'wagmi'
import { EthereumCode, ScrollCode } from '../utils/constants'
export default function EthMarket() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marketsize, setMarket] = useState("");
    const [available, setAvailable] = useState("");
    const [tborrows, setTborrows] = useState("");
    const router = useRouter()
    const fetchData = async () => {
        try {
            var totalMarket = BigNumber.from(0);
            var totalBorrow = BigNumber.from(0);
            let assetRow = []
            const response = await get('/market', { net: "Scroll" });
            let marketdata = response.data
            // console.log(marketdata);
            for (let index = 0; index < marketdata.length; index++) {
                totalMarket = totalMarket.add(BigNumber.from(marketdata[index]['TotalSupplied']));
                totalBorrow = totalBorrow.add(BigNumber.from(marketdata[index]['TotalBorrowed']));
                if (marketdata[index]["TokenAddress"] == ETHEREUM_ADDRESS) {
                    assetRow.push(
                        {
                            key: index + 1,
                            asset: [marketdata[index]["Name"], marketdata[index]["Asset"]],
                            total_supplied: [total(BigNumber.from(marketdata[index]["TotalSupplied"])), total4(BigNumber.from(marketdata[index]["TotalLiquidity"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"] - 4)))],
                            supply_apy: (BigNumber.from(marketdata[index]['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            total_borrowed: [total(BigNumber.from(marketdata[index]['TotalBorrowed'])), total4(BigNumber.from(marketdata[index]["TotalBorrow"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"] - 4)))],
                            variable: (BigNumber.from(marketdata[index]['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            stable: (BigNumber.from(marketdata[index]['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100)
                        }
                    )
                } else {
                    assetRow.push(
                        {
                            key: index + 1,
                            asset: [marketdata[index]["Name"], marketdata[index]["Asset"]],
                            total_supplied: [total(BigNumber.from(marketdata[index]["TotalSupplied"])), total(BigNumber.from(marketdata[index]["TotalLiquidity"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"] - 2)))],
                            supply_apy: (BigNumber.from(marketdata[index]['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            total_borrowed: [total(BigNumber.from(marketdata[index]['TotalBorrowed'])), total(BigNumber.from(marketdata[index]["TotalBorrow"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"] - 2)))],
                            variable: (BigNumber.from(marketdata[index]['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            stable: (BigNumber.from(marketdata[index]['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100)
                        }
                    )
                }
            }
            setData(assetRow);
            setMarket(total(totalMarket));
            setAvailable(total(totalMarket.sub(totalBorrow)));
            setTborrows(total(totalBorrow));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchData();
    }, [])
    let findIcon = (text) => (text == "ETH" ? Eth : text == "USDC" ? Usdc : text == "DAI" ? Dai : text == "WETH" ? Weth : Eth)
    const columns = [
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] '>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
            render: (text) => (<div className='font-bold text-[1.6rem] flex items-center' >
                <Image src={findIcon(text[0])} style={{ width: 'auto', maxHeight: '4rem' }}></Image>
                <div className='ml-[1rem]'>
                    <div >{text[1]}</div>
                    <div className='font-normal text-[#c8cad3] text-[1.6rem]'>{text[0]}</div>
                </div>
            </div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] text-center'>Total supplied</div>,
            dataIndex: 'total_supplied',
            key: 'total_supplied',
            render: (text) => (<div className='font-bold text-[1.6rem]' ><div className='text-center '>{text[1]}</div><div className='font-normal text-[#c8cad3] text-[1.6rem] text-center'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] text-center'>Supply APY</div>,
            dataIndex: 'supply_apy',
            key: 'supply_apy',
            render: (text) => (<div className='font-bold text-[1.6rem] text-center'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] text-center'>Total borrowed</div>,
            dataIndex: 'total_borrowed',
            key: 'total_borrowed',
            render: (text) => (<div className='font-bold text-[1.6rem]'><div className='text-center'>{text[1]}</div><div className='font-normal text-[#c8cad3] text-[1.6rem] text-center'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] text-center'>Borrow APY,variable</div>,
            dataIndex: 'variable',
            key: 'variable',
            render: (text) => (<div className='font-bold text-[1.6rem] text-center'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]'>Borrow APY,stable</div>,
            dataIndex: 'stable',
            key: 'stable',
            render: (text) => (<div className='font-bold text-[1.6rem]'>{text}%</div>)
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>

                <Button className='text-[1.4rem] py-[0.3rem] px-[0.5rem] rounded-[0.6rem] border border-solid border-[#b0b6bd] cursor-pointer flex items-center justify-center' onClick={() => router.push('/Details?asset=' + record.asset[0] + '&&net=Scroll')}>Details</Button>
            </div>)
        }
    ];
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className='min-h-full'>
            <Header></Header>
            <div className='box-border  py-[64px] px-[32px] md:px-[11.2rem] rounded-[1rem]'>
                <div className='text-[24px] md:text-[3.2rem] font-bold'>Scroll Market </div>
                <div className='hidden md:flex mt-[1.6rem] mb-[0.8rem] text-[1.6rem] font-normal text-[#5F6D7E] '>
                    <div className='w-[17.4rem] mr-[1.6rem]'>Total market size</div>
                    <div className='w-[17.4rem] mr-[1.6rem]'>Total avalible</div>
                    <div className='w-[17.4rem]'>Total borrows</div>
                </div>
                <div className='hidden md:flex text-[2.2rem] text-[#272D37] font-semibold'>
                    <div className='w-[17.4rem] mr-[1.6rem]'>${marketsize}</div>
                    <div className='w-[17.4rem] mr-[1.6rem]'>${available}</div>
                    <div>${tborrows}</div>
                </div>

                <div className='md:hidden flex flex-wrap mt-[16px] '>
                    <div className='w-[50%] '>
                        <div className='text-[16px] text-[#5F6D7E]'>Total market size</div>
                        <div className='text-[22px] text-[#272D37] mt-[8px] font-bold'>${marketsize}</div>
                    </div>
                    <div className='w-[50%]'>
                        <div className='text-[16px] text-[#5F6D7E]'>Total avalible</div>
                        <div className='text-[22px] text-[#272D37] mt-[8px] font-bold'>${available}</div>
                    </div>
                    <div className='mt-[8px]'>
                        <div className='text-[16px] text-[#5F6D7E]'>Total borrows</div>
                        <div className='text-[22px] text-[#272D37] mt-[8px] font-bold'>${tborrows}</div>
                    </div>
                </div>
                {loading ? <Skeleton className='hidden' loading={loading} active></Skeleton> :
                    <div className='hidden md:block w-[100%] mt-[6.4rem] rounded-[1px] border border-solid border-[#b0b6bd] font-bold ' >
                        <div className='mt-[2rem] ml-[2rem] text-[2.4rem]'>Ethereum assets</div>
                        <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={loading ? [] : data} pagination={false} />
                    </div>
                }
                {loading ? <Skeleton className='md:hidden' loading={loading} active></Skeleton> :
                    <div className='md:hidden  px-[32px] py-[32px]  mt-[64px] rounded-[1px] border border-solid border-[#b0b6bd] font-bold ' >
                        <div className='text-[16px] font-bold mb-[16px]'>Ethereum assets</div>
                        {data && data.map((item, index) => (<div>
                            <div className='flex mb-[16px]'>
                                <div className='mr-[10px]'><Image src={findIcon(item.asset[0])} style={{ width: 'auto', maxHeight: '48px' }}></Image></div>
                                <div>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Asset</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.asset[1]}</div>
                                    <div className='text-[12px] text-[#5F6D7E]'>{item.asset[0]}</div>
                                </div>
                            </div>
                            <div className='flex flex-wrap mt-[16px]'>
                                <div className='text-[12px] w-[50%]'>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Total supplied</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.total_supplied[1]}</div>
                                    <div className='text-[12px] text-[#5F6D7E]'>${item.total_supplied[0]}</div>
                                </div>
                                <div className='text-[12px] w-[50%] mt-[16px]'>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Supply APY</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.supply_apy}%</div>
                                </div>
                                <div className='text-[12px] w-[50%] mt-[16px]'>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Total borrowed</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.total_borrowed[1]}</div>
                                    <div className='text-[12px] text-[#5F6D7E]'>${item.total_borrowed[0]}</div>
                                </div>
                                <div className='text-[12px] w-[50%] mt-[16px]'>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Borrow APY,variable</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.variable}%</div>
                                </div>
                                <div className='text-[12px] w-[50%] mt-[16px]'>
                                    <div className='leading-[24px] text-[12px] text-[#5F6D7E]'>Borrow APY,stable</div>
                                    <div className='leading-[30px] text-[16px] text-[#272D37]'>{item.supply_apy}%</div>
                                </div>
                            </div>
                            <div className='mt-[21px] text-right mb-[16px]'>
                                <div className='inline-block  px-[10px] py-[5.5px] text-[bold] text-[14px] rounded-[1px] border border-solid border-[#b0b6bd] cursor-pointer' onClick={() => router.push('/Details?asset=' + item.asset[0] + '&&net=Ethereum')}>Details</div>
                            </div>
                            <div className={index == 3 ? "hidden" : 'border border-solid border-[#EAEBF0] mt-[16px] mb-[16px]'}></div>
                        </div>))}
                    </div>
                }
            </div>
            <Footer></Footer>
        </div>
    )
}
