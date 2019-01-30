/**
 * Error class factory, returnes an error subclass that instantiates objects
 * with the given message by default.
 * 
 * @param defaultErrorMessage Message that is stored in `Error.message` property
 *                            by default. 
 */
export function makeErrorSubclass(
    defaultErrorMessage: string
) {
    return class extends Error {
        constructor(errorMessage = defaultErrorMessage) {
            super(errorMessage);
        }
    };
}