export const CryptoServiceToken = Symbol('CryptoServiceToken');

export interface ICryptoService {
  hash(password: string): Promise<string>;
  validate(input: string, serializedPasswordHash: string): Promise<boolean>;
}
