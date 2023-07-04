import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
import database from "./Data/database"
import {createUser,getUser,getUserById} from "./Controllers/userController"
import { get } from "http";

dotenv.config();

const  PORT  = process.env.PORT || 3000;
const app: Express = express();   

database.connectData();

app.use(express.json());

app.get("/", ( req:Request, res: Response) => {
});

app.post("/createUser", createUser);

app.get("/getUserById/:_id", getUserById);

app.get("/getUser/", getUser);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));