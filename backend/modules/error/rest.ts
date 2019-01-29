import * as HttpCodes from 'http-status-codes';
import * as Vts from 'vee-type-safe';
import { StatusedError } from '@modules/error/statused-error';

export class BadRequestError extends StatusedError {
    constructor(message = 'bad request') {
        super(message, HttpCodes.BAD_REQUEST);
    }
}
export class NotFoundError extends StatusedError {
    constructor(message = 'nothing was found') {
        super(message, HttpCodes.NOT_FOUND);
    }
}
export class UnAuthorizedError extends StatusedError {
    constructor(message = 'authorization needed') {
        super(message, HttpCodes.UNAUTHORIZED);
    }
}
export class ForbiddenError extends StatusedError {
    constructor(message = 'insufficient access level') {
        super(message, HttpCodes.FORBIDDEN);
    }
}
export class InvalidJwtError extends StatusedError {
    constructor(mismatch: Vts.MismatchInfo) {
        super(
            `invalid authentication token (${mismatch.toErrorString()}) `,
            HttpCodes.UNAUTHORIZED
        );
    }
}