import React from 'react'
import { Table } from "antd"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
export default function ShowList({ title, about_me, data, columns }) {
    console.log("a", title);

    return (
        <div className='box-border w-[100%]  py-[24px] px-[32px] border border-solid border-[#b0b6bd] rounded-[5px]  '>
            <div className='text-[22px] font-semibold mb-[8px] '>{title}</div>
            {about_me ? <div className='flex '>
                <div className='mr-[6px] text-[#5F6D7E] border border-solid border-[#b0b6bd] py-[3px] px-[5px] '>Balance <span className='text-[#272D37]'>$1.39K</span></div>
                <div className='mr-[6px] text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px] ' >APY <span className='text-[#272D37]'>0.00%</span></div>
                <div className='text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px]'>Collateral <span className='text-[#272D37]'>$1.39K</span></div>
            </div> : ""}

            {data.length > 0 ? <div className='w-[100%]  rounded-[1px] border border-solid border-[#b0b6bd] mt-[8px] ' >
                <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={data} pagination={false} />
            </div> : <>hhh</>}

        </div>
    )
}
