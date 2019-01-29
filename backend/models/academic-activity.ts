import * as Mongoose  from 'mongoose';
import * as Utils     from '@modules/utils';
import escapeStringRegexp from 'escape-string-regexp';
import * as _ from 'lodash';

import { 
    AcademicActivityMethods 
} from        '@models/declarations/academic-activity';
export * from '@models/declarations/academic-activity';

export const Schema = new Mongoose.Schema({
    practice: { type: [String], required: true },
    credit:   { type: [String], required: true },
    exam:     { type: [String], required: true },
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
