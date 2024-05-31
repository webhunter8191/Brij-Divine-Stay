import mongoose from "mongoose";
import { rootConfig } from "../config/envConfig.js";
import { logger } from "../config/logger.js";

const dbConnect = () => {
    mongoose
        .connect(rootConfig.db.url, {
            dbName: rootConfig.db.dbname,
        })
    .then((c) => {
        logger.info(`Connected to the database ${c.connection.name}`);
    })
    .catch((err) => {
        logger.error(`Error in connecting to the database ${err.message}`);
        throw err;
    });
}

export default dbConnect;
