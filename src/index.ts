import express, {Express, Request, Response} from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import database from "./Data/database"
import userRoutes from "./Route/UserRoute";
import {createUser,getUser,getUserById,updateUser} from "./Controllers/userController"
import { get } from "http";
import cors from "cors"

dotenv.config();

const  PORT  = process.env.PORT || 3000;
const app: Express = express();   

app.use(cors());
database.connectData();

app.use(express.text());
app.use(bodyParser.json());

app.get("/", ( req:Request, res: Response) => {
});

app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));