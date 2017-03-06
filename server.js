import http from 'http';
import mongoose from 'mongoose';
import util from 'util';
import fs from 'fs';
import glob from 'glob';
import Promise from 'bluebird';
import { join } from 'path';
import config from './config/env';
import app from './config/express';

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// connect to mongo db
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    const server = http.createServer(app);
    const PORT = config.port;
    // make bluebird default Promise
    mongoose.Promise = Promise;
    server.listen(PORT, function() {
        console.log(`server started on port ${config.port} (${config.env})`);
        // 注册全局未捕获异常处理器
        process.on('uncaughtException', function(err) {
            console.error("Caught exception:", err.stack);
        });
        process.on('unhandledRejection', function(reason, p) {
            console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
        });
    });
}

function connect() {
    // print mongoose logs in dev env
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}

if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

export default app;
