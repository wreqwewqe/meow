import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createConfig, sepolia, WagmiConfig, Chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'
import {

  goerli,
  mainnet,

} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'
import { GlobalContextProvider } from '../GlobalContext';
export const avalanche = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
}

const scroll = {
  id: 534352,
  name: 'Scroll',
  network: 'scroll',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.scroll.io/'] },
    default: { http: ['https://scroll.blockpi.network/v1/rpc/public'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://scrollscan.com/' },
    etherscan: { name: 'SnowTrace', url: 'https://scrollscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    avalanche,
    scroll,
    goerli,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [alchemyProvider({ apiKey: "jdW0grMF_4PlT-jVioNYaeDnLPYeWG_W" }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'ob',
  projectId: 'ea55b96e1fd90837f19b3dba416b5c97',
  chains,
});
// const connector = new WalletConnectConnector({
//   chains: [mainnet, optimism, polygon],
//   options: {
//     projectId: "ea55b96e1fd90837f19b3dba416b5c97",
//     metadata: {
//       name: 'wagmi',
//       description: 'my wagmi app',
//       url: 'https://wagmi.sh',
//       icons: ['https://wagmi.sh/icon.png'],
//     },
//   },
// })


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});



function MyApp({ Component, pageProps }) {

  return (
    <GlobalContextProvider>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
      <WagmiConfig config={wagmiConfig} >
        <RainbowKitProvider chains={chains} modalSize='compact' locale='en' >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </GlobalContextProvider>
  );
}

export default MyApp;
