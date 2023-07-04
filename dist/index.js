"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./Data/database"));
const userController_1 = require("./Controllers/userController");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
database_1.default.connectData();
app.use(express_1.default.json());
app.get("/", (req, res) => {
});
app.post("/createUser", userController_1.createUser);
app.get("/getUserById/:_id", userController_1.getUserById);
app.get("/getUser/", userController_1.getUser);
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
