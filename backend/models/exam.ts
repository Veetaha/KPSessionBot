import * as Mongoose  from 'mongoose';
import {
    ExamMethods
} from        '@models/declarations/exam';
export * from '@models/declarations/exam';

export const Schema = new Mongoose.Schema({
    subject_id: { type: Number, required: true },
    subject:    { type: String, required: true },
    date:       { type: Date,   required: true },
    mark:       { type: Number, default:  0    },
});

const Methods: ExamMethods = {
    isPassed() {
        if (new Date() > this.date) return null;
        return this.mark >= 60;
    }
};

Schema.methods = Methods;