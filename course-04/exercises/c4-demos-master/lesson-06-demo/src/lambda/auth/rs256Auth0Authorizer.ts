
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJBFRJSzJeaDNOMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi1lYi1vOGZnbi5ldS5hdXRoMC5jb20wHhcNMjAwNzEyMTU1NTU4WhcN
MzQwMzIxMTU1NTU4WjAkMSIwIAYDVQQDExlkZXYtZWItbzhmZ24uZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtHfjx/bhAPLXQ7fk
6RK18hnpP9i52ObzLe+10r8zy/mZMJW5iVflJine8r8YjJ/YkMDjGhfb9qJsAvrK
OLrcMSVUOc8K+7/LgETzg6I6z1LPyTTDQtqN/YGzUw/CMUpE60V2HpIBtVGcT/qg
9IKCWYiOnZCpWmk3u89A+OvFWxb/66dUwp29IuxyySZSvMxYj+FPqYCKYLV8wMxG
f35dyDRnZ64sjhshvyrawXMTpxRIQnXIIrQ1MVyEGu1YhZLiYVaMci7rbFeqYfHg
O67rfA1CM57117AjJJhww+oizAIPfk01RsTSFcgBKqLB6Jkf7FfJjmDTrIROS8AN
nC0jgQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBStbgRxlwLQ
C2cEkQi0rqfS0RcffTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AE+x/TWFQOCfgIkwSwYwFIRYMv/Db28JwUiat+pDrAzurcreBs0GBuJIKbX1MIkC
lMp0s67gfJJh/VA+MG6hdbjpyYkqvYG2tZP5AG5UGAXh40lRFcj0xj0Tv6MaRDqR
xUr+6EMHsnM5WyPTL7fCKzz+iFvex3eUC5HhPIdd+jIH+mt0yyB6PtUJ3Zxjhr/j
y92PhqXYf1VplNj5jTMk/zuRg3eI8IImrz5crMGH2cttGWy7RRZ9v1dXbjmVJnvW
PJHJ3r0B2GVgi/qJvyykZpkF6vlywmDUz8ph2OuH4XThoxAslVrcpN+KZH/9cGdg
gP0MhVGmn4x34rYsBgSlzQ0=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
