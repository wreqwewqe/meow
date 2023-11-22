import React from 'react'
import { Table } from "antd"
import Image from 'next/image';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import bowl from "../public/bowl.jpg"
import light from "../public/light.jpg"
export default function ShowList({ title, about_me, data, columns }) {
    console.log("apppppppppppppp", title);

    return (
        (
            data && data.length > 0 ? <div className=' box-border py-[24px] px-[32px] border border-solid border-[#b0b6bd] rounded-[5px]  '>
                <div className='text-[22px] font-semibold mb-[8px] '>{title}</div>
                {about_me ? <div className='flex '>
                    <div className='mr-[6px] text-[#5F6D7E] border border-solid border-[#b0b6bd] py-[3px] px-[5px] '>Balance <span className='text-[#272D37]'>$1.39K</span></div>
                    <div className='mr-[6px] text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px] ' >APY <span className='text-[#272D37]'>0.00%</span></div>
                    <div className='text-[#5F6D7E]  border border-solid border-[#b0b6bd] py-[3px] px-[5px]'>Collateral <span className='text-[#272D37]'>$1.39K</span></div>
                </div> : ""}

                <div className='  rounded-[1px] border border-solid border-[#b0b6bd] mt-[8px] ' >
                    <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={data} pagination={false} />
                </div>
            </div> :
                <div className='box-border py-[24px] px-[32px] border border-solid border-[#b0b6bd] rounded-[5px]'>
                    {title == "Your supplies" ? <Image src={bowl} height={32}></Image> : <Image src={light} height={32}></Image>}
                    <div className='mt-[24px] mb-[8px] text-[22px] font-bold'>{title}</div>
                    <div className='text-[#5F6D7E]'>Nothing supplied yet</div>
                </div>
        )
    )
}
