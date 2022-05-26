import config from "./config";

// Choose the environment you want to run the playground in.
// You can choose between: testnet, mainnet, localnet
const env = 'mainnet'

const playground = (configDetails: any) => {
  // See API docs for more information: https://docs.subsocial.network/js-docs/js-sdk/index.html
  // Tryout from quick reference guide: https://docs.subsocial.network/docs/sdk/quick-reference

  // Store your API function result in the response object 
  let response: any

  // Write your code here.

  // The response object returned will be printed on the screen.
  return response;
}

const runPlayground = () => {
  const configDetails = config(env);
  return playground(configDetails)
}

export default runPlayground