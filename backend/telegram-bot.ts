import TgBotApi from 'node-telegram-bot-api';
import * as Config from '@app/config';
import { Log } from '@modules/debug';

export const TgBot = new TgBotApi(Config.TgBotToken);

// @FIXME: I wonder wether we have to close webhook manually.
TgBot.setWebHook(Config.TgBotWebookFullUrl, {
    allowed_updates: ['message']
}).then(() => Log.info('Telegram bot webhook set'));


TgBot.on('message', msg => {
    TgBot.sendMessage(msg.chat.id, 'It is alive!');
});