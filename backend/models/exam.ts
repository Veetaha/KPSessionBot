import * as Mongoose  from 'mongoose';
import {
    ExamMethods
} from        '@models/declarations/exam';
export * from '@models/declarations/exam';

export const Schema = new Mongoose.Schema({
    subject_id: { type: Number, required: true },
    subject:    { type: String, required: true },
    date:       { type: Date,   required: true },
});

const Methods: ExamMethods = {
};

Schema.methods = Methods;