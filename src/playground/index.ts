import { getNewIdsFromEvent, SubsocialApi } from "@subsocial/api"
import { Keyring } from "@polkadot/api"
import { IpfsContent } from '@subsocial/api/substrate/wrappers'
import { toast } from "react-toastify"
import { waitReady } from '@polkadot/wasm-crypto'
import { convertToBalanceWithDecimal, balanceWithDecimal, idToBn } from '@subsocial/utils'

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


const logger = (result: any, logToResponseWindow: (t: any) => void) => {

  const { status } = result

  if (!result || !status) {
    return;
  }
  if (status.isFinalized) {
    const blockHash = status.isFinalized
      ? status.asFinalized
      : status.asInBlock;
    logToResponseWindow({ status: `✅ Transaction: ${status.isFinalized ? 'Finalised' : 'Added in Block'}`, blockHash: blockHash.toString() })
    const newIds = getNewIdsFromEvent(result); // get first argument from array.
    if (newIds.length > 0) {
      logToResponseWindow({ status: "Item Added", id: newIds[0].toNumber() })
    }
  } else if (result.isError) {
    console.log(JSON.stringify(result));
    logToResponseWindow({ status: "error", error: result })
  } else {
    logToResponseWindow({ status: status.type })
  }
}

const signAndSendTx = async (tx: any, accountId: string, logToResponseWindow: (t: any) => void) => {
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

      await tx.send((r: any) => { logger(r, logToResponseWindow) })
    }
  })
}

const playground = async (codeSnippet: string, api: SubsocialApi | undefined, logToResponseWindow: (t: any) => void) => {

  await waitReady()
  const keyring = new Keyring({ type: 'sr25519' })
  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference

  try {
    const data = `
  async function runScript() {
    try {
      ${codeSnippet}
    } catch (e) {
      console.log(e)
      showToast(e.message)
    }
  }
  return runScript()
  `
    // Store your API function result in the response object 
    let response: any

    const f = new Function("api", "idToBn", "signAndSendTx",
      "IpfsContent", "keyring", "logger", "ipfs", "showToast",
      "convertToBalanceWithDecimal", "balanceWithDecimal", data)
    response = await f(
      api,
      idToBn,
      (tx: any, accountId: string) => {
        signAndSendTx(tx, accountId, logToResponseWindow)
      },
      IpfsContent,
      keyring,
      (r: any) => {
        logger(r, logToResponseWindow)
      },
      api!.ipfs,
      showToast,
      convertToBalanceWithDecimal,
      balanceWithDecimal
    )
    // The response object returned will be printed on the screen.
    return response;
  } catch (e) {
    console.log(e)
    showToast((e as any).message)
    return {
      status: "Error",
      message: (e as any).toString()
    }
  }
}

const runPlayground = async (codeSnippet: string, api: SubsocialApi | undefined, logToResponseWindow: (t: any) => void) => {
  const response = await playground(codeSnippet, api, logToResponseWindow)
  return response;
}

export default runPlayground