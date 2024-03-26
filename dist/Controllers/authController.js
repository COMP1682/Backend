"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const login = async (req, res, next) => {
    var _a;
    try {
        const { email, password } = req.body;
        const user = await UserModel_1.default.findOne({ email: email });
        if (user == null)
            return res.status(400).json({ msg: "User does not exist. " });
        if (user.password != null) {
            const isMatch = await bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials. " });
        }
        const key = process.env.JWT_TOKEN || "881834456304";
        const token = jsonwebtoken_1.default.sign(user.firstName, key);
        (_a = user.password) === null || _a === void 0 ? void 0 : _a.replace(user.password, "");
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
