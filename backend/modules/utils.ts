import * as MathJS from 'mathjs';

export function pickRandom<T>(arr: ReadonlyArray<T>) {
    return arr[MathJS.randomInt(0, arr.length)];
}