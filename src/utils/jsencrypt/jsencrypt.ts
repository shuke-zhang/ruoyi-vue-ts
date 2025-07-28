import { JSEncrypt } from 'jsencrypt'

/**
 * 公钥
 */
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs0Z5cUvswSbBJnMtgEDm
F5KMDpwm+YF3/VsT4XmSW2rumakYK2O29i4Ay7btg1brS8gDb/fo9RXKSSxSy8mR
wKVhXqJ9iTxuMCnR0PukgtrbSzzzxArtcpBmW96htUYKFrTKq5mA5NbYBMq7hS43
cXmstspG5gJ6O/Ohsc8aToo8KKRmZhmoTTb+yyQkHj6pDAMsEbV4YWem5yjg33t1
dZFZH1tm4fVTT660gIDchfnvtNhsFfBW6WlfCR/Q2Hfp2RmmOMj6YUkzwSnjgaY/
uuei4k4zBEsVFx4Ov6z4aaiPgwOcZa9E4HNvdT//dCAPqRor4xjyNtQkEzwHADOk
rwIDAQAB
-----END PUBLIC KEY-----`
/**
 * 私钥
 */
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzRnlxS+zBJsEm
cy2AQOYXkowOnCb5gXf9WxPheZJbau6ZqRgrY7b2LgDLtu2DVutLyANv9+j1FcpJ
LFLLyZHApWFeon2JPG4wKdHQ+6SC2ttLPPPECu1ykGZb3qG1RgoWtMqrmYDk1tgE
yruFLjdxeay2ykbmAno786GxzxpOijwopGZmGahNNv7LJCQePqkMAywRtXhhZ6bn
KODfe3V1kVkfW2bh9VNPrrSAgNyF+e+02GwV8FbpaV8JH9DYd+nZGaY4yPphSTPB
KeOBpj+656LiTjMESxUXHg6/rPhpqI+DA5xlr0Tgc291P/90IA+pGivjGPI21CQT
PAcAM6SvAgMBAAECggEBAKpEcOsuFTqNuDzwf3KkMOSKhwMJQ+sNEA1NB2DKujqh
IORIOXBcUFUX9CGHJ6XqU6ex27HoXxUHEQzWT/zFAO1bJVNgOKKzBmQwE9rMZb7y
Zfzbcxnq1wJMKytuE1+7mbFfHG5GaKjvdFN4yQkAkB/yVBt3mkaya62tAxGBhZa5
FNHp7sveXq5nDfEIkHtWFAi4ajBT9RHpj6L9ZS/QFLzvA5cNB+9dcCKbCnCwdw4l
7v8fZsy9swBICDlyxgpd3j3hO32KuYNuywsSWlp8TIRC8CzSFQngrgRPrr9JS1Vo
ZphTN5SHZL8/pRKm4TfcOPkUNx+h6Z9PGizGfZ+ZtqECgYEA2gV/H3mUunm/NNfq
/bPQZCtPqMATrUB43aXbJUHno9pu69M4Avpe//oeSwBExXfrR4J0djxYNByERYYF
nWYerIpeFEgNUvr/j5IfKhS2/4JKvW+fTiiY05HRocEp6hEuy1jStnobxWbUs+o8
VAk/pRW3mybosBFAxX7XDS6v0HMCgYEA0oEe/VzDIz2SfPDYDDm9lXHy2vPNCdVo
+w0ZYkNaUaSYVPUTMJdU6rg+LwzdnF2+YtEnJeubQ0RrD6sIsuQPmb+5FI2OEi03
b5jzPglkjafPXgmhvd5at/M8dJDpotdVV8e0n+/kAXrA6tCamFsC9faEJE3+LNqJ
tNW0JYEzt9UCgYEA1mU3WH1YC3Rz2gRGeswbrpWE1V5lOyc+dECIW4AOyWuhTli8
KPmK+FA+/+Q4vLMrdHvOCQNYfY5ZaIDd/qWQnn3G/EzKhYJ8U/QOn3QVbPf0hYtB
7jsv5kXsDxQEIsBY8vDa7UTxEFMJ8g7y2nTp2G6dyn4drh6ZQl10Hut9Sw8CgYEA
tVVDY8/vzUCyGuzBv65RsRYKtTBFlU4AdBsxnaMVf7UBAFZpZHdIUDXMY216zcM3
SRqQ1aqjAgxDCak1Ah1RjwlIHvtdwiyvT3P7PZqLwzcmfARiDxQnI8TldCiNCpji
TI6c+xWEXP3oh56RPeNQpp7n7/o7lVngPCXHXHNzIM0CgYAaArC5jjF5vP+dNWVq
Ed52opPkp7lCCKT8kPkZrlkeFVchOFP3fZ0+Wxi0F/aLJoQ/DGohLfO9Jiis7dMB
/bnTpgm+j9OZNCWtdKai7gZ55n1s5UlljgWwkjRWgCvv3WnjF/sa3JEpEQM92q4R
PDcIQ24KbrZgGXBYP/xZwiUqaA==
-----END PRIVATE KEY-----
`

/**
 * 加密数据
 */
export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  const result = encryptor.encrypt(txt) // 对数据进行加密
  if (result === false) {
    throw new Error('解密失败')
  }
  return result
}

/**
 * 解密数据
 */
export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  const result = encryptor.decrypt(txt)
  if (result === false) {
    throw new Error('解密失败')
  }
  return result
}
