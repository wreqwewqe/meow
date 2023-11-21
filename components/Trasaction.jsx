import React, { useState, useRef } from 'react'
import { Modal, Input } from "antd"
export default function Trasaction({ title, open, setOpen }) {
    const [value, setValue] = useState("");
    const variable = useRef();
    const stable = useRef();
    const handleOk = () => {

    }
    const handleCancel = () => {
        setOpen(false)
    }
    const onChange = (values) => {
        console.log("values", values.target.value);
        setValue(values.target.value)
    }
    const rate_change = (e) => {
        console.log('e', e);
        console.log("variable", variable)
        variable.current.style.backgroundColor = "#919AA6";
        stable.current.style.backgroundColor = '#919AA6'
        e.target.style.backgroundColor = "white"
    }
    return (
        <div><Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel} footer="">
            {
                title == "Borrow" ?
                    <div>
                        <div className='font-medium text-[16px] mb-[12px]'>Borrow APY Rate</div>
                        <div className="box-border p-[4px] bg-[#919AA6] flex" onClick={rate_change}>
                            <div ref={variable} className='basis-1/2 bg-[white] rounded-[6px] font-bold text-center cursor-pointer' >Variable</div>
                            <div ref={stable} className='basis-1/2  rounded-[6px] font-bold text-center cursor-pointer' >Stable</div>
                        </div>
                    </div> :
                    <></>
            }
            <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Amount</div>
            <div className='relative zdy-input border border-solid border-[#E5E3E6] rounded-[6px]'>
                <Input value={value} bordered={false} onChange={onChange} placeholder='Enther the Amount' suffix={
                    <div>
                        <div className='font-bold text-[20px] text-right'>{title.split(" ")[1]}</div>
                    </div>
                }></Input>
                <div className='flex justify-between box-border px-[10px] mb-[5px]'><div className='text-[#D7D7D7] '>$0 </div> <div><span className='text-[14px] text-[#919AA6]'>Supply Balance</span> 0.1<span className='text-[#F4B512] cursor-pointer'>Max</span></div></div>
            </div>
            <div className='mt-[20px] mb-[12px] text-[16px] font-semibold'>Transaction OverView</div>
            <div className='border border-solid border-[#E5E3E6] rounded-[6px] box-border py-[12px] px-[16px] mb-[20px]'>
                <div className='flex justify-between mb-[12px]'>
                    <div className='text-[#919AA6]'>Supply APY</div>
                    <div className='font-bold'>0.04%</div>
                </div>
                {title.split(" ")[0] == "Repay" ? <></> : <>
                    <div className='flex justify-between'>
                        <div className='text-[#919AA6]'>Collateralization</div>
                        <div>✅</div>
                    </div>
                </>}
                <div className='flex justify-between mt-[12px]'>
                    <div className='text-[#919AA6]'>Health factor</div>
                    <div className='font-bold text-[#00B600]'>0.04%</div>
                </div>
                <div className='text-[#919AA6] text-right'>Liquidation at &gt; 1.0 </div>
            </div>
            {
                title.split(" ")[0] == "Supply" ? <div className='flex mb-[8px] text-[12px] text-[#919AA6]'>
                    <div className='basis-1/2 bg-[#EAEBF0] mr-[5px] box-border py-[6px] text-center'>1.Approved</div>
                    <div className='basis-1/2 bg-[#EAEBF0] box-border py-[6px] text-center'>2.Finished</div>
                </div> : <></>
            }
            {value ?
                <div className='bg-[#F4B512] text-[white] box-border py-[12px] font-bold text-center cursor-pointer rounded-[6px] mb-[8px]' >{title.split(" ")[0] + " " + value + " ETH"}</div>
                : <div className='bg-[#F4B512]/[0.6] text-[white] box-border py-[12px] font-bold text-center rounded-[6px] mb-[8px]'>Enter An Amount</div>
            }
            <div className=' border-solid border border-[#EAEBF0] py-[12px] font-bold text-center cursor-pointer'>Close</div>
        </Modal></div>
    )
}
