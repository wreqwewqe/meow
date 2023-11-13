import React from 'react'
import Image from 'next/image';
import logo from "../../public/logo.jpg"
import x from "../../public/x.jpg"
import discord from "../../public/discord.jpg"
import github from "../../public/github.jpg"
export default function Footer() {
    return (
        <div className='min-w-full box-border bg-[brown]  h-[264px] py-[64px] px-[112px] text-[#5F6D7E] '>
            <div className='flex justify-between'>
                <Image src={logo} height={38}></Image>
                <div className='flex justify-between items-center font-medium  w-[428px]'>
                    <div>About Us</div>
                    <div>White Paper</div>
                    <div>Security</div>
                    <div>Contact</div>
                </div>
                <div className='flex justify-between w-[192px]'>
                    <Image src={x} height={48}></Image>
                    <Image src={discord} height={48}></Image>
                    <Image src={github} height={48}></Image>
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
