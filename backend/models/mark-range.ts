import * as Mongoose from 'mongoose';
import * as MathJS from 'mathjs';
import { 
    MarkRangeMethods 
} from        '@models/declarations/mark-range';
export * from '@models/declarations/mark-range';

export const Schema = new Mongoose.Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true },
});

const Methods: MarkRangeMethods = {
    random() {
        return this.min > 0                      ?
            MathJS.randomInt(this.min, this.max) :
            Math.random() >= 1/2                 ?
            MathJS.randomInt(1, this.max)        :
            MathJS.randomInt(this.min, 0);
    }
};

Schema.methods = Methods;
