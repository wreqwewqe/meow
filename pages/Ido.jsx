import React, { useState } from 'react'
import Header from '../components/Header'
import { Slider, Switch, Button, message, Input } from 'antd';

import { useAccount, useNetwork, useContractWrite, parseEther, useContractRead } from 'wagmi'
import ido from "../contracts/ido";
import t from "../public/locales"
import { useGlobalContext } from '../GlobalContext';

export default function Ido() {

    const { state, dispatch } = useGlobalContext();
    console.log("sate", state)
    const lang = state.lang;
    const { address, isConnecting, isDisconnected } = useAccount();
    console.log("aaaaaaaaaaaaaa", address);
    const { chain, chains } = useNetwork()
    const chainId = 11155111;
    const [inputValue, setInputValue] = useState(2);
    const [value, setValue] = useState("");
    const target_chain = 11155111;
    const onChange = (newValue) => {
        setInputValue(newValue);
    };
    const { write: start_raise } = useContractWrite({
        address: ido.address,
        abi: ido.abi,
        functionName: 'raise',
        chainId,
        value: BigInt(inputValue * 10 ** 18),
        onError(error) {
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })
    const { write: start_claim } = useContractWrite({
        address: ido.address,
        abi: ido.abi,
        functionName: 'claim',
        chainId,
        onError(error) {
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })
    const { write: start_end_ido } = useContractWrite({
        address: ido.address,
        abi: ido.abi,
        functionName: 'end_ido',
        chainId,
        onError(error) {
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })
    const { data: token_balance } = useContractRead({
        address: ido.address,
        abi: ido.abi,
        functionName: 'get_balance',
        chainId,
        watch: true,
    })
    const { data: ido_status } = useContractRead({
        address: ido.address,
        abi: ido.abi,
        functionName: 'ido_status',
        chainId,
        watch: true,
    })
    // const { data: ido_status } = useContractRead({
    //     address: ido.address,
    //     abi: ido.abi,
    //     functionName: 'ido_status',
    //     chainId,
    //     watch: true,
    // })
    const { data: can_claim_token } = useContractRead({
        address: ido.address,
        abi: ido.abi,
        functionName: 'address_token_amount_lists',
        args: [address],
        chainId,
        watch: true,
    })

    console.log("can_claim_token", can_claim_token);
    console.log("ido_status", ido_status)
    const raise = () => {
        console.log("chain", chain);
        console.log("target_chain", target_chain)
        if (chain && chain.id == target_chain) {
            console.log("address,", address);
            console.log('chain', chain);
            start_raise({ args: [value ? value : "0x0000000000000000000000000000000000000000"] });
        } else {
            message.warning(t[lang].chint)
        }
    }
    const { data: owner } = useContractRead({
        address: ido.address,
        abi: ido.abi,
        functionName: 'owner',
        chainId,
        watch: true,
    })
    console.log("owner", owner)
    const claim = () => {
        if (chain && chain.id == target_chain) {
            start_claim();
        } else {
            message.warning(t[lang].chint)
        }
    }

    const start = () => {
        if (chain && chain.id == target_chain) {
            start_end_ido();
        } else {
            message.warning(t[lang].chint)
        }
    }

    return (
        <div className='bg-[black] h-screen max-w-full' >
            <Header ></Header>
            <h1 suppressHydrationWarning className='text-[white] text-center'>{t[lang].process_ido}:{String(ido_status)}</h1>
            <div className='text-[white] text-center text-[30px] mt-[30px]'>{t[lang].ititle}</div>
            <div className='text-[white] text-center text-[20px] mt-[20px]'>{t[lang].icontent1}</div>
            <div className='text-[white] text-center mt-[20px]'>{t[lang].icontent2}</div>
            <div className='text-[white] text-center mt-[30px]'>{t[lang].ititle2}</div>
            <div className='bg-[white] w-[200px] m-auto text-[white] mt-[30px] flex justify-around p-[10px] rounded-[10px]'>
                <Slider className='basis-4/5' onChange={onChange} defaultValue={2} max={2} min={0.1} step={0.1} />
                <div className='text-[black]  flex items-center '>{inputValue}</div>
            </div>
            <div className='text-center mt-[30px]'><Input defaultValue={""} onChange={(e) => {
                console.log(e.target.value);
                setValue(e.target.value);
            }} className='min-[320px]:w-full md:w-[500px] ' placeholder={t[lang].iinput} /></div>
            <div className=' flex mt-[20px]'> <button className='green-button m-auto bg-[red]' onClick={raise}>{t[lang].iapply}</button></div>
            <h2 className='text-[white] text-center mt-[10px]' suppressHydrationWarning>{t[lang].after_ido}{can_claim_token && (BigInt(can_claim_token) / BigInt(10 ** 18) + " ") || 0} cb</h2>

            <div className=' flex mt-[20px]'> <button className='green-button m-auto bg-[red]' onClick={claim}>{t[lang].claim_ido}</button></div>
            <h2 className='text-[red] text-center mt-[30px]' suppressHydrationWarning >{t[lang].iido_balance}:{Math.ceil(String(token_balance) / 10 ** 18)}CB</h2>
            {/* {owner == address ? <p suppressHydrationWarning className='text-[white]' >开启</p> : <></>} */}
            <div className={' text-center mt-[20px]' + (owner && (owner === address) ? " " : " hidden")}> <div onClick={start} className={' green-button text-[white] '}>{t[lang].end_ido}</div></div>
        </div >
    )
}
