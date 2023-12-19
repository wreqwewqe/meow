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
            <div className='text-center box-border px-[16px] text-[36px] md:text-[5.2rem] font-bold  md:h-[27.6rem]  md:py-[4.8rem] md:px-[27rem] mt-[24px] md:mt-[-2rem] mb-[24px] md:mb-[6rem]'>
                <div >Meow Protocol</div>
                <div>Purring into the Future of Lending,</div>
                <div className='text-[#F4B512] md:mb-[0.2rem]'>Deposit,Borrow,Earn</div>
            </div>
            <div className='box-border  md:mb-[-0.3rem] mt-[1rem] mb-[20px] md:mt-[0.1rem]'>
                <Image style={{ height: '20%' }} className='w-full' src={home1}></Image>
            </div>
            <div className='box-border px-[16px] md:h-[68.8rem] md:bg-[#FAFBFC] md:py-[6.4rem] md:flex md:justify-center'>
                <div className=' md:flex md:justify-between md:box-border md:w-[128rem] md:h-[56rem] md:px-[3.2rem] md:py-[1px]'>
                    <div className=' md:mt-[16.2rem] md:w-[53.2rem]'>
                        <div className='text-[2.8rem] md:text-[3.2rem] font-semibold'>Meow Reputation for Progress</div>
                        <div className='text-[28px] md:text-[3.2rem] font-semibold mb-[1.6rem]'>Your <span className='text-[#F4B512]'>Contribution</span>,Your <span className='text-[#F4B512]'>Benefits</span></div>
                        <div className='text-[16px] md:text-[1.6rem] font-normal mb-[4rem]'>Your contributions at Meow accumulate as Meow Reputation, the key to unlocking opportunities and wealth.</div>
                        <div className='flex '>
                            <div className=' md:text-[1.4rem] md:w-[18rem] box-border bg-[#F4B512] w-[180px] font-semibold py-[12px] px-[18px] text-[15px] rounded-[6px] text-[#FFFFFF] mr-[16px]' onClick={() => { router.push("Dashboard") }} style={{ cursor: 'pointer' }}>Start Contribute <ArrowRightOutlined /></div>
                            <div className=' md:text-[1.4rem] box-border bg-[#DAE0E6] font-semibold  py-[12px] px-[18px] text-[15px] rounded-[6px] text-[#272D37]' onClick={() => { window.open("https://meowprotocol.gitbook.io/doc/meow-reputation-system/introduction", "_blank") }} style={{ cursor: 'pointer' }}>Learn More</div>
                        </div>
                    </div>
                    <div className='hidden md:block md:w-[56rem] md:h-[56rem] mt-[10rem]'><Image style={{ width: '80%', height: '60%' }} src={home2}></Image></div>
                    <div className='md:hidden'><Image style={{ width: '100%', height: '60%' }} src={home2}></Image></div>
                </div>
            </div>

            <div className='box-border md:h-[48rem] bg-[#FFFFFF] md:py-[6.4rem] md:px-[8rem]'>
                <div className=' md:h-[8rem] text-center md:mb-[6.4rem]' >
                    <div className='font-bold text-[24px] md:text-[3.2rem]'>Meow Markets</div>
                    <div className='mt-[16px] text-[16px] md:text-[1.8rem]'>Meow will expand its permissionless lending business on multiple blockchains.</div>
                </div>
                <div className='md:flex md:justify-between box-border px-[16px] py-[32px] md:py-0 md:px-[3.2rem]'>
                    <div className='text-center'>
                        <div className='md:h-[6rem]' > <Image width={60} src={Eth}></Image></div>
                        <div className='mt-[16px] mb-[8px] md:mt-[2rem] md:mb-[1.2rem] text-[20px] md:text-[2.2rem] font-semibold'>ETH</div>
                        <div className='text-[#5F6D7E] text-[16px] md:text-[1.2rem]'>Efficiently unleash cross-media information without cross-media value. Quickly timely deliverables for real-time schemas. </div>
                        <div className='text-[#F4B512] mt-[8px] md:mt-[1.6rem] text-[15px] md:text-[1.8rem]' onClick={() => { router.push("EthMarket") }} style={{ cursor: 'pointer' }}>Go to Market <ArrowRightOutlined /></div>
                    </div>
                    <div className=' text-center mt-[0px] md:mt-[0px]'>
                        <div className='md:h-[6rem]'><Image width={60} src={Scroll}></Image></div>
                        <div className='mt-[2rem] mb-[1.2rem] text-[20px] md:text-[2.2rem] font-semibold'>Scoll</div>
                        <div className='text-[#5F6D7E] text-[16px] md:text-[1.2rem]'>Completely pursue scalable customer cross- media through potentialities. Holistically quickly installed portals. </div>
                        <div className='text-[#F4B512] mt-[8px] md:mt-[1.6rem] text-[15px] md:text-[1.8rem]' onClick={() => { router.push("ScrollMarket") }} style={{ cursor: 'pointer' }}>Go to Market <ArrowRightOutlined /></div>
                    </div>
                </div>
            </div>

            <div className='box-border bg-[#FAFBFC] py-[32px] px-[16px] md:px-0 md:py-[6.4rem] text-center'>
                <div className='font-bold text-[24px] md:text-[3.2rem]'>Your Funds, Our Priority - Meow Ensures Safety</div>
                <div className='mt-[12px] md:mt-[1.6rem] text-[16px] md:text-[1.8rem]'>Audited by the Scroll ecosystem's leading security firms, security of the Meow Protocol is the highest priority.</div>
                {/* <div className='mb-[4.4rem] text-[1.8rem]'>priority.</div> */}
                <div className='mt-[32px] md:mt-[4.4rem]'> <Image height={60} src={home3}></Image></div>
            </div>
            <Footer></Footer>
        </div>
    )
}
