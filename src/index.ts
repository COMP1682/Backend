import http, { request } from 'http';
import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import database from "./Data/database";
import userRoutes from "./Route/UserRoute";
import postRoutes from "./Route/PostRoute";
import loginRoutes from "./Route/authRoute"
import cors from "cors";
import { Server,Socket } from 'socket.io';

dotenv.config();

const  PORT  = process.env.PORT || 3000;
const app: Express = express();  
const httpServer = http.createServer(app);
export const io = new Server(httpServer);


app.use(cors());
database.connectData();

app.use(express.text());
app.use(bodyParser.json());

app.get("/", cors, ( req:Request, res: Response) => {
});

app.use("/users", userRoutes);
app.use("/auth",loginRoutes)
app.use("/post", postRoutes);


httpServer.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));