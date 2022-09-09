import { SubsocialApi } from "@subsocial/api"
import config from "./config"
import { idToBn } from "@subsocial/utils"

// Choose the environment you want to run the playground in.
// You can choose between: testnet, mainnet, localnet
const configNet = 'mainnet'

var flatApi

const playground = async (configDetails: any, codeSnippet: string) => {
  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference
  flatApi = await SubsocialApi.create({
    ...configDetails,
    useServer: {
      httpRequestMethod: 'get'
    }
  })

  const signAndSendTx = async (tx: any) => {
    const { isWeb3Injected, web3Enable, web3AccountsSubscribe, web3FromAddress } = await import('@polkadot/extension-dapp')
    const injectedExtensions = await web3Enable('twitter-dapp-subsocial')
    if (!isWeb3Injected) {
      alert('Browser do not have any polkadot extension')
      return;
    }

    if (!injectedExtensions.length) {
      alert('Polkadot Extension have not authorized us to get accounts');
      return;
    }

    await web3AccountsSubscribe(async (accounts) => {
      if (accounts.length > 0) {
        const addresses = accounts.map((account) => account.address)

        const { signer } = await web3FromAddress(addresses[0])
        await tx.signAsync(addresses[0], { signer })

        await tx.send((result: any) => {
          const { status } = result

          if (!result || !status) {
            return;
          }
          if (status.isFinalized || status.isInBlock) {
            const blockHash = status.isFinalized
              ? status.asFinalized
              : status.asInBlock;
            console.log('✅ Tx finalized. Block hash', blockHash.toString());
          } else if (result.isError) {
            console.log(JSON.stringify(result));
          } else {
            console.log('⏱ Current tx status:', status.type);
          }
        })
      }
    })
  }

  const data = `
  async function runScript() {
    ${codeSnippet}
  }
  return runScript()
  `
  // Store your API function result in the response object 
  let response: any

  // Write your code here.
  const f = new Function("flatApi", "idToBn", "signAndSendTx", data)
  try {
    response = await f(flatApi, idToBn, signAndSendTx)
    console.log('response', response);
  } catch (e) {
    console.log(e)
    return {}
  }

  // The response object returned will be printed on the screen.
  return response;
}

const runPlayground = async (codeSnippet: string) => {
  const configDetails = config(configNet);
  return await playground(configDetails, codeSnippet)
}

export default runPlayground