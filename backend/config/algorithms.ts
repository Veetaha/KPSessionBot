import * as Crypto from 'crypto';
import { PasswordSalt } from '@app/config';

export function encodePassword(password: string) {
    const hash = Crypto.createHmac('sha512', PasswordSalt);
    hash.update(password);
    return hash.digest('hex');
}