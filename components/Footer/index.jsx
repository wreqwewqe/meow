import React from 'react'
import Image from 'next/image';
import logo from "../../public/logo.png"
import x from "../../public/x.png"
import discord from "../../public/discord.png"
import github from "../../public/github.png"
import medium from "../../public/medium.png"
export default function Footer() {
    return (
        <div className='min-w-full box-border   h-[264px] py-[64px] px-[112px] text-[#5F6D7E] '>
            <div className='flex justify-between'>
                <Image src={logo} height={38}></Image>
                <div className='flex justify-between items-center font-medium  w-[428px]'>
                    <div className='cursor-pointer'>About Us</div>
                    <div className='cursor-pointer'>White Paper</div>
                    <div className='cursor-pointer'>Security</div>
                    <div className='cursor-pointer'>Contact</div>
                </div>
                <div className='flex justify-between w-[264px]'>
                    <Image src={x} height={48}></Image>
                    <Image src={discord} height={48}></Image>
                    <Image src={github} height={48}></Image>
                    <Image src={medium} height={48}></Image>
                </div>
            </div>
            <div className='h-[1px] bg-[#EAEBF0] mt-[32px]'></div>
            <div className='flex justify-between mt-[32px]'>
                <div>© 2023 Meow. All Rights Reserved.</div>
                <div className='flex justify-between w-[302px]'>
                    <div>Privacy Policy</div>
                    <div>Terms & Conditions</div>
                </div>
            </div>
        </div>
    )
}
