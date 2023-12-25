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
import {post,get} from '../utils/funcaxios';
import { BaseURI, EthereumCode } from './constants';
import { total } from './getPrice'




const deposit = async (assetAddress,Value,web3ModalRef,setApproveStatu,setSupplyStatu,setDoneStatu,chain,address) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(true, web3ModalRef);
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

            await get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
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
            const allowance = await ERC20Contract.allowance(address,chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress)
            const decimals = await ERC20Contract.decimals();
            if(allowance.lt(BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)))){
              const approve = await ERC20Contract.approve(chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)));
              await approve.wait();
            }
            setApproveStatu("finish")
            setSupplyStatu("process")

            const tx = await poolContract.deposit(assetAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)), "0");
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("finish")
            await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const redeem =async(assetAddress,aTokenAddress,web3ModalRef,value,chain,address,setSupplyStatu, setDoneStatu)=>{
    const signer = await getProviderOrSigner(true,web3ModalRef);
    // const provider = await getProviderOrSigner(false,web3ModalRef);
    const ERC20Contract = new Contract(
      aTokenAddress,
      ATokenABI.abi,
      signer
    )
    if(BigNumber.isBigNumber(value)){
        try{
          setSupplyStatu("process")
          const tx = await ERC20Contract.redeem(value)
          await tx.wait()
          return ""
        }catch(error){
          return error
        }
    }else{
        var Value = (Number(value)*100).toFixed(0)
        try{
            setSupplyStatu("process")
            const decimals = await ERC20Contract.decimals();
            const tx = await ERC20Contract.redeem(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)))
            await tx.wait()
            setSupplyStatu("finish")
            setDoneStatu("process")
            await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
            setDoneStatu("finsih")
            return ""
        }catch(error){
          return error
        }
    }
     
  }

  const borrow = async (assetAddress,value,web3ModalRef,rateMode,chain,address,setSupplyStatu, setDoneStatu) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const poolContract = new Contract(
      chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
      PoolABI.abi,
      signer
    );

    var Value = (Number(value)*100).toFixed(0)
    if(assetAddress==ETHEREUM_ADDRESS){
        try {
            setSupplyStatu("process")
            const tx = await poolContract.borrow(ETHEREUM_ADDRESS, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)),rateMode,0);
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("process")
            await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
            setDoneStatu("finish")
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
            setSupplyStatu("process")
            const decimals = await ERC20Contract.decimals();
            const tx = await poolContract.borrow(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)),rateMode,0);
            await tx.wait();
            setSupplyStatu("finish")
            setDoneStatu("process")
            await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
            setDoneStatu("finish")
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const repay = async(assetAddress,value,web3ModalRef,setApproveStatu,setSupplyStatu,setDoneStatu,chain,address) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(true,web3ModalRef);
    const poolContract = new Contract(
      chain.id==EthereumCode?PoolABI.EthereumAddress:PoolABI.ScrollAddress,
      PoolABI.abi,
      signer
    );

        var Value = (Number(value)*100).toFixed(0)
          if(assetAddress == ETHEREUM_ADDRESS){
              try{
                  setApproveStatu("finish")
                  setSupplyStatu("process")
                  const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)), address,{value:BigNumber.from(Value).mul(BigNumber.from(10).pow(16))});
                  await tx.wait();
                  setSupplyStatu("finish")
                  setDoneStatu("finish")
                  await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
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
              const allowance = await ERC20Contract.allowance(address,chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress)
              const decimals = await ERC20Contract.decimals();
              if(allowance.lt(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)))){
                const approve = await ERC20Contract.approve(chain.id==EthereumCode?CoreABI.EthereumAddress:CoreABI.ScrollAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)));
                await approve.wait();
              }
                setApproveStatu("finish")
                setSupplyStatu("process")
                const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)), address);
                await tx.wait();
                setSupplyStatu("finish")
                setDoneStatu("finish")
                await  get('/v1/updateAsset',{address:assetAddress,net:chain.id==EthereumCode?"Ethereum":"Scroll"})
                return ""
              } catch (error) {
                return error
              }
        }
  }


  const onChangeToScroll=(ethereum,setLoading)=>{
      setLoading(true)
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            // chainId: "0x82750",
            chainId:"0x8274f",
            chainName: 'Scroll Sepolia',
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH', // 2-6 characters long
                decimals: 18
            },
            // rpcUrls: ['https://rpc.scroll.io/'],
            rpcUrls:["https://sepolia-rpc.scroll.io/"],
            // blockExplorerUrls: ['https://scrollscan.com/']
            blockExplorerUrls:["https://sepolia.scrollscan.com"],
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
              console.log("address:",chain.id);
            const userData = await PoolContract.getUserAccountData(address);

            const healthFactor = total((userData.healthFactor).div(BigNumber.from(10).pow(16)));
            await post('/v1/user',{
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