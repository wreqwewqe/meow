import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShowList from "../components/ShowList"
import Transaction from "../components/Trasaction"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { useAccount, useConnect, useSwitchNetwork } from 'wagmi'
import { Popover } from "antd"
export default function Dashboard() {
    const [targetChain, setTargetChain] = useState("");
    const [open, setOpen] = useState(false);
    const { chains, error, isLoading, pendingChainId, switchNetwork } =
        useSwitchNetwork({
            chainId: targetChain,
        })
    useEffect(() => {
        if (targetChain) {
            switchNetwork();
        }
    }, [targetChain])


    const content = (
        <div className='w-[317px] text-[18px] font-medium'>
            <p className='cursor-pointer' onClick={() => {
                setTargetChain("1");
            }}>Ethereum Market</p>
            <p className='cursor-pointer' onClick={() => {
                setTargetChain("534352");
            }}>Scroll Market</p>
        </div>
    );
    const button_style = 'box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none';
    const { address, isConnecting, isDisconnected } = useAccount()
    const your_supply_data = [
        {
            key: '1',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: true,
        },
        {
            key: '2',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: false,
        },
        {
            key: '3',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.05%',
            can_collateral: false,
        },
    ];
    const your_supply_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: <div className=' text-[#c8cad3] text-[10px] relative bottom-[-10px]'>Wallet balance</div>,
            dataIndex: 'wallet',
            key: 'wallet',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'apy',
            key: 'apy',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>Can be Collateral</div>,
            key: 'can_collateral',
            render: (text) => text ? (<div className='text-center'> <CheckOutlined /> </div>) : (<div className='text-center'><CloseOutlined /></div>)
        },
        {
            title: "",
            render: () => (<div className='flex font-semibold '>
                <div className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer' onClick={() => { setOpen(true) }}>Supply</div>
                <div className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer'>Details</div>
            </div>)
        }
    ];
    const your_borrow_data = [

        {
            key: '2',
            asset: 'John Brown',
            debt: 0.02,
            apy: '0.04%',
            apy_type: "Variable",
        },
        {
            key: '3',
            asset: 'John Brown',
            debt: 0.02,
            apy: '0.05%',
            apy_type: "Variable",
        },
    ];
    const your_borrow_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: <div className=' text-[#c8cad3] text-[10px] relative bottom-[-10px]'>Debt</div>,
            dataIndex: 'debt',
            key: 'debt',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'apy',
            key: 'apy',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>APY type</div>,
            dataIndex: 'apy_type',
            key: 'apy_type',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: "",
            render: () => (<div className='flex font-semibold '>
                <div className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer'>Repay</div>
                <div className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer'>Borrow</div>
            </div>)
        }
    ];
    const supply_data = [
        {
            key: '1',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: true,
        },
        {
            key: '2',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: false,
        },
        {
            key: '3',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.05%',
            can_collateral: false,
        },
    ];
    const supply_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: <div className=' text-[#c8cad3] text-[10px] relative bottom-[-10px]'>Wallet balance</div>,
            dataIndex: 'wallet',
            key: 'wallet',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'apy',
            key: 'apy',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>Can be Collateral</div>,
            key: 'can_collateral',
            render: (text) => text ? (<div className='text-center'> <CheckOutlined /> </div>) : (<div className='text-center'><CloseOutlined /></div>)
        },
        {
            title: "",
            render: () => (<div className='flex font-semibold '>
                <div className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer'>Supply</div>
                <div className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer'>Details</div>
            </div>)
        }
    ];
    const borrow_data = [
        {
            key: '1',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: true,
        },
        {
            key: '2',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.04%',
            can_collateral: false,
        },
        {
            key: '3',
            asset: 'John Brown',
            wallet: 0.02,
            apy: '0.05%',
            can_collateral: false,
        },
    ];
    const borrow_columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
        },
        {
            title: <div className=' text-[#c8cad3] text-[10px] relative bottom-[-10px]'>Wallet balance</div>,
            dataIndex: 'wallet',
            key: 'wallet',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>APY</div>,
            dataIndex: 'apy',
            key: 'apy',
            render: (text) => (<div className='font-semibold'>{text}</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px] w-[100px] '>Can be Collateral</div>,
            key: 'can_collateral',
            render: (text) => text ? (<div className='text-center'> <CheckOutlined /> </div>) : (<div className='text-center'><CloseOutlined /></div>)
        },
        {
            title: "",
            render: () => (<div className='flex font-semibold '>
                <div className=' bg-[#F4B512] text-[white] rounded-[5px] py-[3px] px-[6px] mr-[4px] cursor-pointer'>Supply</div>
                <div className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer'>Details</div>
            </div>)
        }
    ];
    return (
        <div className='min-h-full '>
            <Header></Header>
            {address ? <div className='box-border  py-[64px] px-[112px] '>
                <div className='h-[118px] mb-[64px]'>
                    <Popover content={content} placement="bottom">
                        <div className='text-[32px] font-bold w-[317px]'>Ethereum Market <DownOutlined className='text-[16px] cursor-pointer ' /> </div>
                    </Popover>
                    <div className='flex mt-[16px] mb-[8px] text-[16px] font-normal text-[#5F6D7E] '>
                        <div className='w-[174px] mr-[16px]'>Total market size</div>
                        <div className='w-[174px] mr-[16px]'>Total avalible</div>
                        <div className='w-[174px]'>Total borrows</div>
                    </div>
                    <div className='flex text-[22px] text-[#272D37] font-semibold'>
                        <div className='w-[174px] mr-[16px]'>$1.23K</div>
                        <div className='w-[174px] mr-[16px]'>$643.44K</div>
                        <div>$586.78K</div>
                    </div>
                </div>
                <div className='flex mb-[29px] justify-between'>
                    <div className=' w-[48%]'>
                        <ShowList title="Your supplies" about_me={true} data={your_supply_data} columns={your_supply_columns}></ShowList>
                    </div>
                    <div className=' w-[48%]'>
                        <ShowList title="Your borrows" about_me={true} data={your_borrow_data} columns={your_borrow_columns}></ShowList>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className=' w-[48%]'>
                        <ShowList title="Assets to supply" data={supply_data} columns={supply_columns}></ShowList>
                    </div>
                    <div className=' w-[48%]'>
                        <ShowList title="Assets to borrow" data={borrow_data} columns={borrow_columns}></ShowList>
                    </div>
                </div>
            </div> : <div className=' text-center h-[400px]'>
                <div className='mt-[200px] font-bold text-[24px] mb-[64px]'>please,connet your wallet</div>
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
                                                Wrong network
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
                {/* <button className='box-border bg-[#F4B512] w-[123px] h-[46px] rounded-[6px] text-[white] font-semibold cursor-pointer text-[15px] border-none'>Connect wallet</button> */}
            </div>
            }
            <Transaction title="Supply ETH" open={open} setOpen={setOpen}></Transaction>
            <Footer></Footer>
        </div >
    )
}
