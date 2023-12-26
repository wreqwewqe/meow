import React, { useEffect, useState, useRef } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../public/logo.png"
import t from "../../public/locales"
import { Select } from "antd"
import Blockies from 'react-blockies';
import { useGlobalContext } from '../../GlobalContext';
import { Popover, message } from "antd"
import { useDisconnect, useAccount, useNetwork } from 'wagmi'
import { userMessage } from '../../utils/contractfunc'
import Eth from "../../public/eth.png"
import Scroll from "../../public/scroll.png"
import {
    CopyFilled,
    DownOutlined
} from '@ant-design/icons';
import { EthereumCode, ScrollCode, EthereumScan, ScrollScan } from '../../utils/constants';
import { post } from '../../utils/funcaxios';

function Header({ isHome = true }) {
    const web3ModalRef = useRef();
    const { disconnect } = useDisconnect()
    const { chain, chains } = useNetwork()
    const { address, isConnecting, isDisconnected } = useAccount()
    const button_style = 'box-border bg-[#F4B512] w-[12.3rem] h-[4.6rem] rounded-[0.6rem] text-[white] font-semibold cursor-pointer text-[1.5rem] border-none';
    const { state, dispatch } = useGlobalContext();
    const [show, setShow] = useState(false);
    const [connectTest, setConnectTest] = useState();
    const lang = state.lang;
    const router = useRouter()
    const [yshow, setYshow] = useState(false);
    const copy_address = () => {
        navigator.clipboard.writeText(address).then(() => {
            message.success("copy success!");
        })
    }
    const redirectToExternalPage = () => {
        window.open((chain.id == EthereumCode ? EthereumScan : ScrollScan) + "/address/" + address)
    };
    useEffect(() => {
        if (address) {
            post("/auth", { "address": address }).then((res) => {
                // console.log("wwwwwwwwwwwwwwwww", res.data.token);
                sessionStorage.setItem('token', "Bearer " + res.data.token)
            })
        }
    }, [address])
    const market = () => (<div className='w-[18rem] font-bold'>
        <div className='cursor-pointer flex items-center mb-[1.5rem] text-[1.2rem]' onClick={() => { router.push("EthMarket") }}><Image src={Eth} style={{ width: 'auto', maxHeight: '3rem' }} className='mr-[20px]'></Image> Ethereum Market</div>
        <div className='cursor-pointer flex items-center text-[1.2rem]' onClick={() => { router.push("ScrollMarket") }}><Image src={Scroll} style={{ width: 'auto', maxHeight: '3rem' }} className='mr-[20px]'></Image>Scroll Market</div>
    </div>)
    const content = (conn) => (
        <div className='box-border w-[31.7rem] h-[32.2rem] pt-[2.2rem] pr-[2rem] pb-[2.1rem] pl-[2.1rem]'>
            <div className='flex justify-between items-center w-[22.1rem]'>
                <Blockies className='w-[8rem] h-[8rem] bg-[yellow] rounded-[50%] ' seed={address ? address.toLowerCase() : ""} size={14} scale={4} />
                <div className='flex justify-between  items-center w-[15.3rem] h-[2.2rem]'>
                    <div className='font-medium text-[1.8rem]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                    <div ><CopyFilled className='w-[1.5rem] h-[1.5rem] cursor-pointer' onClick={copy_address} /></div>
                </div>
            </div>
            <div className='flex  justify-between  w-[24.4rem] h-[2.8rem] mt-[1.2rem] mb-[2.4rem] text-[#5F6D7E] text-center text-[1.4rem] font-medium'>
                {/* <div onClick={() => address()} className='cursor-pointer w-[130px] border border-solid border-[#EAEBF0] rounded-[2px]'>SWITCH WALLET</div> */}
                <div onClick={() => disconnect()} className=' cursor-pointer  w-[10.8rem] border border-solid border-[#EAEBF0] rounded-[0.2rem]'>DISCONNECT</div>
            </div>
            <div className='text-[1.6rem]'>
                <div className='h-[2.2rem] mb-[1.6rem] font-medium text-[#272D37] cursor-pointer' onClick={() => { router.push("/Profile") }}> My profile</div>
                <div className='h-[0.1rem] bg-[#EAEBF0] mb-[1.6rem]'></div>
                <div className='font-medium text-[1.4rem] text-[#5F6D7E] mb-[0.6rem]'>Network</div>
                <div className='w-[8.5rem] flex items-center justify-between mb-[1.65rem] text-[#272D37] font-medium '><div className='w-[0.6rem] h-[0.6rem] rounded-[50%] bg-[#28DD24]'></div>{chain && chain.name || " "}</div>
                <div className='h-[0.1rem] bg-[#EAEBF0] mb-[2.4rem]'></div>
                <div className='font-medium text-[#272D37] cursor-pointer' onClick={redirectToExternalPage}>View on Explorer</div>
            </div>
        </div>
    );
    return <div className='box-border  h-[8.6rem] py-[2rem] px-[6rem]'>
        <div className='flex justify-between px-[3.2rem] h-full'>
            <div className='hidden md:flex  justify-between font-semibold  text-[1.5rem] items-center w-[58.8rem] '>
                <div><Image src={logo} style={{ height: '90%', width: '67%' }}  ></Image></div>
                <div className={router.pathname.includes("Home") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Home") }}>Home</div>
                <div className={router.pathname.includes("Dashboard") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Dashboard") }}>Dashboard</div>
                <div className={router.pathname.includes("Market") ? 'active cursor-pointer' : "cursor-pointer"} ><Popover content={market}>Market <DownOutlined /></Popover></div>
                <div className='cursor-pointer' onClick={() => { window.open("https://meowprotocol.gitbook.io/doc/", "_blank") }}>Docs</div>
                <div className='cursor-pointer' onClick={() => { window.open("https://f8t2x8b2.rocketcdn.me/wp-content/uploads/2023/12/VAR-0xMeowProtocol-231127-V2.pdf", "_blank") }}>Security</div>
            </div>
            <div className='hidden md:block'>  {!isHome ? <button onClick={() => { router.push("/Dashboard") }} type="button" className={button_style}>Launch APP</button>
                : <ConnectButton.Custom>
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

                                    // if (chain.unsupported) {
                                    //     return (
                                    //         <button onClick={openChainModal} type="button" className={button_style}>
                                    //             {account.displayName}
                                    //         </button>
                                    //     );
                                    // }

                                    return (
                                        <Popover content={content(openConnectModal)}>
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
                </ConnectButton.Custom>}</div>
        </div>
        <div className='md:hidden flex  justify-between'>
            <div><Image src={logo} style={{ height: '100%', width: '61%' }} ></Image></div>
            <div className=' text-[20px] cursor-pointer' onClick={() => { setShow(!show) }}>{show ? "X" : "三"}</div>
        </div>
        {
            show ?
                <div className='w-[100%] bg-[white]  relative z-40'>
                    <div className='p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer' onClick={() => { router.push("/Home"); setShow(false) }}>Home</div>
                    <div className='p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer' onClick={() => { router.push("/Dashboard"); setShow(false) }}>Dashboard</div>
                    <div className='p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer' onClick={() => { setYshow(!yshow) }}>Market <DownOutlined className='ml-[10px]' /></div>
                    <div className={yshow ? " p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer" : "hidden"} onClick={() => { router.push("/EthMarket"); setShow(false) }}>Ethereum Market</div>
                    <div className={yshow ? "p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer" : "hidden"} onClick={() => { router.push("/ScrollMarket"); setShow(false) }}>Scroll Market</div>
                    <div className='p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer' onClick={() => { window.open("https://meowprotocol.gitbook.io/doc/", "_blank"); setShow(false) }}>Docs</div>
                    <div className='p-[16px] font-bold text-[15px] boredr border-solid border-[transparent] border-b-[#EAEBF0] cursor-pointer' onClick={() => { window.open("", "_blank"); setShow(false) }}>Security</div>
                    <div className='p-[16px] ' onClick={() => { setShow(false) }}><ConnectButton.Custom>
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
                                                <div className='text-center'>
                                                    <button onClick={openConnectModal} type="button" className="px-[18px] py-[12px] bg-[#F4B512] border-none rounded-[6px] text-[white] cursor-pointer">
                                                        Connect Wallet
                                                    </button>
                                                </div>
                                            );
                                        }

                                        // if (chain.unsupported) {
                                        //     return (
                                        //         <button onClick={openChainModal} type="button" className={button_style}>
                                        //             {account.displayName}
                                        //         </button>
                                        //     );
                                        // }

                                        return (
                                            <Popover content={content(openConnectModal)}>
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
                    </ConnectButton.Custom></div>
                </div> :
                <></>
        }
    </div >
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['header']),
    },
})

export default Header