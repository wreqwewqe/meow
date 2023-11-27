import { BigNumber, Contract, providers, constants } from 'ethers';
// import Web3Modal from "web3modal";
import { useState, useEffect, useRef } from 'react';
import { PoolABI } from "../ABIs/LendingPool";
import { DataProviderABI } from "../ABIs/LendingPoolDataProvider";
import { getProviderOrSigner } from './ProviderOrSigner';
import { ATokenABI } from "../ABIs/AToken";
import { ERC20ABI } from '../ABIs/ERC20';
import { ETHEREUM_ADDRESS } from "../utils/constants"
import { CoreABI } from '../ABIs/LendingPoolCore';
import axios from 'axios';
import { BaseURI } from './constants';
import { total } from './getPrice'
axios.defaults.baseURL = BaseURI;




const deposit = async (assetAddress, Value, web3ModalRef, setApproveStatu, setSupplyStatu, setDoneStatu) => {
  const signer = await getProviderOrSigner(true, web3ModalRef);
  const provider = await getProviderOrSigner(false, web3ModalRef);
  const poolContract = new Contract(
    PoolABI.EthereumAddress,
    PoolABI.abi,
    signer
  );
  var value = (Number(Value) * 100).toFixed(0)
  if (assetAddress == ETHEREUM_ADDRESS) {
    try {
      setApproveStatu("finish")
      setSupplyStatu("process")
      const tx = await poolContract.deposit(ETHEREUM_ADDRESS, BigNumber.from(value).mul(BigNumber.from(10).pow(16)), "0", { value: BigNumber.from(value).mul(BigNumber.from(10).pow(16)) });
      await tx.wait();
      setSupplyStatu("finish")
      setDoneStatu("finish")

      await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
      return ""
    } catch (error) {
      return error
    }
  } else {
    const ERC20Contract = new Contract(
      assetAddress,
      ERC20ABI.abi,
      signer
    )

    try {
      setApproveStatu("process")
      const decimals = await ERC20Contract.decimals();
      const approve = await ERC20Contract.approve(CoreABI.EthereumAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals - 2)));
      await approve.wait();
      setApproveStatu("finish")
      setSupplyStatu("process")
      // const allowance = await ERC20Contract.allowance(provider.address,CoreABI.address)
      // if(allowance.lt(BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)))){
      //     const approve = await ERC20Contract.increaseAllowance(CoreABI.address, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals-2)));
      //     await approve.wait();
      // }
      const tx = await poolContract.deposit(assetAddress, BigNumber.from(value).mul(BigNumber.from(10).pow(decimals - 2)), "0");
      await tx.wait();
      setSupplyStatu("finish")
      setDoneStatu("finish")
      await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
      return ""
    } catch (error) {
      return error
    }
  }
}

const redeem = async (assetAddress, aTokenAddress, web3ModalRef, value) => {
  const signer = await getProviderOrSigner(true, web3ModalRef);
  // const provider = await getProviderOrSigner(false,web3ModalRef);
  const ERC20Contract = new Contract(
    aTokenAddress,
    ATokenABI.abi,
    signer
  )
  if (BigNumber.isBigNumber(value)) {
    try {
      const tx = await ERC20Contract.redeem(value)
      await tx.wait()
      return ""
    } catch (error) {
      return error
    }
  } else {
    var Value = (Number(value) * 100).toFixed(0)
    try {
      const decimals = await ERC20Contract.decimals();
      const tx = await ERC20Contract.redeem(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals - 2)))
      await tx.wait()
      await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
      return ""
    } catch (error) {
      return error
    }
  }

}

const borrow = async (assetAddress, value, web3ModalRef, rateMode) => {
  const signer = await getProviderOrSigner(true, web3ModalRef);
  const poolContract = new Contract(
    PoolABI.EthereumAddress,
    PoolABI.abi,
    signer
  );

  var Value = (Number(value) * 100).toFixed(0)
  if (assetAddress == ETHEREUM_ADDRESS) {
    try {
      const tx = await poolContract.borrow(ETHEREUM_ADDRESS, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)), rateMode, 0);
      await tx.wait();
      await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
      return ""
    } catch (error) {
      return error
    }
  } else {
    const ERC20Contract = new Contract(
      assetAddress,
      ERC20ABI.abi,
      signer
    )

    try {
      const decimals = await ERC20Contract.decimals();
      const tx = await poolContract.borrow(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals - 2)), rateMode, 0);
      await tx.wait();
      await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
      return ""
    } catch (error) {
      return error
    }
  }
}

const repay = async (assetAddress, value, web3ModalRef) => {
  const signer = await getProviderOrSigner(true, web3ModalRef);
  const provider = await getProviderOrSigner(false, web3ModalRef);
  const poolContract = new Contract(
    PoolABI.EthereumAddress,
    PoolABI.abi,
    signer
  );

  if (BigNumber.isBigNumber(value)) {
    if (assetAddress == ETHEREUM_ADDRESS) {
      try {
        const tx = await poolContract.repay(assetAddress, value, provider.address, { value: value });
        await tx.wait();
        await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
        return ""
      } catch (error) {
        return error
      }
    } else {
      const ERC20Contract = new Contract(
        assetAddress,
        ERC20ABI.abi,
        signer
      )
      try {
        const decimals = await ERC20Contract.decimals();
        const approve = await ERC20Contract.approve(CoreABI.EthereumAddress, Value);
        await approve.wait();
        // const allowance = await ERC20Contract.allowance(provider.address,CoreABI.address);
        // let Value = value.div(BigNumber.from(10).pow(18-decimals))
        // if(allowance.lt(Value)){
        //   const approve = await ERC20Contract.increaseAllowance(CoreABI.address, Value);
        //   await approve.wait();
        // }
        const tx = await poolContract.repay(assetAddress, Value, provider.address);
        await tx.wait();
        await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
        return ""
      } catch (error) {
        return error
      }
    }
  } else {
    var Value = (Number(value) * 100).toFixed(0)
    if (assetAddress == ETHEREUM_ADDRESS) {
      try {
        const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(16)), provider.address, { value: BigNumber.from(Value).mul(BigNumber.from(10).pow(16)) });
        await tx.wait();
        await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
        return ""
      } catch (error) {
        return error
      }
    } else {
      const ERC20Contract = new Contract(
        assetAddress,
        ERC20ABI.abi,
        signer
      )
      try {
        const decimals = await ERC20Contract.decimals();
        const approve = await ERC20Contract.approve(CoreABI.EthereumAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals - 2)));
        await approve.wait();
        // const allowance = await ERC20Contract.allowance(provider.address,CoreABI.address);
        // if(allowance.lt(BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)))){
        //   const approve = await ERC20Contract.increaseAllowance(CoreABI.address, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals-2)));
        //   await approve.wait();
        // }
        const tx = await poolContract.repay(assetAddress, BigNumber.from(Value).mul(BigNumber.from(10).pow(decimals - 2)), provider.address);
        await tx.wait();
        await axios.get('/updateAsset', { params: { address: assetAddress, net: "Ethereum" } })
        return ""
      } catch (error) {
        return error
      }
    }
  }
}


const onChangeToScroll = (ethereum, setLoading) => {
  setLoading(true)
  ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: "0x82750",
        chainName: 'Scroll',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'EHT', // 2-6 characters long
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
const userMessage = async (web3ModalRef, address, chain) => {
  const provider = await getProviderOrSigner(false, web3ModalRef);
  const PoolContract = new Contract(
    chain.id == 5 ? PoolABI.EthereumAddress : PoolABI.ScrollAddress,
    PoolABI.abi,
    provider
  );
  console.log("????????????????????????????????????????????????????????")
  console.log("?", chain.id == 5 ? PoolABI.EthereumAddress : PoolABI.ScrollAddress)
  console.log("? add ", address);
  const userData = await PoolContract.getUserAccountData(address);
  console.log("????????????????????????????????????????????????????????1")
  const healthFactor = total((userData.healthFactor).div(BigNumber.from(10).pow(16)));
  await axios.post('/user', {
    "address": address,
    "healthFactor": healthFactor,
    "ltv": userData.ltv.toString(),
    "totalliquidity": userData.totalLiquidityETH.toString(),
    "totalcollateral": userData.totalCollateralETH.toString(),
    "availableborrow": userData.availableBorrowsETH.toString(),
    "totalborrow": userData.totalBorrowsETH.toString(),
    "totalfee": userData.totalFeesETH.toString(),
    "net": chain.id == 5 ? "Ethereum" : "Scroll"
  })
}
module.exports = {
  deposit, redeem, borrow, repay, onChangeToScroll, userMessage
}