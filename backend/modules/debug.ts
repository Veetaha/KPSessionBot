import * as Vts from 'vee-type-safe';

export namespace Log {
    function currentTime() {
        return new Date().toUTCString();
    }

    export function info(message: unknown) {
        process.stdout.write(`${currentTime()}| Info: `);
        console.dir(message);
    }
    export function error(message: unknown) {
        console.error(`${currentTime()}| Error: ${message}`);
    }
    export function warning(message: unknown) {
        console.warn(`${currentTime()}| Warning: ${message}`);
    }
}

export function shutdown(reason = 'undefined behaviour'): never {
    debugger;
    Log.error(new Error(reason));
    return process.exit(1);
}

export function assertFalsy(falsy: unknown) {
    if (falsy) {
        Log.error(falsy);
        shutdown(`assertion failure`);
    }
}

export function assertMatches(suspect: unknown, typeDescr: Vts.TypeDescription) {
    const mismatch = Vts.mismatch(suspect, typeDescr);
    if (mismatch) {
        shutdown(mismatch.toErrorString());
    }
}

export function assert(truthy: unknown) {
    if (!truthy) {
        Log.error(truthy);
        shutdown(`assertion failure`);
    }
}