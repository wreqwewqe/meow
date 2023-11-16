import { providers } from 'ethers';
// import { error } from 'jquery';

const getProviderOrSigner = async (needSigner = false, web3ModalRef) => {
    // const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(window.ethereum);

    const { chainId } = await web3Provider.getNetwork();
    // if (chainId !== 1) {
    //         await window.ethereum.request({
    //           method: 'wallet_switchEthereumChain',
    //           params: [
    //             {
    //               chainId: '0x1', // Replace with the desired chain ID
    //             },
    //           ],
    //         });
    // }

    if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
    }
    return web3Provider;
}

module.exports = {
    getProviderOrSigner
}