"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./Data/database"));
const UserRoute_1 = __importDefault(require("./Route/UserRoute"));
const PostRoute_1 = __importDefault(require("./Route/PostRoute"));
const authRoute_1 = __importDefault(require("./Route/authRoute"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use((0, cors_1.default)());
database_1.default.connectData();
app.use(express_1.default.text());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
});
app.use("/auth", authRoute_1.default);
app.use("/users", UserRoute_1.default);
app.use("/post", PostRoute_1.default);
httpServer.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
