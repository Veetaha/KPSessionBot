import * as Mongoose  from 'mongoose';
import { WeekScheduleDoc } from '@models/week-schedule';
import { ExamDoc } from '@models/exam';
import { Maybe } from '@modules/interfaces';

/**
 * This model represens group of students with schedule etc
 */
export interface GroupData {
    name_grop:           string; // use as a name of group chat, where bot was added
    group_id:            number; // use as a chat id of group chat
    num_of_participants: number; // ? store a num of all particepents (or make method and fetch all particepents to caluclate (sh*t))
    date_of_created:     Date;   // date of first usage /enroll in this group 
    // term:                number; // current term
    // from KPSessionBotArchitecture  
    exams?:              Maybe<ExamDoc[]>;   
    week_schedule?:      Maybe<WeekScheduleDoc>;
    credits:             string[];      // AcademicSubject.name[],
    credits_start_date:  Date;          // indicates whether students may use /passCredit
    studing_start_date:  Date;          // indicates whether students may do /start, /passCredit, /passExam
    members:             number[];      // Student.tg_id[] // ? just store for each student group.id
}

export interface GroupMethods {
}

export interface GroupDoc extends 
Mongoose.Document, 
GroupData,
GroupMethods 
{}