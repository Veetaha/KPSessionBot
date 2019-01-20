import * as Path from 'path';

// two dirs up, relative to the build directory
export const ProjectRootDir = Path.normalize(Path.join(__dirname, '../../'));


export function tryReadEnv(variableId: string, defaultVal?: string) {
    if (!(variableId in process.env)) {
        if (defaultVal) {
            return defaultVal;
        }
        throw new Error(
            `failed to read '${variableId}' environment variable`
        );
    }
    return process.env[variableId]!;
}

export function pathFromRoot(dest: string) {
    return Path.join(ProjectRootDir, dest);
}