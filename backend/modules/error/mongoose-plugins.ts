import * as Apollo from 'apollo-server-express';
import { ObjectId } from '@modules/interfaces';


export class NotEnoughDocumentsError extends Error {
    constructor(
        public readonly expectedAmount: number, 
        public readonly actualAmount:   number,
        collectionName: string
    ) {
        super(
            `Expected to have '${expectedAmount}' documents in '${
            collectionName}' collection, but got '${actualAmount}'`
        );
    }
}


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
