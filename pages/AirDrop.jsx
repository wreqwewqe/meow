import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

import { Button, Popover, Form, Input, Modal, Radio, message, Spin } from 'antd'
import { useAccount, useSwitchNetwork, useNetwork, useContractRead, useSendTransaction, useWaitForTransaction, useContractWrite } from 'wagmi'
import {
  QuestionCircleOutlined,
  CopyOutlined
} from '@ant-design/icons';
import t from "../public/locales"
import { useGlobalContext } from '../GlobalContext';
import { useRouter } from 'next/router';

import airDrop from "../contracts/airdrop";
export default function AirDrop() {
  const account = useAccount();
  const { chain } = useNetwork();
  const [spin, setSpin] = useState(false);
  const [obj, setObj] = useState({});
  const chainId = 11155111;
  const should_chainId = 11155111;
  const router = useRouter();
  const { state, dispatch } = useGlobalContext();
  console.log("sate", state)
  const lang = state.lang;
  console.log("chain", chain);
  const { data, write } = useContractWrite({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'can_claim',
    chainId,
    args: [["0x125636921F4355Fc1C47BA115a0b667eB2Fda23F"]],

    onError(error) {
      setSpin(false)
      message.error(error.shortMessage.split(":")[1])
    },
    onSuccess() {
      console.log("data", data);
      message.success(t[lang].cssucess)
    }
  })

  const { write: start_claim } = useContractWrite({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'start_claim',
    chainId,
    onError(error) {
      setSpin(false)
      message.error(error.shortMessage.split(":")[1])
    },
    onSuccess() {
      message.success(t[lang].cssucess)
    }
  })
  const { data: generate_user_data, write: generate_user } = useContractWrite({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'generate_user',
    chainId,
    onError(error) {
      message.error(error.shortMessage.split(":")[1])
      setSpin(false);
    },
    onSuccess() {
      setTimeout(() => {
        message.success(t[lang].cssucess)
        setSpin(false);
      }, 30000);
    }
  })
  const { error: claim_error, data: claim_data, isLoading: claim_isLoading, isSuccess: claim_isSuccess, write: claim_write } = useContractWrite({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'claim',
    chainId,
    onError(error) {
      setSpin(false)
      message.error(error.shortMessage.split(":")[1])
    },
    onSuccess(data) {
      message.success(t[lang].cssucess)
    }
  })
  const { data: add_inviter_data, write: add_inviter_write } = useContractWrite({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'add_inviter',
    chainId,
    onError(error) {
      setSpin(false)
      message.error(error.shortMessage.split(":")[1])
    },
    onSuccess(data) {
      message.success(t[lang].cssucess)
    }
  });


  const { data: air_drop_detail } = useContractRead({
    address: airDrop.address,
    abi: airDrop.abi,
    functionName: 'users',
    chainId: should_chainId,
    args: [account.address],
    watch: true,
  })

  console.log("air_drop_detail", air_drop_detail || 5);
  // console.log("generate_user_data", generate_user_data);
  // console.log("add_inviter_data11111", add_inviter_data);
  // console.log("air_drop_detail", air_drop_detail)
  const { switchNetwork } =
    useSwitchNetwork({
      chainId: 42161,
    })
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const viewClaim = async () => {

    if (chain && chain.id == chainId) {
      if (air_drop_detail && air_drop_detail[3] != 0) {
        setOpen(true)
        console.log("----------------------------------", air_drop_detail[0]);
        form.setFieldsValue({
          "amount": String(air_drop_detail[1]) / 10 ** 18,
          "invite_code": air_drop_detail[3],
          "invite_by": air_drop_detail[2] ? air_drop_detail[2] : ""
        });
        setObj({ invite_by: air_drop_detail[2] })
      } else {
        setSpin(true);
        generate_user()
      }
    } else {
      message.success(t[lang].chint)
    }
  }

  const add = async () => {
    const res = write();
    console.log("res", res);
  }


  const claim = async () => {
    if (account.address && chain.id == should_chainId) {
      claim_write();
    } else {
      message.success(t[lang].chint)
    }
  }
  const start = () => {
    start_claim();
  }
  console.log("ddddddddddddddddddddddddddddd", data);
  return (
    <Spin tip="Loading" size="small" spinning={spin}>
      <div className='bg-[black] h-screen'>
        <Header></Header>
        <h2 className="text-[white] text-center mt-[30px]">{t[lang].atitle}</h2>
        <div className="text-[white] text-[22px] m-auto w-[40%] mt-[30px]">
          {t[lang].acontent}
        </div>
        <Button onClick={add} >添加用户</Button>
        <Button onClick={start}>开放领取空投</Button>
        <div>
          <Modal
            open={open}
            okText={t[lang].ccreate}
            cancelText={t[lang].ccancel}
            onCancel={() => {
              setOpen(false)
            }}
            onOk={() => {
              form
                .validateFields()
                .then(async (values) => {
                  console.log("values", values);
                  console.log("obj", obj);
                  if (values.invite_by && values.invite_by != obj.invite_by) {
                    //改变了invite_by
                    console.log("执行了")
                    const s = add_inviter_write({ args: [values.invite_by] });
                    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr", s);
                  }
                  setOpen(false);
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
                name="amount"
                label={t[lang].can_claim}
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="invite_code"
                label={<>{t[lang].my_invite_code} <CopyOutlined onClick={() => { navigator.clipboard.writeText(form.getFieldValue("invite_code")); message.success("copy success") }} /></>}
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}
              >
                <Input disabled />

              </Form.Item>
              <Form.Item name="invite_by" label={<>{t[lang].fill_invite_code} <Popover content={t[lang].input_hint}>
                <QuestionCircleOutlined className='text-[black]' />
              </Popover></>}>
                <Input disabled={obj.invite_by != 0} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className='text-center mt-[70px] '>
          <div><Button onClick={viewClaim} className='green-button'>{t[lang].aairdops_detail}</Button></div>
          <div><Button onClick={claim} className='green-button mt-[20px]'>{t[lang].aclaim}</Button></div>
        </div>
      </div >
    </Spin>
  )
}
