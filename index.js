import express from "express";
import dbConnect from "./db/dbconnect.js";
import { rootConfig } from "./config/envConfig.js";
import { logger } from "./config/logger.js";
import indexRoutes from "./routes/index.js"
// import { rootConfig } from "./config/envConfig";

const app = express();
const port = rootConfig.server.port || 4003;

app.use(express.json())

//mouting the routes
app.use('/api/v1', indexRoutes);

app.get("/", (req, res) => {
    console.log(`Default route`);
})

dbConnect();

app.listen(port, () => {
    logger.info(`App is running at port ${port}`)
})