import * as Mongoose from 'mongoose';
import { MarkRangeDoc } from '@models/mark-range';

/**
 * This model is meant to be a subdocument.
 * AcademicActivity represents an academic event, when a student gets a mark for
 * some activity he made (executed practice task, passed a credit/exam).
 * You may render message template strings, which describe the result of this 
 * activity. The results are generated randomly.
 * Template string must have the shape of 
 * `text ${teacher} text ${mark} text ${student} text ${subject}`,
 * which may be rendered, replacing ${...} patterns with appropriate data.
 */
export interface AcademicActivityData {
    /**
     * Defines a range of marks student may get for this activity.
     */
    mark_range: MarkRangeDoc;

    /** 
     * Template strings with the shape of 
     * 'text ${teacher} text ${mark} text ${student} text ${subject}'.
     * Apply a regular expression and substitute ${...} patterns with 
     * appropriate data.
     */ 
    message_templates: {
        positive: string[];
        negative: string[];
    }
}

export interface AcademicActivityMethods {    
    /**
     * Renders random template from 
     * `message_templates.positive/negative` array, depending on
     * whether data.mark is greater or lesser than 0.
     * 
     * @param data an object that contains the info about the type of template
     *  to render and all the needed data about the event.
     */
    renderRandomTemplateMessage(
        this: AcademicActivityDoc, 
        data: TemplateRenderingData
    ): string;
    
    /**
     * Returns a random string from `message_templates.positive` if mark > 0
     * otherwise a random string from `message_templates.negative` array.
     * 
     * @param mark Mark that a student got.
     */
    randomTemplateForMark(
        this: AcademicActivityDoc, 
        mark: number
    ): string;
}

export interface TemplateRenderingData {
    teacher: string;
    mark:    number;
    student: string;
    subject: string;
}

export interface AcademicActivityDoc extends 
Mongoose.Document, 
AcademicActivityData, 
AcademicActivityMethods
{}
