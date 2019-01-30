import * as Crypto from 'crypto';
import * as MathJS from 'mathjs';
import { PasswordSalt } from '@app/config';

/**
 * Returns a hash-encoded representation of password to store in the database.
 * @param password Real password to be encoded.
 */
export function encodePassword(password: string) {
    const hash = Crypto.createHmac('sha512', PasswordSalt);
    hash.update(password);
    return hash.digest('hex');
}

/**
 * Generates a random number of subjects that student's whill have per term.
 */
export function randomSubjectsAmountForTerm() {
    return MathJS.randomInt(8, 10);
}