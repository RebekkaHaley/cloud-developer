const apiId = '5sjtoelkz4' // My serverless app
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-2.amazonaws.com/dev` // NB: must be eu

export const authConfig = {
  domain: 'dev-eb-o8fgn.eu.auth0.com', // My autho0 app domain
  clientId: 'SENzCCFNi515FY7zbr7AajB57rLePUVV', // My autho0 app
  callbackUrl: 'http://localhost:3000/callback'
}
