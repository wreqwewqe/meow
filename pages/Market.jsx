import React from 'react'
import Header from '../components/Header'
import { Tabs } from 'antd';
import Buy from "./buy"
import Sell from "./sell"
import t from "../public/locales"
import { useGlobalContext } from '../GlobalContext';
export default function Market() {
    const { state, dispatch } = useGlobalContext();
    console.log("sate", state)
    const lang = state.lang;
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: t[lang].tab_sell,
            children: <Sell></Sell>,
        },
        {
            key: '2',
            label: t[lang].tab_buy,
            children: <Buy></Buy>,
        },
    ];
    return (
        <div className='bg-[black] h-screen text-center'>
            <Header ></Header>
            <div className='min-[320px]:w-full md:w-[50%] bg-[white] m-auto  rounded-[10px]'>
                <Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} onChange={onChange} centered />
            </div>

        </div>
    )
}
