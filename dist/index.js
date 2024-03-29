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
const chatRoute_1 = __importDefault(require("./Route/chatRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
const httpsServer = http_1.default.createServer(app);
app.use((0, cors_1.default)());
database_1.default.connectData();
app.use(express_1.default.text());
app.use(body_parser_1.default.json());
// io.on('connect', (socket) => {
//     console.log('socket io connected');
//     socket.on('disconnect', (msg) => {
//       console.log('io disconnected');
//     });
//   });
app.get("/", cors_1.default, (req, res) => {
});
app.use("/users", UserRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/post", PostRoute_1.default);
app.use("/chat", chatRoute_1.default);
httpsServer.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
