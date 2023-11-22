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
import { BaseURI } from './constants';
axios.defaults.baseURL = BaseURI;



const deposit = async (assetAddress,Value,web3ModalRef) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(false, web3ModalRef);
    const poolContract = new Contract(
      PoolABI.address,
      PoolABI.abi,
      signer
    );
    var value = (Number(Value)*100).toFixed(0)
    if(assetAddress==ETHEREUM_ADDRESS){
        try {
            const tx = await poolContract.deposit(ETHEREUM_ADDRESS, BigNumber.from(value).mul(BigNumber.from(10).pow(16)), "0", { value: BigNumber.from(value).mul(BigNumber.from(10).pow(16))});
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
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
            const approve = await ERC20Contract.approve(CoreABI.address, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)));
            await approve.wait();
            // const allowance = await ERC20Contract.allowance(provider.provider.selectedAddress,CoreABI.address)
            // if(allowance.lt(BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)))){
            //     const approve = await ERC20Contract.increaseAllowance(CoreABI.address, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)));
            //     await approve.wait();
            // }
            const tx = await poolContract.deposit(assetAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)), "0");

            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const redeem =async(assetAddress,aTokenAddress,web3ModalRef,value)=>{
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
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
            return ""
        }catch(error){
          return error
        }
    }
     
  }

  const borrow = async (assetAddress,value,web3ModalRef,rateMode) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const poolContract = new Contract(
      PoolABI.EthereumAddress,
      PoolABI.abi,
      signer
    );

    var Value = (Number(value)*100).toFixed(0)
    if(assetAddress==ETHEREUM_ADDRESS){
        try {
            const tx = await poolContract.borrow(ETHEREUM_ADDRESS, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)),rateMode,0);
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
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
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
            return ""
        } catch (error) {
            return error
        }
    }
  }

  const repay = async(assetAddress,value,web3ModalRef) => {
    const signer = await getProviderOrSigner(true, web3ModalRef);
    const provider = await getProviderOrSigner(false,web3ModalRef);
    const poolContract = new Contract(
      PoolABI.EthereumAddress,
      PoolABI.abi,
      signer
    );

    if(BigNumber.isBigNumber(value)){
    if(assetAddress == ETHEREUM_ADDRESS){
        try{
            const tx = await poolContract.repay(assetAddress,value , provider.provider.selectedAddress,{value:value});
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
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
            const decimals = await ERC20Contract.decimals();
            const approve = await ERC20Contract.approve(CoreABI.address, Value);
            await approve.wait();
            // const allowance = await ERC20Contract.allowance(provider.provider.selectedAddress,CoreABI.address);
            // let Value = value.div(BigNumber.from(10).pow(18-decimals))
            // if(allowance.lt(Value)){
            //   const approve = await ERC20Contract.increaseAllowance(CoreABI.address, Value);
            //   await approve.wait();
            // }
            const tx = await poolContract.repay(assetAddress, Value, provider.provider.selectedAddress);
            await tx.wait();
            await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
            return ""
          } catch (error) {
            return error
          }
    }
    }else{
        var Value = (Number(value)*100).toFixed(0)
        if(assetAddress == ETHEREUM_ADDRESS){
            try{
                const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)), provider.provider.selectedAddress,{value:BigNumber.from(Value).mul(BigNumber.from(10).pow(16))});
                await tx.wait();
                await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
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
                const decimals = await ERC20Contract.decimals();
                const approve = await ERC20Contract.approve(CoreABI.address, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)));
                await approve.wait();
                // const allowance = await ERC20Contract.allowance(provider.provider.selectedAddress,CoreABI.address);
                // if(allowance.lt(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)))){
                //   const approve = await ERC20Contract.increaseAllowance(CoreABI.address, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)));
                //   await approve.wait();
                // }
                const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)), provider.provider.selectedAddress);
                await tx.wait();
                await  axios.get('/updateAsset',{params:{address:assetAddress,net:"Ethereum"}})
                return ""
              } catch (error) {
                return error
              }
        }
    }
  }

  module.exports = {
    deposit,redeem,borrow,repay
}