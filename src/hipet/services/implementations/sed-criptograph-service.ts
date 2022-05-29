import { encode, decode } from 'string-encode-decode'
import { CriptographService } from '../interfaces'

export class SEDCriptographService implements CriptographService {
  encrypt (decodedValue: string): string {
    return encode(decodedValue)
  }

  decrypt (encodedValue: string): string {
    return decode(encodedValue)
  }
}
