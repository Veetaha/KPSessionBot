import { makeErrorSubclass } from '@modules/error/error-factory';

/*
    UserNotEnrolledError     = 'UserNotEnrolledError',
    AlreadyEnrolledError     = 'AlreadyEnrolledError',
    AlreadyPracticedError    = 'AlreadyPracticedError',
    WrongTimeForCreditErorr  = 'WrongTimeForCreditErorr',
    WrongTimeForExamError    = 'WrongTimeForExamError',
    EmptyRating              = 'EmptyRating',
*/

export const NoScheduleForSundayError = makeErrorSubclass(
    'no schedule exists for Sunday'
);
export const NoScheduleIsSetError = makeErrorSubclass(
    'no schedule is set for this week'
);

export const NotEnoughSubjectsError = makeErrorSubclass(
    'there are not enough subjects ' +
    'registered in the database'
);