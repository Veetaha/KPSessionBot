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