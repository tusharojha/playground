import { newFlatSubsocialApi } from "@subsocial/api";
import config from "./config";
// import { AnySpaceId } from "@subsocial/types";

// Choose the environment you want to run the playground in.
// You can choose between: testnet, mainnet, localnet
const configNet = 'testnet'

var flatApi

const playground = async (configDetails: any, codeSnippet: string) => {
  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference
  flatApi = await newFlatSubsocialApi({
    ...configDetails,
    useServer: {
      httpRequestMethod: 'get'
    }
  })
  const data = `
  async function runScript() {
    ${codeSnippet}
  }
  return runScript()
  `

  // Store your API function result in the response object 
  let response: any

  // Write your code here.
  const f = new Function("flatApi", data)
  response = await f(flatApi)
  console.log('respnose', response);

  // The response object returned will be printed on the screen.
  return response;
}

const runPlayground = async (codeSnippet: string) => {
  const configDetails = config(configNet);
  return await playground(configDetails, codeSnippet)
}

export default runPlayground