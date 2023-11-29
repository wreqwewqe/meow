import React, { useEffect, useState, useRef } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from "../../public/logo.jpg"
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

function Header({ isHome = true }) {
    const web3ModalRef = useRef();
    const { disconnect } = useDisconnect()
    const { chain, chains } = useNetwork()
    const { address, isConnecting, isDisconnected } = useAccount()
    const button_style = 'box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none';
    const { state, dispatch } = useGlobalContext();
    const [show, setShow] = useState(false);
    const [connectTest, setConnectTest] = useState();
    const lang = state.lang;
    const router = useRouter()
    const copy_address = () => {
        navigator.clipboard.writeText(address).then(() => {
            message.success("copy success!");
        })
    }
    const redirectToExternalPage = () => {
        window.open((chain.id==EthereumCode?EthereumScan:ScrollScan )+"/address/"+address)
      };
    // useEffect(() => {
    //     if (chain && address) {
    //         const queryString = window.location.search;
    //         const queryParams = new URLSearchParams(queryString);
    //         var code = queryParams.get('code');
    //         // console.log("code:",code?code:"");
    //         if ((chain.id == EthereumCode || chain.id == ScrollCode)) {
    //             userMessage(web3ModalRef, address, chain, code?code:"")
    //         }
    //     }
    // }, [address, chain])
    const market = () => (<div className='w-[200px] font-bold'>
        <div className='cursor-pointer flex items-center mb-[15px]' onClick={() => { router.push("EthMarket") }}><Image src={Eth} width={40} className='mr-[20px]'></Image> Ethereum Market</div>
        <div className='cursor-pointer flex items-center' onClick={() => { router.push("ScrollMarket") }}><Image src={Scroll} width={40} className='mr-[20px]'></Image>Scroll Market</div>
    </div>)
    const onClick = () => {

    }
    const content =(conn)=> (
        <div className='box-border w-[317px] h-[322px] pt-[22px] pr-[20px] pb-[21px] pl-[21px]'>
            <div className='flex justify-between items-center w-[221px]'>
                <Blockies className='w-[80px] h-[80px] bg-[yellow] rounded-[50%] mb-[16px]' seed={address ? address.toLowerCase() : ""} size={14} scale={4} />
                <div className='flex justify-between  items-center w-[153px] h-[22px]'>
                    <div className='font-medium text-[18px]'>{address && (address.slice(0, 6) + "..." + address.slice(-4))}</div>
                    <div ><CopyFilled className='w-[15px] h-[15px] cursor-pointer' onClick={copy_address}/></div>
                </div>
            </div>
            <div className='flex  justify-between  w-[244px] h-[28px] mt-[12px] mb-[24px] text-[#5F6D7E] text-center text-[14px] font-medium'>
                {/* <div onClick={() => address()} className='cursor-pointer w-[130px] border border-solid border-[#EAEBF0] rounded-[2px]'>SWITCH WALLET</div> */}
                <div onClick={() => disconnect()} className=' cursor-pointer  w-[108px] border border-solid border-[#EAEBF0] rounded-[2px]'>DISCONNECT</div>
            </div>
            <div className='text-[16px]'>
                <div className='h-[22px] mb-[16px] font-medium text-[#272D37] cursor-pointer' onClick={() => { router.push("/Profile") }}> My profile</div>
                <div className='h-[1px] bg-[#EAEBF0] mb-[16px]'></div>
                <div className='font-medium text-[14px] text-[#5F6D7E] mb-[6px]'>Network</div>
                <div className='w-[85px] flex items-center justify-between mb-[16.5px] text-[#272D37] font-medium '><div className='w-[6px] h-[6px] rounded-[50%] bg-[#28DD24]'></div>{chain && chain.name || " "}</div>
                <div className='h-[1px] bg-[#EAEBF0] mb-[24px]'></div>
                <div className='font-medium text-[#272D37] cursor-pointer' onClick={redirectToExternalPage}>View on Explorer</div>
            </div>
        </div>
    );
    return <div className='box-border  h-[86px] py-[20px] px-[60px]'>
        <div></div>
        <div className=' flex justify-between px-[32px] h-full'>
            <div className=' flex  justify-between font-semibold  text-[15px] items-center w-[588px] '>
                <div><Image src={logo} width={180}  ></Image></div>
                <div className={router.pathname.includes("Home") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Home") }}>Home</div>
                <div className={router.pathname.includes("Dashboard") ? 'active cursor-pointer' : "cursor-pointer"} onClick={() => { router.push("/Dashboard") }}>Dashboard</div>
                <div className={router.pathname.includes("Market") ? 'active cursor-pointer' : "cursor-pointer"} ><Popover content={market}>Market <DownOutlined /></Popover></div>
                <div className='cursor-pointer'>Docs</div>
                <div className='cursor-pointer'>Security</div>
            </div>
            {/* <ConnectButton chainStatus="none" showBalance={false} /> */}
            {/* <ConnectButton></ConnectButton> */}
            {!isHome ? <button onClick={() => { router.push("/Dashboard") }} type="button" className={button_style}>Launch APP</button>
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
                </ConnectButton.Custom>}
        </div>
    </div>
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['header']),
    },
})

export default Header