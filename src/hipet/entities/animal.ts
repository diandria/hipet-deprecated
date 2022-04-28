type HealthStatusOptions = 'VACCINATED' | 'BRUISED'
type SpeciesOptions = 'DOG' | 'CAT'
type ColorOptions = 'BLACK' | 'WHITE' | 'MIXED'

export class Animal {
  specie: SpeciesOptions
  color: ColorOptions
  healthStatus: HealthStatusOptions
}
