import { Uuid } from '../../schemata/types'
import { ReasonOptions } from '../../schemata/entities'

export class ReportDTO {
  _id: Uuid // chave unica
  post_id: Uuid
  reason: ReasonOptions
  description?: string
  created_at: Date
}
