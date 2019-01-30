import { IntegerRange } from '@modules/integer-range';

// defines the maximum times subject may appear in a week schedule
export const SubjectTimesPerWeekRange = new IntegerRange(1, 2); 

export const MinViableMark          = 60;
export const HolidaysDuration       = '1 week';
export const StudnigTermDuration    = '6 weeks';
export const CreditTimeDuration     = '1 week';
// time between sequential attempts to pass a credit
export const CreditsRetryTimeout    = '3 days'; 

export const enum SuccessMessages {
    SuccessfulCredit         = 'SuccessfulCredit',
    SuccessfulExam           = 'SuccessfulExam',
    SuccessfulEnrollment     = 'SuccessfulEnrollment',
    SuccessfulTripToArmy     = 'SuccessfulTripToArmy', // response for /goToArmy
}

export const enum NotificationMessages {
    StudentNotPracticed = 'Тупарыла долбойобина'
}

