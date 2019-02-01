import _ from 'lodash';
import * as Utils from '@modules/utils';
import { describe, it }  from 'mocha';
import { assert }        from 'chai';

type ArgsArray = [string[], number[]][];

describe('Utils.pickRandomItems()', () => {
    it('must generate no items when forwarded empty arrays', () => {
        assert.isTrue(Utils.pickRandomItems([], []).next().done);
    });

    it('must return `times[i]` amount of `arr[i]` item', () => {
        const argsArr: ArgsArray = [
            [['obj'], [1]],
            [['obj'], [20]]
        ];
        for (const args of argsArr) {
            const [arr, times] = args;
            let iterations = 0;
            for (const randomValue of Utils.pickRandomItems([...arr], [...times])) {
                assert.strictEqual(randomValue, arr[0]);
                ++iterations;
            }
            assert.strictEqual(iterations, times[0]);
        }        
    });

    it('must return unique items from `arr` when `times` is `[1, 1, ...]`', () => {
        const argsArr: ArgsArray = [
            makeArgs(2),
            makeArgs(5),
            makeArgs(55)
        ];
        for (const args of argsArr) {
            const generated = new Set<string>();
            for (const randomValue of Utils.pickRandomItems(...args)) {
                assert.isFalse(generated.has(randomValue));
                generated.add(randomValue);
            }
        }

        function makeArgs(arrLength: number): ArgsArray[number] {
            return [
                _.times(arrLength, i => `item${i}`),
                _.times(arrLength, () => 1)
            ];
        }
    });

});