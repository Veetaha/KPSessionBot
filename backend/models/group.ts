import { ObjectId } from '@modules/interfaces';
import * as Mongoose  from 'mongoose';
import {
    GroupMethods
} from        '@models/declarations/group';
export * from '@models/declarations/group';

export const Schema = new Mongoose.Schema({
    name_grop:           { type: String,   required: true    },
    group_id:            { type: Number,   required: true    },
    num_of_participants: { type: Number,   default: 0        },
    date_of_created:     { type: Date,     default: Date.now },
    // term:                { type: Number,   required: true },
    exams:               { type: ObjectId, required: false   },
    week_schedule:       { type: ObjectId, required: false   },
    credits:             { type: [String], default: []       },
    credits_start_date:  { type: Date,     default: Date.now },
    studing_start_date:  { type: Date,     default: Date.now },
    members:             { type: [Number], default: []       }
});

const Methods: GroupMethods = {
};

Schema.methods = Methods;