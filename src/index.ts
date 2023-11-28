import https, { request } from 'http';
import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import database from "./Data/database";
import userRoutes from "./Route/UserRoute";
import postRoutes from "./Route/PostRoute";
import loginRoutes from "./Route/authRoute";
import chatRoutes from "./Route/chatRoute";
import cors from "cors";

dotenv.config();

const  PORT  = process.env.PORT || 3001;
const app: Express = express();  
const httpsServer = https.createServer(app);

app.use(cors());
database.connectData();

app.use(express.text());
app.use(bodyParser.json());

// io.on('connect', (socket) => {
//     console.log('socket io connected');
//     socket.on('disconnect', (msg) => {
//       console.log('io disconnected');
//     });
//   });

app.get("/", cors, ( req:Request, res: Response) => {
});

app.use("/users", userRoutes);
app.use("/auth",loginRoutes)
app.use("/post", postRoutes);
app.use("/chat", chatRoutes);


httpsServer.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));