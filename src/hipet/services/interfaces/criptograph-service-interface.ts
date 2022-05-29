export interface CriptographService {
  encrypt (decodedValue: string): string
  decrypt (encodedValue: string): string
}
