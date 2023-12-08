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
import E from "../public/eth.png"
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
            const response = await get('/market', { net: "Ethereum" });
            let marketdata = response.data
            console.log(marketdata);
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

    const columns = [
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem] '>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
            render: (text) => (<div className='font-bold text-[1.6rem] ' >
                <Image src={E} width={20}></Image>
                <div>
                    <div className='text-center'>{text[0]}</div><div className='font-normal text-[#c8cad3] text-[1.6rem]'>{text[1]}</div>
                </div>
            </div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]' text-center>Total supplied</div>,
            dataIndex: 'total_supplied',
            key: 'total_supplied',
            render: (text) => (<div className='font-bold text-[1.6rem]' ><div className='text-center'>{text[1]}</div><div className='font-normal text-[#c8cad3] text-[1.6rem]'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]'>Supply APY</div>,
            dataIndex: 'supply_apy',
            key: 'supply_apy',
            render: (text) => (<div className='font-bold text-[1.6rem]'><div className='text-center'>{text}</div>%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]'>Total borrowed</div>,
            dataIndex: 'total_borrowed',
            key: 'total_borrowed',
            render: (text) => (<div className='font-bold text-[1.6rem]'><div className='text-center'>{text[1]}</div><div className='font-normal text-[#c8cad3] text-[1.6rem]'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]'>Borrow APY,variable</div>,
            dataIndex: 'variable',
            key: 'variable',
            render: (text) => (<div className='font-bold text-[1.6rem] text-center'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[1.2rem] relative bottom-[-1rem]'>Borrow APY,stable</div>,
            dataIndex: 'stable',
            key: 'stable',
            render: (text) => (<div className='font-bold text-[1.6rem] text-center'>{text}%</div>)
        },
        {
            title: "",
            render: (text, record) => (<div className='flex font-semibold '>

                <Button className='py-[0.5rem] px-[1rem] rounded-[0.6rem] border border-solid border-[#EAEBF0] cursor-pointer' onClick={() => router.push('/Details?asset=' + record.asset[0] + '&&net=Ethereum')}>Details</Button>
            </div>)
        }
    ];
    return (
        <div className='min-h-full'>
            <Header></Header>
            <div className='box-border  py-[6.4rem] px-[11.2rem] rounded-[1rem]'>
                <div className='text-[3.2rem] font-bold w-[31.7rem]'>Ethereum Market </div>
                <div className='flex mt-[1.6rem] mb-[0.8rem] text-[1.6rem] font-normal text-[#5F6D7E] '>
                    <div className='w-[17.4rem] mr-[1.6rem]'>Total market size</div>
                    <div className='w-[17.4rem] mr-[1.6rem]'>Total avalible</div>
                    <div className='w-[17.4rem]'>Total borrows</div>
                </div>
                <div className='flex text-[2.2rem] text-[#272D37] font-semibold'>
                    <div className='w-[17.4rem] mr-[1.6rem]'>${marketsize}</div>
                    <div className='w-[17.4rem] mr-[1.6rem]'>${available}</div>
                    <div>${tborrows}</div>
                </div>
                {loading ? <Skeleton loading={loading} active></Skeleton> :
                    <div className='w-[100%] mt-[6.4rem] rounded-[1px] border border-solid border-[#b0b6bd] font-bold ' >
                        <div className='mt-[2rem] ml-[2rem] text-[2.4rem]'>Ethereum assets</div>
                        <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={loading ? [] : data} pagination={false} />
                    </div>
                }
            </div>
            <Footer></Footer>
        </div>
    )
}
