import * as Mongoose  from 'mongoose';
import Paginate       from 'mongoose-paginate';
import * as _         from 'lodash';
import * as Utils     from '@modules/utils';

import { CrudPlugin, CrudPluginStatics } from '@modules/mongoose-plugins/apollo-crud';
import { MarkRange, Schema as MarkRangeSchema } from '@models/mark-range';
import { 
    MessageTemplates, 
    Schema as MessageTemplatesSchema
} from '@models/message-templates';
import { Student } from './student';

export interface MarkRanges {
    practice: MarkRange;
    credit:   MarkRange;
    exam:     MarkRange;
}

export interface AcademicSubjectData {
    name:     string;      // unique 
    teachers: string[];    // teacher's names
    // indicates the range of marks a student may get for respective activities
    mark_ranges: MarkRanges;
    mark_templates: {
        positive: MessageTemplates;
        negative: MessageTemplates;
    };    
}

export const Schema = new Mongoose.Schema({
    name: { 
        type:     String, 
        required: true, 
        index:    true, 
        unique:   true,
    },
    teachers: { type: [String], required: true },
    mark_ranges: {
        type: {
            practice: MarkRangeSchema,
            credit:   MarkRangeSchema,
            exam:     MarkRangeSchema,
        },
        required: true
    },
    mark_templates: {
        type: {
            positive: MessageTemplatesSchema,
            negative: MessageTemplatesSchema,  
        },
        required: true
    },
});

const Statics: AcademicSubjectStatics = {
    tryFindByName(name) {
        return this.tryFindOne({ name });
    }
};

const Methods: AcademicSubjectMethods = {
    randomMarkAndMessage(activityType, student) {
        const mark = this.mark_ranges[activityType].random();
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

export const AcademicSubject = Mongoose.model<AcademicSubject, AcademicSubjectModel>(
    'AcademicSubject', Schema
);

export interface MarkAndMessage {
    mark:    number;
    message: string;
}

export interface AcademicSubjectMethods {
    randomMarkAndMessage(
        this:         AcademicSubject,
        activityType: keyof MarkRanges,
        student:      Student
    ): MarkAndMessage;
}

export interface AcademicSubject extends 
Mongoose.Document, AcademicSubjectData, AcademicSubjectMethods {}

export interface AcademicSubjectStatics {    
    tryFindByName(
        this: AcademicSubjectModel,
        name: string
    ): Promise<AcademicSubject>;
}

export interface AcademicSubjectModel extends 
Mongoose.PaginateModel<AcademicSubject>, 
AcademicSubjectStatics, 
CrudPluginStatics<AcademicSubject> 
{}