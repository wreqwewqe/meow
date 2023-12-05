import React from 'react'
import Image from 'next/image';
import logo from "../../public/logo.png"
import x from "../../public/x.png"
import discord from "../../public/discord.png"
import github from "../../public/github.png"
import medium from "../../public/medium.png"
export default function Footer() {
    return (
        <div className='min-w-full box-border   h-[26.4rem] py-[6.4rem] px-[11.2rem] text-[#5F6D7E] text-[1.5rem]'>
            <div className='flex justify-between'>
                <Image src={logo} height={38}></Image>
                <div className='flex justify-between items-center font-medium  w-[42.8rem]'>
                    <div className='cursor-pointer'>About Us</div>
                    <div className='cursor-pointer'>White Paper</div>
                    <div className='cursor-pointer'>Security</div>
                    <div className='cursor-pointer'>Contact</div>
                </div>
                <div className='flex justify-between w-[26.4rem]'>
                    <Image src={x} height={48}></Image>
                    <Image src={discord} height={48}></Image>
                    <Image src={github} height={48}></Image>
                    <Image src={medium} height={48}></Image>
                </div>
            </div>
            <div className='h-[0.1rem] bg-[#EAEBF0] mt-[3.2rem]'></div>
            <div className='flex justify-between mt-[3.2rem]'>
                <div>© 2023 Meow. All Rights Reserved.</div>
                <div className='flex justify-between w-[30.2rem]'>
                    <div>Privacy Policy</div>
                    <div>Terms & Conditions</div>
                </div>
            </div>
        </div>
    )
}
