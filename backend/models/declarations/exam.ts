import * as Mongoose  from 'mongoose';

/**
 * This model represents exam, which student could pass or not
 */
export interface ExamData {
    subject_id: number;
    subject:    string;  // AcademicSubject.name
    date:       Date;    // date, when students may /passExam “this exam”,
    mark:       number;
}

export interface ExamMethods {
    isPassed(this: ExamDoc): boolean | null;
}

export interface ExamDoc extends 
Mongoose.Document, 
ExamData,
ExamMethods 
{}