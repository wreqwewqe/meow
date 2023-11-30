import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, Table } from "antd"
import { Skeleton } from 'antd'
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import axios from 'axios'
import { BaseURI, ETHEREUM_ADDRESS} from '../utils/constants';
import { total, total4 } from '../utils/getPrice'
import { useRouter } from 'next/router';
import { BigNumber } from 'ethers'
export default function EthMarket() {
    axios.defaults.baseURL = BaseURI
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marketsize, setMarket] = useState("");
    const [available, setAvailable] = useState("");
    const [tborrows, setTborrows] = useState("");
    const router = useRouter()
    const fetchData = async () => {
        try {
            var totalMarket = BigNumber.from(0);
            var totalBorrow = BigNumber.from(0);
            let assetRow = []
            const response = await axios.get('/market', { params: { net: "Scroll" } });
            let marketdata = response.data.data
            console.log(marketdata);
            for (let index = 0; index < marketdata.length; index++) {
                totalMarket = totalMarket.add(BigNumber.from(marketdata[index]['TotalSupplied']));
                totalBorrow = totalBorrow.add(BigNumber.from(marketdata[index]['TotalBorrowed']));
                if(marketdata[index]["TokenAddress"]==ETHEREUM_ADDRESS){
                    assetRow.push(
                        {
                            key: index+1,
                            asset: [marketdata[index]["Name"],marketdata[index]["Asset"]],
                            total_supplied: [total(BigNumber.from(marketdata[index]["TotalSupplied"])),total4(BigNumber.from(marketdata[index]["TotalLiquidity"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"]-4)))],
                            supply_apy:(BigNumber.from(marketdata[index]['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            total_borrowed: [total(BigNumber.from(marketdata[index]['TotalBorrowed'])),total4(BigNumber.from(marketdata[index]["TotalBorrow"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"]-4)))],
                            variable: (BigNumber.from(marketdata[index]['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            stable: (BigNumber.from(marketdata[index]['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100)
                        }
                    )
                }else{
                    assetRow.push(
                        {
                            key: index+1,
                            asset: [marketdata[index]["Name"],marketdata[index]["Asset"]],
                            total_supplied: [total(BigNumber.from(marketdata[index]["TotalSupplied"])),total(BigNumber.from(marketdata[index]["TotalLiquidity"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"]-2)))],
                            supply_apy:(BigNumber.from(marketdata[index]['SupplyAPY']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            total_borrowed: [total(BigNumber.from(marketdata[index]['TotalBorrowed'])),total(BigNumber.from(marketdata[index]["TotalBorrow"]).div(BigNumber.from(10).pow(marketdata[index]["Decimals"]-2)))],
                            variable: (BigNumber.from(marketdata[index]['BorrowAPYv']).div(BigNumber.from(10).pow(25)).toNumber() / 100),
                            stable: (BigNumber.from(marketdata[index]['BorrowAPYs']).div(BigNumber.from(10).pow(25)).toNumber() / 100)
                        }
                    )
                }
            }
            setData(assetRow);
            setMarket(total(totalMarket));
            setAvailable(total(totalMarket.sub(totalBorrow)));
            setTborrows(total(totalBorrow));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(()=>{
      
          fetchData();
    },[])

    const columns = [
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Asset</div>,
            dataIndex: 'asset',
            key: 'asset',
            render: (text) => (<div className='font-bold text-[16px]' >{text[0]}<div className='font-normal text-[#c8cad3] text-[16px]'>{text[1]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Total supplied</div>,
            dataIndex: 'total_supplied',
            key: 'total_supplied',
            render: (text) => (<div className='font-bold text-[16px]' >{text[1]}<div className='font-normal text-[#c8cad3] text-[16px]'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Supply APY</div>,
            dataIndex: 'supply_apy',
            key: 'supply_apy',
            render: (text) => (<div className='font-bold text-[16px]'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Total borrowed</div>,
            dataIndex: 'total_borrowed',
            key: 'total_borrowed',
            render: (text) => (<div className='font-bold text-[16px]'>{text[1]}<div className='font-normal text-[#c8cad3] text-[16px]'>${text[0]}</div></div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Borrow APY,variable</div>,
            dataIndex: 'variable',
            key: 'variable',
            render: (text) => (<div className='font-bold text-[16px]'>{text}%</div>)
        },
        {
            title: <div className=' text-[#c8cad3] text-[12px] relative bottom-[-10px]'>Borrow APY,stable</div>,
            dataIndex: 'stable',
            key: 'stable',
            render: (text) => (<div className='font-bold text-[16px]'>{text}%</div>)
        },
        {
            title: "",
            render: (text,record) => (<div className='flex font-semibold '>

                <Button className='py-[3px] px-[5px] rounded-[6px] border border-solid border-[#b0b6bd] cursor-pointer' onClick={()=>router.push('/Details?asset='+record.asset[0]+'&&net=Ethereum')}>Details</Button>
            </div>)
        }
    ];
    if (error) {
        return <p>Error: {error.message}</p>;
      }
    return (
        <div className='min-h-full'>
            <Header></Header>
            <div className='box-border  py-[64px] px-[112px] rounded-[10px]'>
                <div className='text-[32px] font-bold w-[317px]'>Ethereum Market </div>
                <div className='flex mt-[16px] mb-[8px] text-[16px] font-normal text-[#5F6D7E] '>
                    <div className='w-[174px] mr-[16px]'>Total market size</div>
                    <div className='w-[174px] mr-[16px]'>Total avalible</div>
                    <div className='w-[174px]'>Total borrows</div>
                </div>
                <div className='flex text-[22px] text-[#272D37] font-semibold'>
                    <div className='w-[174px] mr-[16px]'>${marketsize}</div>
                    <div className='w-[174px] mr-[16px]'>${available}</div>
                    <div>${tborrows}</div>
                </div>
                {loading?<Skeleton loading={loading} active></Skeleton>:
                    <div className='w-[100%] mt-[64px] rounded-[1px] border border-solid border-[#b0b6bd] font-bold ' >
                        <div className='mt-[20px] ml-[20px] text-[24px]'>Ethereum assets</div>
                        <Table className='text-[red]' headerBorderRadius={8} columns={columns} dataSource={loading?[]:data} pagination={false} />
                    </div>
                }
            </div>
            <Footer></Footer>
        </div>
    )
}
