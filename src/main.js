/*import config from './config/app.config.js';
import {server} from './bootstrap/server.js';
import { connectToDatabase } from './config/db.config.js';
import { connectToRedis } from './config/redis.config.js';

(() =>
{
    try {
        connectToRedis();
        connectToDatabase();
        server.listen(config.port, () => 
        {
            console.info(`server is running on port :${config.port}`);
        })

    } catch (error) {
        console.error.bind(console, 'the server could not be started');
    }
})();*/

import config from "./config/app.config.js";
import { server } from "./bootstrap/server.js";
import { connectToDatabase } from "./config/db.config.js";
import { connectToRedis, redisClient } from "./config/redis.config.js";

(async () => {
    try {
        await connectToDatabase();

        await connectToRedis();

        server.listen(config.port, () => {
            console.info(`Server is running on port: ${config.port}`);
        });

    } catch (error) {
        console.error("The server could not be started:", error);
    }
})();