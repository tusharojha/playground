export type envType = 'testnet' | 'mainnet' | 'localnet' | string

// Testnet configuration for the playground.
// This connects with SoonSocialX testnet.
export const testnet = {
  substrateNodeUrl: 'wss://rco-para.subsocial.network',
  ipfsNodeUrl: 'https://gw.crustfiles.app'
}

// Testnet configuration for the playground.
// This connects with xSocial testnet.
export const xsocial = {
  substrateNodeUrl: 'wss://xsocial.subsocial.network',
  ipfsNodeUrl: 'https://gw.crustfiles.app'
}

// Mainnet configuration for the playground.
// This connects with SubSocial parachain.
// This is the default configuration
export const mainnet = {
  substrateNodeUrl: 'wss://para.f3joule.space',
  ipfsNodeUrl: 'https://ipfs.subsocial.network',
  useServer: {
    httpRequestMethod: 'get'
  }

}
// Localnet configuration for the playground.
// This allows you to connect to a local node.
// You need to run the local nodes of subsocial, ipfs & offchain.
// Links to the repository: 
// Subsocial Node: https://github.com/dappforce/subsocial-node
// Offchain Node: https://github.com/dappforce/subsocial-offchain
// IPFS Node: https://ipfs.io/#install
export const localnet = {
  substrateNodeUrl: 'http://127.0.0.1:9944',
  offchainUrl: 'http://127.0.0.1:3001',
  ipfsNodeUrl: 'http://127.0.0.1:8080'
}

export const networks = {
  mainnet,
  testnet,
  xsocial
}

// Sets the configuration for the playground according to the parameter.
const config = (env: envType) => {
  switch (env.toLowerCase()) {
    case 'testnet':
      return testnet;
    case 'xsocial':
      return xsocial;
    case 'localnet':
      return localnet;
    case 'mainnet':
      return mainnet;
    default:
      return mainnet;
  }
}

export default config
