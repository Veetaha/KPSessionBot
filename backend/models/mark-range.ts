import * as Mongoose from 'mongoose';
import * as MathJs from 'mathjs';

export interface MarkRangeData {
    min: number;
    max: number;
}

// beware that the range is [min, max) excluding 0
export const Schema = new Mongoose.Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true },
});

const Methods: MarkRangeMethods = {
    /**
     * Returns random number in range [this.min, this.max) excluding 0
     */
    random() {
        return this.min > 0                      ?
            MathJs.randomInt(this.min, this.max) :
            Math.random() >= 1/2                 ?
            MathJs.randomInt(1, this.max)        :
            MathJs.randomInt(this.min, 0);
    }
};

Schema.methods = Methods;

export interface MarkRangeMethods {
    random(this: MarkRange): number;
}

export interface MarkRange extends 
Mongoose.Document, MarkRangeData, MarkRangeMethods {}