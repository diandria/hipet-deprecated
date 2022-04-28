import { Animal } from '../../../hipet/entities'

export const mockAnimal = (): Animal => {
  const animal = new Animal()
  animal.healthStatus = 'VACCINATED'
  animal.color = 'MIXED'
  animal.specie = 'DOG'
  return animal
}
