import { NodeCryptographService } from '../../../hipet/services/implementations'
import { CryptographService } from '../../../hipet/services/interfaces'

describe('Criptograph Service', () => {
  const makeSut = (): CryptographService => {
    return new NodeCryptographService()
  }

  const decodedValueMock = 'any_decoded_value'
  const encodedValueMock = 'YW55X2RlY29kZWRfdmFsdWU='

  describe('Encrypt method', () => {
    test('Shoult return an encrypt string', async () => {
      const sut = makeSut()
      const encryptValue = await sut.encrypt(decodedValueMock)

      expect(typeof encryptValue).toBe('string')
      expect(encryptValue).toBe(encodedValueMock)
    })
  })

  describe('Decrypt method', () => {
    test('Shoult return an decrypt string', async () => {
      const sut = makeSut()
      const decryptValue = await sut.decrypt(encodedValueMock)

      expect(typeof decryptValue).toBe('string')
      expect(decryptValue).toBe(decodedValueMock)
    })
  })
})
