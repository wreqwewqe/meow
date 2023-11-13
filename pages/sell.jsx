import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Radio, message, Table, Spin } from 'antd';
import { useAccount, useNetwork, useContractWrite, parseEther, useContractRead } from 'wagmi'
import transaction from '../contracts/transaction';
import token from "../contracts/token";
import t from "../public/locales"
import { useGlobalContext } from '../GlobalContext';

import { timestampToDateTime, address_omit } from '../util';
export default function Sell() {
    const { state, dispatch } = useGlobalContext();
    console.log("sate", state)
    const lang = state.lang;
    const { address } = useAccount();
    const { chain } = useNetwork();
    const chainId = 11155111;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [record, setRecord] = useState({});
    const [lists, setLists] = useState([]);
    const [spin, setSpin] = useState(false);
    const [values, setValues] = useState({});
    const add = () => {
        if (chain && chain.id == chainId) {
            setOpen(true);
        }
        else {
            message.warning(t[lang].chint)
        }
    }

    const { data: sell_lists } = useContractRead({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'get_all_sell_lists',
        chainId,
        watch: true,
    })


    useEffect(() => {
        if (sell_lists) {
            let newList = sell_lists.filter(item => item.tran_no != 0).map(item => ({ is_redress: item.is_redress, pay_amount: String(item.pay_amount), receive_amount: String(item.receive_amount), start_time: String(item.start_time), trader: item.trader, tran_no: String(item.tran_no) }))
            setLists(newList)
        }
    }, [sell_lists])
    const { write: start_approve } = useContractWrite({
        address: token.address,
        abi: token.abi,
        functionName: 'approve',
        chainId,
        onError(error) {
            setSpin(false);
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            setTimeout(() => {
                setSpin(false)
                start_add_sell({ args: [BigInt(values.cb * 10 ** 18), BigInt(values.receive_amount * 10 ** 18)] });
            }, 40000);
        }
    })

    const { write: start_compensate } = useContractWrite({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'compensate',
        chainId,
        onError(error) {
            setSpin(false);
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)

        }
    })




    const { write: start_retract_sell } = useContractWrite({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'retract_sell',
        chainId,
        onError(error) {
            setSpin(false);
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })

    const { write: start_success_sell_list } = useContractWrite({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'success_sell_list',
        chainId,
        onError(error) {
            setSpin(false);
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })

    const { write: start_add_sell } = useContractWrite({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'add_sell',
        chainId,
        onError(error) {
            setSpin(false);
            message.error(error.shortMessage.split(":")[1])
        },
        onSuccess() {
            message.success(t[lang].cssucess)
        }
    })

    const { data: sell_lowest_price } = useContractRead({
        address: transaction.address,
        abi: transaction.abi,
        functionName: 'get_sell_lowest_price',
        chainId,
        watch: true,
    })
    const columns = [
        {
            title: t[lang].cpublisher,
            dataIndex: 'trader',
            key: 'trader',
            render: text => address_omit(text)
        },
        {
            title: t[lang].cpay_amount + '(cb)',
            dataIndex: 'pay_amount',
            key: 'pay_amount',
            render: text => text / 10 ** 18
        },
        {
            title: t[lang].creceive_amount + '(eth)',
            dataIndex: 'receive_amount',
            key: 'receive_amount',
            render: text => text / 10 ** 18
        },
        {
            title: t[lang].cpublish_time,
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text) => timestampToDateTime(text)
        },
        {
            title: t[lang].coperate,
            dataIndex: 'draw',
            key: 'draw',
            render: (_, record) => {
                return (<div className='cursor-pointer text-[blue] flex justify-around'>
                    {
                        record.trader != address ? <div onClick={() => {
                            start_success_sell_list({ value: BigInt(record.receive_amount), args: [record.tran_no] });
                        }} >{t[lang].ctrade}</div> : <></>
                    }
                    {
                        record.trader == address ? <div onClick={() => { start_compensate({ args: [record.tran_no] }) }}>{t[lang].ccompensate}</div> : <></>
                    }
                    {
                        record.trader == address ? <div onClick={() => { start_retract_sell({ args: [record.tran_no] }) }}>{t[lang].cretract}</div> : <></>
                    }

                </div>)
            }
        }
    ];
    console.log("sell_lowest_price", sell_lowest_price)
    console.log("sell_lists", sell_lists);
    return (
        <div className='min-[320px]:p-0 lg:p-[20px] h-[600px] overflow-auto'>
            <Spin tip="Loading" size="small" spinning={spin}>
                <Button type="primary" onClick={add}>{t[lang].add_sell}</Button>
                <Modal
                    open={open}
                    title={t[lang].ccreate_order}
                    okText={t[lang].ccreate}
                    cancelText={t[lang].ccancel}
                    onCancel={() => { setOpen(false) }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                console.log("values", values)
                                setSpin(true);
                                setValues({ ...values });
                                //转账cb
                                start_approve({ args: [transaction.address, BigInt(values.cb * 10 ** 18)] });
                                // start_add_sell({ value: String(values.eth * 10 ** 18), args: [values.receive_amount * 10 ** 18] })
                                // if (sell_lowest_price == 0) {
                                //     start_add_sell({ value: String(values.eth * 10 ** 18), args: [values.receive_amount * 10 ** 18] })
                                //     console.log("values", values);
                                // } else {
                                //     // values.receive_amount/values.eth

                                //     console.log("????")
                                // }

                                form.resetFields();
                                setOpen(false)
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
                            name="cb"
                            label={t[lang].pay_cb}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title of collection!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                console.log("e.target.value", e.target.value, typeof e.target.value, Number(sell_lowest_price) / 10 ** 18 * 1.1);
                                setMin(e.target.value * (Number(sell_lowest_price) / 10 ** 9 * 0.9))
                                setMax(e.target.value * (Number(sell_lowest_price) / 10 ** 9 * 1.1))
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="receive_amount"
                            label={<>{t[lang].receive_eth}{min}-{max}</>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title of collection!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Table suppressHydrationWarning rowKey="tran_no" className='p-[50px]' columns={columns} dataSource={lists} pagination={false} />
            </Spin>

        </div>
    )
}
