import { BigNumber, Contract, providers, constants } from 'ethers';
// import Web3Modal from "web3modal";
import { useState, useEffect, useRef } from 'react';
import { PoolABI } from "../ABIs/LendingPool";
import { DataProviderABI } from "../ABIs/LendingPoolDataProvider";
import { getProviderOrSigner } from './ProviderOrSigner';
import { ATokenABI } from "../ABIs/AToken";
import { ERC20ABI } from '../ABIs/ERC20';
import {ETHEREUM_ADDRESS} from "../utils/constants"
import { CoreABI } from '../ABIs/LendingPoolCore';
import axios from 'axios';
import { BaseURI, EthereumCode } from './constants';
import { total } from './getPrice'
axios.defaults.baseURL = BaseURI;




const deposit = async (assetAddress,Value,web3ModalRef,setApproveStatu,setSupplyStatu,setDoneStatu,chain) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(false, web3ModalRef);
    const poolContract = new Contract(
      chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
      PoolABI.abi,
      signer
    );
    var value = (Number(Value)*100).toFixed(0)
    if(assetAddress==ETHEREUM_ADDRESS){
        try {
            setApproveStatu("finish")
            setSupplyStatu("process")
            const tx = await poolContract.deposit(ETHEREUM_ADDRESS, BigNumber.from(value).mul(BigNumber.from(10).pow(16)), "0", { value: BigNumber.from(value).mul(BigNumber.from(10).pow(16))});
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("finish")

            await axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
          } catch (error) {
            return error
          }
    }else{
        const ERC20Contract = new Contract(
        assetAddress,
        ERC20ABI.abi,
        signer
        )

        try {
            setApproveStatu("process")
            const decimals = await ERC20Contract.decimals();
            const approve = await ERC20Contract.approve(chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)));
            await approve.wait();
            setApproveStatu("finish")
            setSupplyStatu("process")

            const tx = await poolContract.deposit(assetAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)), "0");
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("finish")
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const redeem =async(assetAddress,aTokenAddress,web3ModalRef,value,chain)=>{
    const signer = await getProviderOrSigner(true,web3ModalRef);
    // const provider = await getProviderOrSigner(false,web3ModalRef);
    const ERC20Contract = new Contract(
      aTokenAddress,
      ATokenABI.abi,
      signer
    )
    if(BigNumber.isBigNumber(value)){
        try{
          const tx = await ERC20Contract.redeem(value)
          await tx.wait()
          return ""
        }catch(error){
          return error
        }
    }else{
        var Value = (Number(value)*100).toFixed(0)
        try{
            const decimals = await ERC20Contract.decimals();
            const tx = await ERC20Contract.redeem(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)))
            await tx.wait()
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
        }catch(error){
          return error
        }
    }
     
  }

  const borrow = async (assetAddress,value,web3ModalRef,rateMode,chain) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const poolContract = new Contract(
      chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
      PoolABI.abi,
      signer
    );

    var Value = (Number(value)*100).toFixed(0)
    if(assetAddress==ETHEREUM_ADDRESS){
        try {
            const tx = await poolContract.borrow(ETHEREUM_ADDRESS, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)),rateMode,0);
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
          } catch (error) {
            return error
          }
    }else{
        const ERC20Contract = new Contract(
        assetAddress,
        ERC20ABI.abi,
        signer
        )

        try {
            const decimals = await ERC20Contract.decimals();
            const tx = await poolContract.borrow(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)),rateMode,0);
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const repay = async(assetAddress,value,web3ModalRef,setApproveStatu,setSupplyStatu,setDoneStatu,chain) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(false,web3ModalRef);
    const poolContract = new Contract(
      chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
      PoolABI.abi,
      signer
    );

    if(BigNumber.isBigNumber(value)){
    if(assetAddress == ETHEREUM_ADDRESS){
        try{
            setApproveStatu("finish")
            setSupplyStatu("process")
            const tx = await poolContract.repay(assetAddress,value , provider.provider.selectedAddress,{value:value});
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("finish")
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
        }catch(error){
            return error
        }
    }else{
        const ERC20Contract = new Contract(
            assetAddress,
            ERC20ABI.abi,
            signer
          )
        try {
            setApproveStatu("process")
            const decimals = await ERC20Contract.decimals();
            const approve = await ERC20Contract.approve(chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress, Value);
            await approve.wait();
            setApproveStatu("finish")
            setSupplyStatu("process")
            // const allowance = await ERC20Contract.allowance(provider.provider.selectedAddress,CoreABI.address);
            // let Value = value.div(BigNumber.from(10).pow(18-decimals))
            // if(allowance.lt(Value)){
            //   const approve = await ERC20Contract.increaseAllowance(CoreABI.address, Value);
            //   await approve.wait();
            // }
            const tx = await poolContract.repay(assetAddress, Value, provider.provider.selectedAddress);
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("finish")
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
            return ""
          } catch (error) {
            return error
          }
    }
    }else{
        var Value = (Number(value)*100).toFixed(0)
        if(assetAddress == ETHEREUM_ADDRESS){
            try{
                setApproveStatu("finish")
                setSupplyStatu("process")
                const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)), provider.provider.selectedAddress,{value:BigNumber.from(Value).mul(BigNumber.from(10).pow(16))});
                await tx.wait();
                setSupplyStatu("finish")
                setDoneStatu("finish")
                await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
                return ""
            }catch(error){
                return error
            }
        }else{
            const ERC20Contract = new Contract(
                assetAddress,
                ERC20ABI.abi,
                signer
              )
            try {
              setApproveStatu("process")
                const decimals = await ERC20Contract.decimals();
                const approve = await ERC20Contract.approve(chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)));
                await approve.wait();
                setApproveStatu("finish")
                setSupplyStatu("process")
                const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)), provider.provider.selectedAddress);
                await tx.wait();
                setSupplyStatu("finish")
                setDoneStatu("finish")
                await  axios.get('/updateAsset',{params:{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"}})
                return ""
              } catch (error) {
                return error
              }
        }
    }
  }


  const onChangeToScroll=(ethereum,setLoading)=>{
      setLoading(true)
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x82750",
            chainName: 'Scroll',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH', // 2-6 characters long
                decimals: 18
            },
            rpcUrls: ['https://rpc.scroll.io/'],
            blockExplorerUrls: ['https://scrollscan.com/']
          }
        ]
      }).then((res) => {
          setLoading(false)
      }).catch((err) => {
        setLoading(false)
      })
  }
  const userMessage = async(web3ModalRef,address,chain,code)=>{
            const provider = await getProviderOrSigner(true, web3ModalRef);
            const PoolContract = new Contract(
                chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
                PoolABI.abi,
                provider
            );
              console.log("address:",provider);
            const userData = await PoolContract.getUserAccountData(address);
            console.log("userdata",userData);
            const healthFactor = total((userData.healthFactor).div(BigNumber.from(10).pow(16)));
            await axios.post('/user',{
                "address":address,
                "healthFactor":healthFactor,
                "ltv":userData.ltv.toString(),
                "totalliquidity":userData.totalLiquidityETH.toString(),
                "totalcollateral":userData.totalCollateralETH.toString(),
                "availableborrow":userData.availableBorrowsETH.toString(),
                "totalborrow":userData.totalBorrowsETH.toString(),
                "totalfee":userData.totalFeesETH.toString(),
                "net":chain.id==5?"Ethereum":"Scroll",
                "invitedCode":code
            })
  }
  module.exports = {
    deposit,redeem,borrow,repay,onChangeToScroll,userMessage
}