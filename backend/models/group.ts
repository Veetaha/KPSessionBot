import { ObjectId } from '@modules/interfaces';
import * as Mongoose  from 'mongoose';
import {
    GroupMethods
} from        '@models/declarations/group';
export * from '@models/declarations/group';

export const Schema = new Mongoose.Schema({
    name_grop:           { type: String,   required: true },
    group_id:            { type: Number,   required: true },
    num_of_participants: { type: Number,   required: true },
    date_of_created:     { type: Date,     required: true },
    term:                { type: Number,   required: true },
    exams:               { type: ObjectId, required: true },
    week_schedule:       { type: ObjectId, required: true },
    credits:             { type: [String], required: true },
    credits_start_date:  { type: Date,     required: true },
    studing_start_date:  { type: Date,     required: true },
    members:             { type: [Number], required: true }
});

const Methods: GroupMethods = {
};

Schema.methods = Methods;