type AnimalTypeOptions = 'CACHORRO' | 'GATO'
type ColorOptions = 'MANCHADO' | 'PRETO' | 'BRANCO' | 'CINZA' | 'CARAMELO' | 'PINTADO' | 'OUTRO'
type SizeOptions = 'PEQUENO' | 'MEDIO' | 'GRANDE'

type HealthInfo = {
  vaccinated: boolean
  castreated: boolean
  special_care: boolean
}

export class Animal {
  name: String
  age?: number
  color: ColorOptions
  size: SizeOptions
  health_info: HealthInfo
  type: AnimalTypeOptions
}
