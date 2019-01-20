import Md5 from 'md5';
import { PasswordSalt } from '@app/config';

export function encodePassword(password: string) {
    return Md5(`${password}${PasswordSalt}`);
}