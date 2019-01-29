import * as Mongoose  from 'mongoose';
import Paginate       from 'mongoose-paginate';
import { CrudPlugin } from '@modules/mongoose-plugins/apollo-crud';
import * as _         from 'lodash';
import * as Utils     from '@modules/utils';


import { Schema as AcademicActivitySchema } from '@models/academic-activity';
import { 
    AcademicSubjectStatics,
    AcademicSubjectMethods,
    AcademicSubjectModel,
    AcademicSubjectDoc
} from '@models/declarations/academic-subject';

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
        const activity = this[activityType];
        const mark = activity.mark_range.random();
        const  = this[activityType].renderRandomTemplateMessage({
            mark
        });
        return {
            mark, 
            message: this.mark_templates[mark > 0 ? 'positive' : 'negative']
                .render({
                    type: activityType,
                    data: {
                        mark:    mark.toString(),
                        student: student.tg_name,
                        subject: this.name,
                        teacher: Utils.pickRandom(this.teachers)
                    }
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
