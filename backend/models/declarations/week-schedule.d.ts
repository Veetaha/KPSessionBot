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
}

export interface WeekScheduleDoc extends 
Mongoose.Document, 
WeekScheduleData, 
WeekScheduleMethods 
{}