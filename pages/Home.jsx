import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image';
import home1 from "../public/home1.png"
import home2 from "../public/home2.png"
import home3 from "../public/home3.png"
import home4 from "../public/home4.jpg"
import Eth from "../public/eth.png"
import Scroll from "../public/scroll.png"
import { useRouter } from 'next/router';
import { ArrowRightOutlined } from '@ant-design/icons'
export default function Home() {
    const router = useRouter()
    return (
        <div  >
            <Header isHome={false}></Header>
            <div className='text-center box-border text-[5.2rem] font-bold  h-[27.6rem]  py-[4.8rem] px-[27rem] mt-[-2rem] mb-[1.5rem]'>
                <div>Meow Protocol</div>
                <div>Purring into the Future of Lending</div>
                <div className='text-[#F4B512]'>Deposit,Borrow,Earn</div>
            </div>
            <div className='box-border  mb-[-0.3rem]'>
                <Image style={{height:'20%'}} className='w-full' src={home1}></Image>
            </div>
            <div className=' box-border h-[68.8rem] bg-[#FAFBFC] py-[6.4rem] flex justify-center'>
                <div className=' flex justify-between box-border w-[128rem] h-[56rem] px-[3.2rem] py-[1px]'>
                    <div className='mt-[16.2rem] w-[53.2rem]'>
                        <div className='text-[3.2rem] font-semibold'>Meow Reputation for Progress</div>
                        <div className='text-[3.2rem] font-semibold mb-[1.6rem]'>Your <span className='text-[#F4B512]'>Contribution</span>,Your <span className='text-[#F4B512]'>Benefits</span></div>
                        <div className='text-[1.6rem] font-normal mb-[4rem]'>Your contributions at Meow accumulate as Meow Reputation, the key to unlocking opportunities and wealth.</div>
                        <div className='flex justify-between w-[31.5rem] h-[4.6rem]'>
                            <div className='box-border bg-[#F4B512] w-[18rem] font-semibold py-[1.2rem] px-[1.8rem] text-[1.5rem] rounded-[0.6rem] text-[#FFFFFF] ' onClick={() => { router.push("Dashboard") }} style={{ cursor: 'pointer' }}>Start Contribute <ArrowRightOutlined /></div>
                            <div className='box-border bg-[#DAE0E6] font-semibold w-[12.3rem]  py-[1.2rem] px-[1.8rem] text-[1.5rem] rounded-[0.6rem] text-[#272D37]' onClick={()=>{window.open("https://meowprotocol.gitbook.io/doc/meow-reputation-system/introduction","_blank")}} style={{ cursor: 'pointer' }}>Learn More</div>
                        </div>
                    </div>
                    <div className='w-[56rem] h-[56rem] mt-[10rem]'><Image style={{width:'80%',height:'60%'}} src={home2}></Image></div>
                </div>
            </div>

            <div className='box-border h-[48rem] bg-[#FFFFFF] py-[6.4rem] px-[8rem]'>
                <div className=' h-[8rem] text-center mb-[6.4rem]' >
                    <div className='font-bold text-[3.2rem]'>Meow Markets</div>
                    <div className='mt-[1.6rem] text-[1.8rem]'>Meow will expand its permissionless lending business on multiple blockchains.</div>
                </div>
                <div className='flex justify-between box-border h-[20.8rem]  px-[3.2rem]'>
                    <div className='w-[56rem] h-[20.8rem] text-center'>

                        <div className='h-[6rem]' > <Image width={60} src={Eth}></Image></div>
                        <div className='mt-[2rem] mb-[1.2rem] text-[2.2rem] font-semibold'>ETH</div>
                        <div className='text-[#5F6D7E] text-[1.2rem]'>Efficiently unleash cross-media information without cross-media value. Quickly timely deliverables for real-time schemas. </div>
                        <div className='text-[#F4B512] mt-[1.6rem] text-[1.8rem]' onClick={() => { router.push("EthMarket") }} style={{ cursor: 'pointer' }}>Go to Market <ArrowRightOutlined /></div>
                    </div>
                    <div className='w-[56rem] h-[20.8rem]  text-center'>
                        <div className='h-[6rem]'><Image width={60} src={Scroll}></Image></div>
                        <div className='mt-[2rem] mb-[1.2rem] text-[2.2rem] font-semibold'>Scoll</div>
                        <div className='text-[#5F6D7E] text-[1.2rem]'>Completely pursue scalable customer cross- media through potentialities. Holistically quickly installed portals. </div>
                        <div className='text-[#F4B512] mt-[1.6rem] text-[1.8rem]' onClick={() => { router.push("ScrollMarket") }} style={{ cursor: 'pointer' }}>Go to Market <ArrowRightOutlined /></div>
                    </div>
                </div>
            </div>

            <div className='box-border bg-[#FAFBFC] h-[33.6rem] py-[6.4rem] text-center'>
                <div className='font-bold text-[3.2rem]'>Your Funds, Our Priority - Meow Ensures Safety</div>
                <div className='mt-[1.6rem] text-[1.8rem]'>Audited by the Scroll ecosystem's leading security firms, security of the Meow Protocol is the highest</div>
                <div className='mb-[4.4rem] text-[1.8rem]'>priority.</div>
                <div className='h-[6rem]'> <Image height={60} src={home3}></Image></div>
            </div>

            {/* <div className='box-border h-[328px] py-[64px] px-[80px] text-center  ' >
                <div className='text-[32px] font-bold'>Our Partners</div>
                <div className='mt-[16px]'>Supported by excellent partners in the Web3 space, Meow is growing stronger </div>
                <div className='mb-[64px]'>with their help.</div>
                <Image height={32} src={home4}></Image>
            </div> */}
            <Footer></Footer>
        </div>
    )
}
