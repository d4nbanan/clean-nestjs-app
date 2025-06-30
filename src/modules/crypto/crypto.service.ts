import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { ICryptoService } from './crypto-service.interface';
import { randomUUID as randomCryptoUUID } from 'node:crypto';

@Injectable()
export class CryptoService implements ICryptoService {
  private readonly SALT_LENGTH = 32;
  private readonly KEY_LENGTH = 64;

  private readonly HASH_PARAMS = {
    N: 32768,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  };
  private readonly HASH_PREFIX = '$scrypt$N=32768,r=8,p=1,maxmem=67108864$';
  private readonly HASH_PARTS = 5;

  private serializeHash(hash: Buffer, salt: Buffer) {
    const hashString = hash.toString('base64').split('=')[0];
    const saltString = salt.toString('base64').split('=')[0];

    return `${this.HASH_PREFIX}${saltString}$${hashString}`;
  }

  private parseHashOptions(options: string) {
    const values: [string, number][] = [];
    const items = options.split(',');

    for (const item of items) {
      const [key, val] = item.split('=');

      values.push([key, Number(val)]);
    }

    return Object.fromEntries(values);
  }

  private deserializeHash(serialized: string) {
    const parts = serialized.split('$');
    if (parts.length !== this.HASH_PARTS) {
      throw new Error('Invalid format; Expected $name$options$salt$hash');
    }

    const [, name, options, salt64, hash64] = parts;
    if (name !== 'scrypt') {
      throw new Error('Only supports scrypt');
    }

    const params = this.parseHashOptions(options);

    const [hash, salt] = [
      Buffer.from(hash64, 'base64'),
      Buffer.from(salt64, 'base64'),
    ];

    return { params, salt, hash };
  }

  public async hash(password: string): Promise<string> {
    const normalizedPassword = password.normalize();

    return new Promise((resolve, reject) => {
      const salt = randomBytes(this.SALT_LENGTH);

      scrypt(
        normalizedPassword,
        salt,
        this.KEY_LENGTH,
        this.HASH_PARAMS,
        (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.serializeHash(hash, salt));
          }
        },
      );
    });
  }

  public async validate(
    input: string,
    serializedPasswordHash: string,
  ): Promise<boolean> {
    const { params, salt, hash } = this.deserializeHash(serializedPasswordHash);
    const normalizedInput = input.normalize();

    return new Promise((resolve, reject) => {
      scrypt(
        normalizedInput,
        salt,
        hash.length,
        params,
        (err, hashedPassword) => {
          if (err) {
            reject(err);
          } else {
            resolve(timingSafeEqual(hashedPassword, hash));
          }
        },
      );
    });
  }

  public randomUUID(): string {
    return randomCryptoUUID();
  }
}
