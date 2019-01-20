import * as Dotenv from 'dotenv';
import * as Path from 'path';
import generateRsaKeyPair from 'generate-rsa-keypair';
import { tryReadEnv, pathFromRoot } from './helpers';
export { ProjectRootDir } from './helpers';

Dotenv.load();

export const Port              = tryReadEnv('PORT');
export const DatabaseUrl       = tryReadEnv('DATABASE_URL');
export const JwtExpirationTime = tryReadEnv('JWT_EXP_TIME');
export const PasswordSalt      = tryReadEnv('PASSWORD_SALT');
export const TgBotToken        = tryReadEnv('TG_BOT_TOKEN');
// 'https://kpsession.herokuapp.com'
// 'https://localhost:8080'
export const BackendRootUrl    = tryReadEnv('BACKEND_ROOT_URL'); 

export const TgBotWebhookEndpoint = `/bot${TgBotToken}`;
export const TgBotWebookFullUrl   = `${BackendRootUrl}${TgBotWebhookEndpoint}`;
export const FrontendDistDir      = pathFromRoot('frontend/dist/frontend');
export const FrontendIndexPath    = Path.join(FrontendDistDir, 'index.html');

// expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
export const JwtEncodingAlgorithm = 'RS256';
export const JwtKeyPair = generateRsaKeyPair();



