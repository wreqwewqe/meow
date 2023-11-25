import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image';
import home1 from "../public/home1.jpg"
import home2 from "../public/home2.jpg"
import home3 from "../public/home3.jpg"
import home4 from "../public/home4.jpg"
export default function Home() {
    return (
        <div  >
            <Header isHome={false}></Header>
            <div className='text-center box-border text-[52px] font-bold  h-[276px]  py-[48px] px-[270px]'>
                <div>Meow Protocol</div>
                <div>Purring into the Future of Lending</div>
                <div className='text-[#F4B512]'>Borrow,Save,Earn</div>
            </div>
            <div className='box-border h-[483px] bg-[yellow] '>
                <Image height={483} className='w-full' src={home1}></Image>
            </div>
            <div className=' box-border h-[688px] bg-[#FAFBFC] py-[64px] flex justify-center'>
                <div className=' flex justify-between box-border w-[1280px] h-[560px] px-[32px] py-[1px]'>
                    <div className='mt-[162px] w-[532px]'>
                        <div className='text-[32px] font-semibold'>Meow Reputation for Progress</div>
                        <div className='text-[32px] font-semibold mb-[16px]'>Your <span className='text-[#F4B512]'>Contribution</span>,Your <span className='text-[#F4B512]'>Benefits</span></div>
                        <div className='text-[16px] font-normal mb-[40px]'>Your contributions at Meow accumulate as Meow Reputation, the key to unlocking opportunities and wealth.</div>
                        <div className='flex justify-between w-[315px] h-[46px]'>
                            <div className='box-border bg-[#F4B512] w-[180px] font-semibold py-[12px] px-[18px] text-[15px] rounded-[6px] text-[#FFFFFF] '>start Contriute </div>
                            <div className='box-border bg-[#DAE0E6] font-semibold w-[123px]  py-[12px] px-[18px] text-[15px] rounded-[6px] text-[#272D37]'>Learn More</div>
                        </div>
                    </div>
                    <div className='w-[560px] h-[560px] bg-[pink]'><Image height={560} src={home2}></Image></div>
                </div>
            </div>

            <div className='box-border h-[480px] bg-[#FFFFFF] py-[64px] px-[80px]'>
                <div className=' h-[80px] text-center mb-[64px]' >
                    <div className='font-bold text-[32px]'>MeoW Markets</div>
                    <div className='mt-[16px]'>Meow will expand its permissionless lending business on multiple blockchains.</div>
                </div>
                <div className='flex justify-between box-border h-[208px] bg-[yellow] px-[32px]'>
                    <div className='w-[560px] h-[208px] bg-[pink] text-center'>
                        <div className='h-[60px]'>图片</div>
                        <div className='mt-[20px] mb-[12px] text-[22px] font-semibold'>ETH</div>
                        <div className='text-[#5F6D7E]'>Efficiently unleash cross-media information without cross-media value. Quickly timely deliverables for real-time schemas. </div>
                        <div className='text-[#F4B512] mt-[16px]'>Go to Market </div>
                    </div>
                    <div className='w-[560px] h-[208px] bg-[red] text-center'>
                        <div className='h-[60px]'>图片</div>
                        <div className='mt-[20px] mb-[12px] text-[22px] font-semibold'>Scoll</div>
                        <div className='text-[#5F6D7E]'>Completely pursue scalable customer cross- media through potentialities. Holistically quickly installed portals. </div>
                        <div className='text-[#F4B512] mt-[16px]'>Go to Market </div>
                    </div>
                </div>
            </div>

            <div className='box-border bg-[#FAFBFC] h-[336px] py-[64px] text-center'>
                <div className='font-bold text-[32px]'>Your Funds, Our Priority - Meow Ensures Safety</div>
                <div className='mt-[16px]'>Audited by the Scroll ecosystem’s leading security firms, security of the Meow Protocol is the highest</div>
                <div className='mb-[44px]'>priority.</div>
                <div className='h-[60px]'> <Image height={60} src={home3}></Image></div>
            </div>

            <div className='box-border h-[328px] py-[64px] px-[80px] text-center' >
                <div className='text-[32px] font-bold'>Our Partners</div>
                <div className='mt-[16px]'>Supported by excellent partners in the Web3 space, Meow is growing stronger </div>
                <div className='mb-[64px]'>with their help.</div>
                <Image height={32} src={home4}></Image>
            </div>
            <Footer></Footer>
        </div>
    )
}
