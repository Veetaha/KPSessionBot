import * as Mongoose  from 'mongoose';
import * as MathJS    from 'mathjs';
import escapeStringRegexp from 'escape-string-regexp';
import * as _ from 'lodash';

/**
 * This model is meant to be a subdocument.
 * MessageTemplates represents template strings with the shape of 
 * `text ${teacher} text ${mark} text ${student} text ${subject}`,
 * which may be rendered, replacing ${...} patterns with appropriate data.
 */
export interface MessageTemplatesData {
    practice: string[];
    credit:   string[];
    exam:     string[];
}

export const Schema = new Mongoose.Schema({
    practice: { type: [String], required: true },
    credit:   { type: [String], required: true },
    exam:     { type: [String], required: true },
});


const Methods: MessageTemplatesMethods = {
    render({ data, type }) {
        return this[type][MathJS.randomInt(0, this[type].length)]
            .replace(
                new RegExp(
                    `\\\${(${_.keys(data).map(escapeStringRegexp).join('|')})}`
                ), 
                (_fullMatch, key) => data[key as keyof MTRenderOptionsData]
            );
    }
};

Schema.methods = Methods;

// MT - MessageTemplates
export interface MTRenderOptions {
    data: MTRenderOptionsData;
    type: keyof MessageTemplatesData;
}
export interface MTRenderOptionsData {
    teacher: string;
    mark:    string;
    student: string;
    subject: string;
}

export interface MessageTemplatesMethods {
    /**
     * Renders corresponding 'options.type' template with the given 'options.data'
     * @param options an object that contains the info about the type of template
     *  to render and all the needed data about the event
     */
    render(
        this:    Readonly<MessageTemplates>, 
        options: Readonly<MTRenderOptions>
    ): string;
}

export interface MessageTemplates extends 
Mongoose.Document, MessageTemplatesData, MessageTemplatesMethods {}