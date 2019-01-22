export const MaxSubjectTimesPerWeek = 2; // defines the maximum times subject may appear in a week schedule
export const MinViableMark          = 60;
export const HolidaysDuration       = '1 week';
export const StudnigTermDuration    = '6 weeks';
export const CreditTimeDuration     = '1 week';
export const CreditsRetryTimeout    = '3 days'; // time between sequential attempts to pass a credit

export namespace ResponseMessages {
    export const PracticeAtWeekendsError = 'PracticeAtWeekendsError';
    export const BackendFaultError       = 'Oops, something went wrong.  ${error_stack_trace}';
    export const UserNotEnrolledError    = 'UserNotEnrolledError';
    export const SuccessfulEnrollment    = 'SuccessfulEnrollment';
    export const AlreadyEnrolledError    = 'AlreadyEnrolledError';
    export const AlreadyPracticedError   = 'AlreadyPracticedError';
    export const SuccessfulCredit        = 'SuccessfulCredit';
    export const WrongTimeForCreditErorr = 'WrongTimeForCreditErorr';
    export const SuccessfulExam          = 'SuccessfulExam';
    export const WrongTimeForExamError   = 'WrongTimeForExamError';
    export const SuccessfulTripToArmy    = 'SuccessfulTripToArmy'; // response for /goToArmy
    export const EmptyRating             = 'EmptyRating';
}

export namespace NotificationMessages {
    export const StudentNotPracticed = 'Тупарыла долбойобина';
}

