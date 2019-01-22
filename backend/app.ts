import * as Mongoose   from 'mongoose';
import * as Config     from '@app/config';
import * as HttpCodes  from 'http-status-codes';
import * as BodyParser from 'body-parser';
import Express from 'express';
import Morgan  from 'morgan';
import { TgBot } from '@routes/telegram-bot';
import { Log }   from '@modules/debug';

const app = Express()
    .use(Morgan('dev'))
    .use(BodyParser.json())
    .use(Express.static(Config.FrontendDistDir))
    .post(Config.TgBotWebhookEndpoint, 
        (req, res) => {
            // @TODO: vulnerability to incompatible body json type
            TgBot.processUpdate(req.body);
            res.sendStatus(200);
        });

/*
apolloServer.applyMiddleware({
    app,
    path: '/api/v1/graphql'
});
*/

// Let frontend handle all get requests, which are not targeted to API
app .get('*', (_req, res, next) => res.sendFile(Config.FrontendIndexPath, next))
    .use(((err, _req, res, _next) => { // global error handler
        Log.error(err);
        res.status(err.status || HttpCodes.INTERNAL_SERVER_ERROR)
           .json({ error: String(err) });
    }) as Express.ErrorRequestHandler);


Mongoose.connect(Config.DatabaseUrl, { 
        useNewUrlParser: true,
        keepAlive: 1, 
        connectTimeoutMS: 30000 
    })
    .then(() => app.listen(
        Config.Port,
        () => Log.info(`🚀  Server is listening on port ${Config.Port}`)
    ))
    .catch(err => {
        Log.error(err);
        process.exit(1);
    });
    
// Close DB connection when shutting down manually
process.on('SIGINT', () => Mongoose.disconnect().finally(() => process.exit(0)));