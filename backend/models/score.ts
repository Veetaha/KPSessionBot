import * as Mongoose  from 'mongoose';
import {
    ScoreMethods
} from        '@models/declarations/score';
export * from '@models/declarations/score';

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
