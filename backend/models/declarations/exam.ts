import * as Mongoose  from 'mongoose';

/**
 * This model ...
 */
export interface ExamData {
    subject_id: number;
    subject:    string;  // AcademicSubject.name
    date:       Date;    // date, when students may /passExam “this exam”
}

export interface ExamMethods {

}

export interface ExamDoc extends 
Mongoose.Document, 
ExamData,
ExamMethods 
{}