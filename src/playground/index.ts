import { newFlatSubsocialApi } from "@subsocial/api";
import config from "./config";
// import { AnySpaceId } from "@subsocial/types";

// Choose the environment you want to run the playground in.
// You can choose between: testnet, mainnet, localnet
const configNet = 'mainnet'

const playground = async (configDetails: any) => {
  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference

  const flatApi = await newFlatSubsocialApi(configDetails)

  // Store your API function result in the response object 
  let response: any

  // Write your code here.
  const spaceId = 1
  const space = await flatApi.findSpace({id: spaceId as any})
  response = space

  // The response object returned will be printed on the screen.
  return response;
}

const runPlayground = async () => {
  const configDetails = config(configNet);
  return await playground(configDetails)
}

export default runPlayground