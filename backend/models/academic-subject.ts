import * as Mongoose  from 'mongoose';
import Paginate       from 'mongoose-paginate';
import * as _         from 'lodash';
import * as Utils     from '@modules/utils';
import { CrudPlugin } from '@modules/mongoose-plugins/apollo-crud';
import { assert     } from '@modules/debug';

import { Schema as AcademicActivitySchema } from '@models/academic-activity';
import { 
    AcademicSubjectStatics,
    AcademicSubjectMethods,
    AcademicSubjectModel,
    AcademicSubjectDoc
} from        '@models/declarations/academic-subject';
export * from '@models/declarations/academic-subject';

export const Schema = new Mongoose.Schema({
    name: { 
        type:     String, 
        required: true, 
        index:    true, 
        unique:   true,
    },
    teachers: { type: [String],               required: true },
    practice: { type: AcademicActivitySchema, required: true },
    credit:   { type: AcademicActivitySchema, required: true },
    exam:     { type: AcademicActivitySchema, required: true },
});

const Statics: AcademicSubjectStatics = {
    tryFindByName(name) {
        return this.tryFindOne({ name });
    }
};

const Methods: AcademicSubjectMethods = {
    randomMarkAndMessage(activityType, student) {
        assert(['practice', 'exam', 'credit'].includes(activityType));

        const activity = this[activityType];
        const mark = activity.mark_range.random();
        return {
            mark, 
            message: activity.renderRandomTemplateMessage({
                mark,
                student,
                subject: this.name,
                teacher: Utils.pickRandom(this.teachers)
            })
        };
    }
};

Schema.statics = Statics;
Schema.methods = Methods;

// beware that plugins must come after assigning methods and statics to Schema
Schema.plugin(CrudPlugin);
Schema.plugin(Paginate);

export const AcademicSubject = Mongoose.model<AcademicSubjectDoc, AcademicSubjectModel>(
    'AcademicSubject', Schema
);
