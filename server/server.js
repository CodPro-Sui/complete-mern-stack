import dotenv from "dotenv";
dotenv.config();

import dataBase from "./config/dataBase.js"
import express from "express";

import limitRate from "express-rate-limit";
import serverSlow from "express-slow-down";
import helmet from "helmet";

import router from "./routers/team.router.js";
import auth from "./routers/authenticate.js";
import cors from "cors";
import { noFound,errHandle } from "./middlwares/team.middlware.js";
import path from "node:path";
import { fileURLToPath } from "node:url";


const app = express();
dataBase();

//cors
app.set("trust proxy",1);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

const loginLimiter =limitRate({
windowMs: 1000 * 60 * 10,
limit: 40,
message:{
status: "error",
message: "too many try,please try again latar"
}
});

//make server slow for particular ip if limit cross 

let makeSlower = serverSlow({
windowMs: 5 * 60 * 1000,
delayAfter: 30,
delayMs: () => 60000
});
app.use(makeSlower);
app.use("/api/auth",loginLimiter,auth);

app.use("/api/page",makeSlower,router);
app.use(noFound);
app.use(errHandle);

const PORT = process.env.PORT || 5050;
app.listen(PORT,"0.0.0.0");
