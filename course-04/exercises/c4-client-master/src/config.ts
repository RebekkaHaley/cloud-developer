const apiId = '5sjtoelkz4' // My serverless app
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-2.amazonaws.com/dev` // NB: must be eu

export const authConfig = {
  domain: 'dev-eb-o8fgn.eu.auth0.com', // My autho0 app domain
  clientId: 'b7O7XqcbYQSMdjOurmJ60OWPo74oZjT2', // My autho0 app
  callbackUrl: 'http://localhost:3000/callback'
}
