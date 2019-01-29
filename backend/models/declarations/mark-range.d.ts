import * as Mongoose from 'mongoose';

/**
 * Represents the range of numbers [min, max), excluding 0
 */
export interface MarkRangeData {
    min: number;
    max: number;
}

export interface MarkRangeMethods {
    /**
     * Generates a random number from range [min, max), excluding 0
     */
    random(this: MarkRangeDoc): number;
}

export interface MarkRangeDoc extends 
Mongoose.Document, MarkRangeData, MarkRangeMethods {}