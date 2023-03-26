import { Uuid } from '../types'

export type ReasonOptions = 'PUBLICACAO_SUSPEITA' | 'VENDA_DE_ANIMAL' | 'MAUS_TRATOS' | 'SPAM' | 'OUTRO'

export class Report {
  id: Uuid
  post_id: Uuid
  reason: ReasonOptions
  description?: string
  created_at: Date
}
