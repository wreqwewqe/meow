import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../public/logo.jpg"
import t from "../../public/locales"
import { Select } from "antd"
import { useGlobalContext } from '../../GlobalContext';
import { Popover } from "antd"
import { useDisconnect, useAccount, useNetwork } from 'wagmi'

import {
    CopyFilled,
    DownOutlined
} from '@ant-design/icons';
function Header() {
    const { disconnect } = useDisconnect()
    const { chain, chains } = useNetwork()
    console.log("chain", chain);
    const { address, isConnecting, isDisconnected } = useAccount()
    console.log("address", address, isConnecting, isDisconnected)
    const button_style = 'box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none';
    const { state, dispatch } = useGlobalContext();
    const [show, setShow] = useState(false);
    console.log("sate", state)
    const lang = state.lang;
    const router = useRouter()
    console.log("router", router)
    console.log("t", t);
    const market = () => (<div className='w-[200px] font-bold'>
        <div className='cursor-pointer' onClick={() => { router.push("EthMarket") }}>Ethereum Market</div>
        <div className='cursor-pointer' onClick={() => { router.push("ScrollMarket") }}>Scroll Market</div>
    </div>)
    const onClick = () => {

    }
    const content = (
        <div className='box-border w-[317px] h-[322px] pt-[22px] pr-[20px] pb-[21px] pl-[21px]'>
            <div className='flex justify-between items-center w-[221px]'>
                <div className='w-[48px] h-[48px] bg-[#F4B512] rounded-[50%]'></div>
                <div className='flex justify-between  items-center w-[153px] h-[22px]'>
                    <div className='font-medium text-[18px]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                    <div ><CopyFilled className='w-[15px] h-[15px] cursor-pointer' /></div>
                </div>
            </div>
            <div className='flex  justify-between  w-[244px] h-[28px] mt-[12px] mb-[24px] text-[#5F6D7E] text-center text-[14px] font-medium'>
                <div onClick={() => connectM()} className='cursor-pointer w-[130px] border border-solid border-[#EAEBF0] rounded-[2px]'>SWITCH WALLET</div>
                <div onClick={() => disconnect()} className=' cursor-pointer  w-[108px] border border-solid border-[#EAEBF0] rounded-[2px]'>DISCONNECT</div>
            </div>
            <div className='text-[16px]'>
                <div className='h-[22px] mb-[16px] font-medium text-[#272D37] cursor-pointer' onClick={() => { router.push("/Profile") }}> My profile</div>
                <div className='h-[1px] bg-[#EAEBF0] mb-[16px]'></div>
                <div className='font-medium text-[14px] text-[#5F6D7E] mb-[6px]'>Network</div>
                <div className='w-[85px] flex items-center justify-between mb-[16.5px] text-[#272D37] font-medium '><div className='w-[6px] h-[6px] rounded-[50%] bg-[#28DD24]'></div>{chain && chain.name || " "}</div>
                <div className='h-[1px] bg-[#EAEBF0] mb-[24px]'></div>
                <div className='font-medium text-[#272D37] cursor-pointer'>View on Explorer</div>
            </div>
        </div>
    );
    return <div className='box-border  h-[86px] py-[20px] px-[60px]'>
        <div></div>
        <div className=' flex justify-between px-[32px] h-full'>
            <div className=' flex  justify-between font-semibold  text-[15px] items-center w-[588px] '>
                <div><Image src={logo} height={38}></Image></div>
                <div className={router.pathname.includes("Home") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Home") }}>Home</div>
                <div className={router.pathname.includes("Dashboard") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Dashboard") }}>Dashboard</div>
                <div className={router.pathname.includes("Market") ? 'active cursor-pointer' : "cursor-pointer"} ><Popover content={market}>Market <DownOutlined /></Popover></div>
                <div className='cursor-pointer'>Docs</div>
                <div className='cursor-pointer'>Security</div>
            </div>
            {/* <ConnectButton chainStatus="none" showBalance={false} /> */}
            <ConnectButton></ConnectButton>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks

                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button onClick={openConnectModal} type="button" className={button_style}>
                                            Connect Wallet
                                        </button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} type="button" className={button_style}>
                                            {account.displayName}
                                        </button>
                                    );
                                }

                                return (
                                    <Popover content={content}>
                                        <div style={{ display: 'flex', gap: 12 }}>

                                            <button type="button" className={button_style}>
                                                {account.displayName}

                                            </button>
                                        </div>
                                    </Popover>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    </div>
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['header']),
    },
})

export default Header