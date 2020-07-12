const apiId = '5sjtoelkz4' // My serverless app
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-2.amazonaws.com/dev`

export const authConfig = {
  domain: 'test-endpoint.auth0.com',
  clientId: 'SENzCCFNi515FY7zbr7AajB57rLePUVV', // My autho0 app
  callbackUrl: 'http://localhost:3000/callback'
}
