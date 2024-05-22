"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const hashPassword = (password) => bcrypt_1.default.hashSync((password + BCRYPT_PASSWORD), parseInt(SALT_ROUNDS));
exports.hashPassword = hashPassword;
const comparePassword = (password, password_digest) => {
    if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, password_digest)) {
        return true;
    }
    return false;
};
exports.comparePassword = comparePassword;
