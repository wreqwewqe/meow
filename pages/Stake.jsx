import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, Slider, Table, message, Button } from 'antd';
import Header from '../components/Header'
import { useAccount, useNetwork, useContractWrite, parseEther, useContractRead } from 'wagmi'
import stake from "../contracts/stake";
import token from "../contracts/token"
import { timestampToDateTime } from '../util';
import t from "../public/locales"
import { useGlobalContext } from '../GlobalContext';
export default function Stake() {
    const { state, dispatch } = useGlobalContext();
    console.log("sate", state)
    const lang = state.lang;
    const [open, setOpen] = useState(false);
    const { address, isConnecting, isDisconnected } = useAccount();
    const { chain, chains } = useNetwork()
    const [lists, setLists] = useState([]);
    const [form] = Form.useForm();
    const [stakeParams, setStakeParams] = useState({ stake_amount: 0, stake_period: 1 });
    const should_chainId = 11155111;
    const { data: my_discount } = useContractRead({
        address: stake.address,
        abi: stake.abi,
        functionName: 'address_to_discount',
        chainId: should_chainId,
        args: [address],
        watch: true,
    })
    // console.log("my_discount", my_discount[0]);

    const { data: my_stake_list } = useContractRead({
        address: stake.address,
        abi: stake.abi,
        functionName: 'get_order_list',
        chainId: should_chainId,
        args: [address],
        watch: true,
    })
    console.log("my_stake_list", my_stake_list);
    console.log("lists", lists);
    useEffect(() => {
        console.log("我改变了")
        let arr = my_stake_list && my_stake_list.filter(item => (String(item.stake_period) != 0)).map(item => ({ stake_no: String(item.stake_no), stake_amount: String(item.stake_amount) / 10 ** 18, stake_period: String(item.stake_period), start_stake_time_timestamp: String(item.start_stake_time_timestamp) }));
        console.log("arr", arr);
        setLists(arr);
    }, [my_stake_list])
    const { write: start_withdraw } = useContractWrite({
        address: stake.address,
        abi: stake.abi,
        functionName: 'withdraw_stake',
        chainId: should_chainId,
        onError(error) {

            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })
    const { write: start_stake } = useContractWrite({
        address: stake.address,
        abi: stake.abi,
        functionName: 'stake',
        chainId: should_chainId,
        onError(error) {

            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })
    const { write: start_transfer } = useContractWrite({
        address: token.address,
        abi: token.abi,
        functionName: 'transfer',
        chainId: should_chainId,
        onError(error) {
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            start_stake({ args: [stakeParams.stake_amount, stakeParams.stake_period || 1] });
        }
    })
    console.log("chain", chain);
    const marks = {
        0: '1',
        25: '7',
        50: '30',
        75: "180",
        100: "360",
    }
    const columns = [

        {
            title: t[lang].stake_amount,
            dataIndex: 'stake_amount',
            key: 'stake_amount',
        },
        {
            title: t[lang].stake_period,
            dataIndex: 'stake_period',
            key: 'stake_period',
        },
        {
            title: t[lang].stake_time,
            dataIndex: 'start_stake_time_timestamp',
            key: 'start_stake_time_timestamp',
            render: (text) => timestampToDateTime(text)
        },
        {
            title: t[lang].coperate,
            dataIndex: 'draw',
            key: 'draw',
            render: (_, record) => <div onClick={() => { start_withdraw({ args: [record.stake_no] }) }} className='cursor-pointer text-[blue]'>{t[lang].withdraw}</div>
        }
    ];
    return (
        <div className='bg-[black] min-h-screen box-border text-center'>
            <Header ></Header>
            <div className='text-[white] p-[50px]'>{t[lang].stake}</div>
            <button className='green-button' onClick={() => { setOpen(true) }}>{t[lang].stake}</button>
            <div className='text-[white] mt-[20px] mb-[20px]' suppressHydrationWarning >{t[lang].my_commission}{my_discount ? String(my_discount[1]) : 0}%</div>
            <div className='text-[white]' >{t[lang].my_fee}{my_discount ? String(my_discount[1]) : 0}%</div>
            <div></div>
            <Modal
                open={open}
                title={t[lang].stake}
                okText={t[lang].ccreate}
                cancelText={t[lang].ccancel}
                onCancel={() => { setOpen(false) }}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            if (chain && chain.id == should_chainId) {
                                console.log("values", values, marks[values.stake_period])
                                setStakeParams({ ...values, stake_period: marks[values.stake_period], stake_amount: values.stake_amount * 10 ** 18 })
                                form.resetFields();
                                setOpen(false)
                                start_transfer({ args: [stake.address, BigInt(values.stake_amount * 10 ** 18)] })
                            } else {
                                message.warning("请先连接钱包并切换到arb")
                            }
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="stake_amount"
                        label={t[lang].stake_amount}
                        rules={[
                            {
                                required: true,
                                message: 'Please input the stake_amount!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="stake_period" label={t[lang].stake_period}>
                        <Slider dots={true} step={null} marks={marks} />
                    </Form.Item>
                </Form>
            </Modal>
            <Table suppressHydrationWarning className='lg:p-[100px]' key="stake_no" columns={columns} dataSource={lists} pagination={false} />
        </div>
    )
}
