import React from 'react'
import { Table, Skeleton } from "antd"
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
export default function ShowList({ title, about_me, data, columns, header, supply = true, loading}) {
    // console.log("a", title);
    if(loading){
        return(
        <div className='box-border w-[100%]  py-[24px] px-[32px] border border-solid border-[#b0b6bd] rounded-[5px]  '>
            <div className='text-[22px] font-semibold mb-[8px] '>{title}</div>
            <Skeleton loading={loading} active></Skeleton>
        </div>
        )
    }

    return (
        <div className=' box-border py-[24px] px-[32px] border border-solid border-[#b0b6bd] rounded-[5px]  '>
            <div className='text-[22px] font-semibold mb-[8px] '>{title}</div>
            {about_me&&data.length>0 ? <div className='flex '>
                <div className='mr-[6px] text-[#5F6D7E] border border-solid border-[#b0b6bd] py-[3px] px-[5px] '>Balance <span className='text-[#272D37]'>${header[0]}</span></div>
                <div className='mr-[6px] text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px] ' >APY <span className='text-[#272D37]'>{header[1]}%</span></div>
                <div className='text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px]'>{supply?"Collateral":"Borrow power used"} <span className='text-[#272D37]'>{header[2]}</span></div>
            </div> : ""}

            {data && data.length > 0 ? <div className='  rounded-[1px] border border-solid border-[#b0b6bd] mt-[8px] ' >
                <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={data} pagination={false} />
            </div> : <>hhh</>}

        </div>
    )
}
