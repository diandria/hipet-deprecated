import { CriptographService } from '../interfaces'

export class NodeCriptographService implements CriptographService {
  encrypt (decodedValue: string): string {
    return Buffer.from(decodedValue, 'binary').toString('base64')
  }

  decrypt (encodedValue: string): string {
    return Buffer.from(encodedValue, 'base64').toString('binary')
  }
}
