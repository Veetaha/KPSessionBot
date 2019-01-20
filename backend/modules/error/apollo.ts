import * as Apollo from 'apollo-server-express';
import { ObjectId } from '@modules/interfaces';

export class NotFoundError extends Apollo.ValidationError {
    constructor(errorMessage = 'nothing was found'){
        super(errorMessage);
    }
}

export class IdNotFoundError extends NotFoundError {
    constructor(id: ObjectId, targetName = 'instance') {
        super(`no '${targetName}' was found for id '${id}'`);
    }
}