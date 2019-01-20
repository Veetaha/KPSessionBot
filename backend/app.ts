import * as Mongoose     from 'mongoose';
import Express from 'express';
import logger  from 'morgan';
import * as Config       from '@app/config';
import * as HttpCodes    from 'http-status-codes';

const app = Express()
    .use(logger('dev'))
    .use(Express.static(Config.FrontendDistDir));

/*
apolloServer.applyMiddleware({
    app,
    path: '/api/v1/gql'
});
*/

// Let frontend handle all get requests, which are not targeted to API
app .get('*', (_req, res, next) => res.sendFile(Config.FrontendIndexPath, next))
    .use(((err, _req, res, _next) => { // global error handler
        console.error(err);
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
        () => console.log(`🚀  Server is listening on port ${Config.Port}`)
    ))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
    
// Close DB connection when shutting down manually
process.on('SIGINT', () => Mongoose.disconnect().finally(() => process.exit(0)));