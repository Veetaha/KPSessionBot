import * as Apollo from 'apollo-server-express';

/*
    UserNotEnrolledError     = 'UserNotEnrolledError',
    AlreadyEnrolledError     = 'AlreadyEnrolledError',
    AlreadyPracticedError    = 'AlreadyPracticedError',
    WrongTimeForCreditErorr  = 'WrongTimeForCreditErorr',
    WrongTimeForExamError    = 'WrongTimeForExamError',
    EmptyRating              = 'EmptyRating',
*/

export const NoScheduleForSundayError = makeErrorClass(
    'no schedule exists for Sunday'
);
export const NoScheduleIsSetError = makeErrorClass(
    'no schedule is set for this week'
);

export const NotEnoughSubjectsForScheduleError = makeErrorClass(
    'there are not enough subjects ' +
    'registered in the database '    +
    'to make a week schedule'
);



/**
 * Error class factory, creates an error class that instantiates an error
 * with the given message by default.
 * 
 * @param defaultErrorMessage Message that is stored in `Error.message` property
 *                            by default. 
 */
export function makeErrorClass(defaultErrorMessage: string) {
    return class extends Apollo.ValidationError {
        constructor(errorMessage = defaultErrorMessage) {
            super(errorMessage);
        }
    };
}