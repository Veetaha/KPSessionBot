import _ from 'lodash';
import { describe, it }  from 'mocha';
import { assert }        from 'chai';
import { IntegerRange  } from '@modules/integer-range';

enum Limits {
    Min = Number.MIN_SAFE_INTEGER,
    Max = Number.MAX_SAFE_INTEGER
}

describe('IntegerRange.randomUniqueIntegers()', () => {
    it('must generate no numbers when range is empty', () => {
        const ranges = makeRanges([
            [-5, -5], 
            [25, 25], 
            [Limits.Min, Limits.Min], 
            [Limits.Max, Limits.Max]
        ]);
        ranges.push(IntegerRange.empty);
        for (const range of ranges) {
            assert.isTrue(range.randomUniqueIntegers().next().done);
        }
    });
    it('must generate one number if range consists of only one number', () => {
        const ranges = makeRanges([
            [0, 1], 
            [5, 6],
            [-5, -6],
            [Limits.Min, Limits.Min + 1], 
            [Limits.Max - 1, Limits.Max]
        ]);
        for (const range of ranges) {
            const iterator = range.randomUniqueIntegers();
            assert.strictEqual(iterator.next().value, range.min);
            assert.isTrue(iterator.next().done);
        }
    });
    it('must generate all unique integers in its range each new time it is called', () => {
        const ranges = makeRanges([
            [0, 10],
            [-42, 42],
            [Limits.Min, Limits.Min + 50],
            [Limits.Max - 50, Limits.Max]
        ]);
        for (const range of ranges) {
            const generated = new Set<number>();
            for (const randomInt of range.randomUniqueIntegers()) {
                assert.isTrue(range.includes(randomInt));
                assert.isFalse(generated.has(randomInt));
                generated.add(randomInt);
            }
            assert.strictEqual(generated.size, range.rangeLength);
        }
    });
    it('must generate at most the given `limit` integers amount', () => {
        const ranges = makeRanges([
            [0, 10],
            [-42, 42],
            [Limits.Min, Limits.Min + 50],
            [Limits.Max - 50, Limits.Max]
        ]);
        for (const range of ranges) {
            let iterations = 0;
            for (const __ of range.randomUniqueIntegers(range.rangeLength / 2)) {
                ++iterations;
            }
            assert.strictEqual(iterations, Math.floor(range.rangeLength / 2));

            
            iterations = 0;
            for (const __ of range.randomUniqueIntegers(range.rangeLength)) {
                ++iterations;
            }
            assert.strictEqual(iterations, range.rangeLength);

            
            iterations = 0;
            for (const __ of range.randomUniqueIntegers(range.rangeLength + 23)) {
                ++iterations;
            }
            assert.strictEqual(iterations, range.rangeLength);
        }
    });
});

function makeRanges(tuples: [number, number][]) {
    return _.map(tuples, ([min, max]) => new IntegerRange(min, max));
}