import * as Mongoose  from 'mongoose';
import * as Utils     from '@modules/utils';
import escapeStringRegexp from 'escape-string-regexp';
import * as _ from 'lodash';
import { Schema as MarkRangeSchema } from '@models/mark-range';

import { 
    AcademicActivityMethods 
} from        '@models/declarations/academic-activity';
export * from '@models/declarations/academic-activity';

export const Schema = new Mongoose.Schema({
    mark_range: { type: MarkRangeSchema, required: true },
    message_templates: {
        type: {
            positive: { type: [String], required: true },
            negative: { type: [String], required: true }
        },
        required: true
    }
});


const Methods: AcademicActivityMethods = {
    randomTemplateForMark(mark) {
        return Utils.pickRandom(
            this.message_templates[mark > 0 ? 'positive' : 'negative']
        );
    },
    renderRandomTemplateMessage(data) {
        return this
            .randomTemplateForMark(data.mark)
            .replace(
                new RegExp(
                    `\\\${(${_.keys(data).map(escapeStringRegexp).join('|')})}`,
                    'g'
                ), 
                (_fullMatch, key) => data[key as keyof typeof data].toString()
            );
    }
};

Schema.methods = Methods;
