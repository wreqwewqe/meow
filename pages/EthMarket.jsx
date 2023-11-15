import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Table } from "antd"
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
export default function EthMarket() {
    const data = [

        {
            key: '1',
            asset: 'John Brown',
            total_supplied: "0.14",
            supply_apy: "5.33%",
            total_borrowed: "0.1",
            variable: "7.61%",
            stable: "3.33%"
        },
        {
            key: '2',
            asset: 'John Brown',
            total_supplied: "0.14",
            supply_apy: "5.33%",
            total_borrowed: "0.1",
            variable: "7.61%",
            stable: "3.33%"
        },
        {
            key: '3',
            asset: 'John Brown',
            total_supplied: "0.14",
            supply_apy: "5.33%",
            total_borrowed: "0.1",
            variable: "7.61%",
            stable: "3.33%"
        },
        {
            key: '4',
            asset: 'John Brown',
            total_supplied: "0.14",
            supply_apy: "5.33%",
            total_borrowed: "0.1",
            variable: "7.61%",
            stable: "3.33%"
        },
    ];
    const columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: <div className=' text-[#c8cad3] text-[10px] relative bottom-[-10px]'>Total supplied</div>,
            dataIndex: 'total_supplied',
            key: 'total_supplied',
            render: (text) => (<div className='font-bold text-[16px]' >{text}<div className='font-normal text-[#c8cad3] text-[16px]'>$227.03</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Supply APY</div>,
            dataIndex: 'supply_apy',
            key: 'supply_apy',
            render: (text) => (<div className='font-bold text-[16px]'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Total borrowed</div>,
            dataIndex: 'total_borrowed',
            key: 'total_borrowed',
            render: (text) => (<div className='font-bold text-[16px]'>{text}<div className='font-normal text-[#c8cad3] text-[16px]'>$227.03</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Borrow APY,variable</div>,
            dataIndex: 'variable',
            key: 'variable',
            render: (text) => (<div className='font-bold text-[16px]'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Borrow APY,stable</div>,
            dataIndex: 'stable',
            key: 'stable',
            render: (text) => (<div className='font-bold text-[16px]'>{text}</div>)
        },
        {
            title: "",
            render: () => (<div className='flex font-semibold '>

                <div className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer'>Details</div>
            </div>)
        }
    ];
    return (
        <div className='min-h-full'>
            <Header></Header>
            <div className='box-border  py-[64px] px-[112px] rounded-[10px]'>
                <div className='text-[32px] font-bold w-[317px]'>Ethereum Market </div>
                <div className='flex mt-[16px] mb-[8px] text-[16px] font-normal text-[#5F6D7E] '>
                    <div className='w-[174px] mr-[16px]'>Total market size</div>
                    <div className='w-[174px] mr-[16px]'>Total avalible</div>
                    <div className='w-[174px]'>Total borrows</div>
                </div>
                <div className='flex text-[22px] text-[#272D37] font-semibold'>
                    <div className='w-[174px] mr-[16px]'>$1.23K</div>
                    <div className='w-[174px] mr-[16px]'>$643.44K</div>
                    <div>$586.78K</div>
                </div>
                <div className='w-[100%] mt-[64px] rounded-[1px] border border-solid border-[#b0b6bd] font-bold ' >
                    <div className='mt-[20px] ml-[20px] text-[24px]'>Ethereum assets</div>
                    <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={data} pagination={false} />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
