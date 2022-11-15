import { getNewIdsFromEvent, SubsocialApi } from "@subsocial/api"
import { Keyring } from "@polkadot/api"
import config from "./config"
import { IpfsContent } from '@subsocial/api/substrate/wrappers'
import { idToBn } from "@subsocial/utils"
import { toast } from "react-toastify"
import { generateCrustAuthToken } from '@subsocial/api/utils/ipfs'
import { waitReady } from '@polkadot/wasm-crypto'

const showToast = (message: string) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const playground = async (configDetails: any, codeSnippet: string) => {

  await waitReady()
  const keyring = new Keyring({ type: 'sr25519' })

  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference
  let api
  try {
    api = await SubsocialApi.create({
      ...configDetails
    })

    const authHeader = generateCrustAuthToken('bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice')

    api.ipfs.setWriteHeaders({
      authorization: 'Basic ' + authHeader
    })
  } catch (e) {
    console.log(e)
    showToast((e as any).message)
    return {
      status: "Error",
      message: (e as any).toString()
    }
  }

  const logger = (result: any) => {
    const { status } = result

    if (!result || !status) {
      return;
    }
    if (status.isFinalized) {
      const blockHash = status.isFinalized
        ? status.asFinalized
        : status.asInBlock;
      console.log('✅ Tx finalized. Block hash', blockHash.toString());
      showToast(`✅ Transaction: ${status.isFinalized ? 'Finalised' : 'Added in Block'}`);
      const newIds = getNewIdsFromEvent(result); // get first argument from array.
      if (newIds.length > 0) {
        showToast(`⚡️ New Item Id: ${newIds[0]}`)
      }
    } else if (result.isError) {
      console.log(JSON.stringify(result));
      showToast(JSON.stringify(result));
    } else {
      console.log('⏱ Current tx status:', status.type);
      showToast(`⏱ Current tx status: ${status.type}`);
    }
  }

  const signAndSendTx = async (tx: any, accountId: string) => {
    const { isWeb3Injected, web3Enable, web3AccountsSubscribe, web3FromAddress } = await import('@polkadot/extension-dapp')
    const injectedExtensions = await web3Enable('twitter-dapp-subsocial')
    if (!isWeb3Injected) {
      showToast(`Browser do not have any polkadot.js extension`);
      return;
    }

    if (!injectedExtensions.length) {
      showToast(`Polkadot Extension have not authorized us to get accounts`);
      return;
    }

    await web3AccountsSubscribe(async (accounts) => {
      if (accounts.length > 0) {
        const addresses = accounts.map((account) => account.address)

        const containsAddress = addresses.includes(accountId)
        if (!containsAddress) {
          showToast("😬 Address not found on Polkadot.js extension.")
          return;
        }
        const { signer } = await web3FromAddress(accountId)
        await tx.signAsync(accountId, { signer })

        await tx.send(logger)
      }
    })
  }

  const data = `
  async function runScript() {
    try {
      ${codeSnippet}
    } catch (e) {
      console.log(e)
    }
  }
  return runScript()
  `
  // Store your API function result in the response object 
  let response: any

  // Write your code here.
  try {
    const f = new Function("api", "idToBn", "signAndSendTx",
      "IpfsContent", "keyring", "logger", "ipfs", data)
    response = await f(api, idToBn, signAndSendTx, IpfsContent, keyring, logger, api.ipfs)
    console.log('response', response);
  } catch (e) {
    console.log(e)
    showToast((e as any).message)
    return {
      status: "Error",
      message: (e as any).toString()
    }
  }

  // The response object returned will be printed on the screen.
  return response;
}

const runPlayground = async (codeSnippet: string, selectedNetwork: string) => {
  const configDetails = config(selectedNetwork);
  const response = await playground(configDetails, codeSnippet)
  return response;
}

export default runPlayground