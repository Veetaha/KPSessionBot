import * as MathJS from 'mathjs';
import * as Utils  from '@modules/utils';
import _ from 'lodash';

/**
 * Represents a range of integers [min, max), 
 * i.e. min bound is inclusive, but max bound is exclusive.
 * 
 * Note that this class is immutable, create new instance if
 * you need another range bounds.
 */
export class IntegerRange {
    /**
     * Returns the number of integers, covered by this range, or `max - min`
     */
    get rangeLength() {
        return this.max - this.min;
    }

    /**
     * Creates an instanse of IntegerRange, rounds min and max values if those
     * have decimal parts and swaps them if min > max.
     * 
     * @param min minimum range bound (inclusive)
     * @param max maximim range bound (exclusive)
     */
    constructor(
        public readonly min: number,
        public readonly max: number,
    ) {
        min = Math.round(min);
        max = Math.round(max);
        if (min > max) {
            this.min = max;
            this.max = min;
        }
    }

    /**
     * Returns a random integer from the range [min, max)
     */
    random() {
        return MathJS.randomInt(this.min, this.max);
    }

    /**
     * Returns IterableIterator<number> over random unique integers 
     * within this range.
     * 
     * @remarks 
     * Iterator's inner algorithm has O(max - min) linear memory complexity in 
     * all cases, and O(1) time complexity to generate each successive random integer.
     * 
     * @copyright https://stackoverflow.com/a/196065/9259330
     * 
     * @param range The range of numbers genereted integers are taken from.
     * @param limit The maximum amount of numbers to generate, 
     *              which is `max - min` by default
     */
    *randomUniqueIntegers(limit = this.rangeLength){
        const numbers = _.times(this.rangeLength, i => this.min + i);
        for (let i = 0; i < numbers.length && i < limit; ++i) {
            Utils.swapItems(numbers, i, MathJS.randomInt(i, numbers.length));
            yield numbers[i];
        }
    }
}