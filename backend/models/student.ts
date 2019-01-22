import * as Mongoose  from 'mongoose';
import Paginate       from 'mongoose-paginate';
import * as _         from 'lodash';

import { CrudPlugin, CrudPluginStatics } from '@modules/mongoose-plugins/apollo-crud';
import { Score, Schema as ScoreSchema  } from '@models/score';

export interface StudentData {
    tg_name:   string;   // telegram nickname (@user) (for frontend)
    tg_id:     number;   // telegram user id
    group_id:  number;   // Group.chat_id

    marks: Mongoose.Types.Array<Score>;
                                  // array of marks and
                                  // subjects composed into Score objects
                                  
    last_practice_date?: Date;     // date when student used /start command last time
    init_date:           Date;     // date when this student was registered (for frontend) 
}

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

// beware that plugins must come after assignin methods and statics to Schema
Schema.plugin(CrudPlugin);
Schema.plugin(Paginate);

export const Student = Mongoose.model<Student, StudentModel>('Student', Schema);

export interface StudentMethods {

}

export interface Student extends 
Mongoose.Document, StudentData, StudentMethods {}

export interface StudentStatics {
    
}

export interface StudentModel extends 
Mongoose.PaginateModel<Student>, StudentStatics, CrudPluginStatics<Student> {

}