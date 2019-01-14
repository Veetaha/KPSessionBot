import * as Dotenv from 'dotenv';
import * as Path from 'path';

Dotenv.load();
                            // two dirs up, relative to the build directory
export const ProjectRootDir = Path.normalize(Path.join(__dirname, '../../'));

export const Port            = tryReadEnv('PORT');
export const DatabaseUrl     = tryReadEnv('DATABASE_URL');
export const FrontendDistDir = pathFromRoot('frontend/dist/frontend');

export const FrontendIndexPath = Path.join(FrontendDistDir, 'index.html');
                            

function tryReadEnv(variableId: string) {
    if (!(variableId in process.env)) {
        throw new Error(`failed to read '${variableId}' environment variable`);
    }
    return process.env[variableId] as string;
}

function pathFromRoot(dest: string) {
    return Path.join(ProjectRootDir, dest);
}