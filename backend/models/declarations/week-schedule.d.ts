import * as Mongoose from 'mongoose';
import { Maybe } from '@modules/interfaces';

/**
 * This model is meant to be a subdocument.
 * Represents a schedule of academic subject for a week (6 days).
 */
export interface WeekScheduleData {
    /**
     * `subjects[0]` is an array of subjects for Monday,
     * `subjects[5]` - for Saturday, there is no `subjects[6]` (Sunday) schedule
     * 
     * AcademicSubjectDoc.name[][], may be empty
     */
    subjects?: Maybe<string[][]>; 
}

export interface WeekScheduleMethods {
    /**
     * Returns an AcademicSubjectDoc.name[], that denotes the list of today's 
     * subjets in schedule.
     * @throws NoScheduleForTodayError if today is Sunday, or schedule is empty (null).
     */
    todaySubjects(this: WeekScheduleDoc): string[];
    /**
     * Sets `subjects` to be a random matrix of AcademicSubjectDoc.name.
     * Generates at max Const.MaxSubjectTimesPerWeek entries of subject per week.
     * Does not corrupt state in case of an error. Does not write any changes to
     * the database. As it is a subdocument, it will be saved **only** with its
     * parent document.
     * 
     * @throws NotEnoughSubjectsForScheduleError 
     *      if there are not enough subjects,
     *      registered in the database to make a schedule.
     * @throws ApolloError
     *      if a database read/write error occurs.
     */
    setRandomSchedule(this: WeekScheduleDoc): Promise<void>;

    // -------------------------------------------------------------------------
    /*
     * Private functions.
     */

    /**
     * Core implementation of setRandomSchedule, error checks are supposed to be
     * already done when invoking it.
     * @param subjects Array of projected AcademicSubjects retrieved from the db.
     */
    _setRandomSchedule(
        this:     WeekScheduleDoc,
        subjects: { name: string }[]
    ): Promise<void>;
    /**
     * Returns a number[] of `subjectsAmount` length and its sum in an object.
     * This array defines the number of times each subject appears in the schedule.
     * 
     * @param subjectsAmount Length of times array to generate.
     * 
     * @remarks
     * E.g. if subjects: ['Math', 'English', 'Programming'],
     * then `subjectsAmount` === subjects.length === 3,
     * and this function returns
     * {
     *     timesSum: 5,
     *     timesPerWeek: [1, 2, 2]
     * }
     * timesPerWeek numbers are genrated randomly according to some restrictions.
     * Returned data means, that 'Math' appears 1 time in a week schedule and
     * 'English' and 'Propgramming' appear 2 times in the schedule.
     */
    _randomTimesPerWeek(
        this: WeekScheduleDoc,
        subjectsAmount: number
    ): { timesSum: number, timesPerWeek: number[]};
}

export interface WeekScheduleDoc extends 
Mongoose.Document, 
WeekScheduleData, 
WeekScheduleMethods 
{}