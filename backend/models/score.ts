import * as Mongoose  from 'mongoose';

export interface ScoreData {
    subject:           string;  // AcademicSubject.name
    practices:         number;
    exam?:             number;
    credit?:           number;
    last_credit_date?: Date;    // date when user attempted to /passCredit last time
}

export const Schema = new Mongoose.Schema({
    subject:            { type: String,        required: true  },
    tg_id:              { type: Number,        required: true  },
    exam:               { type: Number,        required: false },
    credit:             { type: Number,        required: false },
    last_credit_date:   { type: Date,          required: false },
});

const Methods: ScoreMethods = {
};

Schema.methods = Methods;

export interface ScoreMethods {
}

export interface Score extends 
Mongoose.Document, ScoreData, ScoreMethods {}