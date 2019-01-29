import * as Mongoose  from 'mongoose';
import { Maybe } from '@modules/interfaces';

/**
 * This model is meant to be a subdocument.
 * It represents a student rating, contains information about his activites
 * and total marks for these academic activites.
 */
export interface ScoreData {
    subject:           string;  // AcademicSubject.name
    practices:         number;
    exam?:             Maybe<number>;
    credit?:           Maybe<number>;
    last_credit_date?: Maybe<Date>; // date when user attempted to /passCredit last time
}

export interface ScoreMethods {
}

export interface ScoreDoc extends 
Mongoose.Document, 
ScoreData, 
ScoreMethods 
{}