const Web3 = {
  monitorWellet: (addressfun) => {
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length == 0) {
        return;
      }
      addressfun()
      window.location.reload()
    });
  },

  monitorChain: (fn) => {
    window.ethereum.on("chainChanged", (res) => {
      if (res != '0x1') {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x1', // Replace with the desired chain ID
            },
          ],
        });
      }
    });
  },
  disconnect: (setWallet) => {
    window.ethereum.on('disconnect', function () {
      setWallet(true)
    })
  }
}
export default Web3