import * as Mongoose  from 'mongoose';
import Paginate       from 'mongoose-paginate';
import * as _         from 'lodash';

import { CrudPlugin } from '@modules/mongoose-plugins/apollo-crud';
import { Schema as ScoreSchema  } from '@models/score';

import { 
    StudentMethods, StudentStatics, StudentModel, StudentDoc
} from        '@models/declarations/student';
export * from '@models/declarations/student';

export const Schema = new Mongoose.Schema({
    tg_name:            { type: String,        required: true  },
    tg_id:              { type: Number,        required: true  },
    group_id:           { type: Number,        required: true  },
    marks:              { type: [ScoreSchema], required: true  },
    last_practice_date: { type: Date,          required: false },
    init_date:          { type: Date,          required: true, default: Date.now },
});

const Statics: StudentStatics = {
};

const Methods: StudentMethods = {
};

Schema.statics = Statics;
Schema.methods = Methods;

// beware that plugins must come after assigning methods and statics to Schema
Schema.plugin(CrudPlugin);
Schema.plugin(Paginate);

export const Student = Mongoose.model<StudentDoc, StudentModel>('Student', Schema);
