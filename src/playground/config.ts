export type envType = 'testnet' | 'mainnet' | 'localnet' | string

// Testnet configuration for the playground.
// This connects with SoonSocialX testnet.
const testnet = {
  substrateNodeUrl: 'wss://testnet.subsocial.network',
  offchainUrl: 'https://staging.subsocial.network/offchain',
  ipfsNodeUrl: 'https://staging.subsocial.network/ipfs'
}

// Mainnet configuration for the playground.
// This connects with SubSocial parachain.
// This is the default configuration
const mainnet = {
  substrateNodeUrl: 'wss://para.f3joule.space',
  offchainUrl: 'https://app.subsocial.network/offchain',
  ipfsNodeUrl: 'https://app.subsocial.network/ipfs'
}

// Localnet configuration for the playground.
// This allows you to connect to a local node.
// You need to run the local nodes of subsocial, ipfs & offchain.
// Links to the repository: 
// Subsocial Node: https://github.com/dappforce/subsocial-node
// Offchain Node: https://github.com/dappforce/subsocial-offchain
// IPFS Node: https://ipfs.io/#install
const localnet = {
  substrateNodeUrl: 'http://127.0.0.1:9944',
  offchainUrl: 'http://127.0.0.1:3001',
  ipfsNodeUrl: 'http://127.0.0.1:8080'
}

// Sets the configuration for the playground according to the parameter.
const config = (env: envType) => {
  switch (env) {
    case 'testnet':
      return testnet;
    case 'localnet':
      return localnet;
    case 'mainnet':
      return mainnet;
    default:
      return mainnet;
  }
}

export default config
