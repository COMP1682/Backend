"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class database {
    constructor() {
    }
    static async connectData() {
        await mongoose_1.default.connect(`mongodb+srv://${process.env.user}:${process.env.password}@finalproject.j5302ft.mongodb.net/?retryWrites=true&w=majority`);
        console.log("connect database successfully");
    }
}
exports.default = database;
