import { VersionContract } from '../../contracts'
import { VersionUseCase } from './version-usecase'

interface SutTypes {
  sut: VersionContract
}

const makeSut = (): SutTypes => {
  const sut = new VersionUseCase()
  return {
    sut
  }
}

describe('Apresentation - Version Use Case', () => {
  test('Should return the correct data about this project', () => {
    const { sut } = makeSut()
    const versionResult = sut.execute()
    expect(versionResult).toEqual({
      status: 'SUCCESS',
      version: '0.0.0',
      description: 'API para o sistema HIPET'
    })
  })
})
