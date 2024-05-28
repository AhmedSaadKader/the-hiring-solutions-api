"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BaseModel {
    async index(tableName, sql = `SELECT * FROM ${tableName}`) {
        try {
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            console.log(result.rows);
            console.log(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find ${tableName}. Error: ${err}`);
        }
    }
    async show(id, tableName, sql = `SELECT * FROM ${tableName} WHERE id=($1)`) {
        try {
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find ${tableName} with the id: ${id}. Error: ${err}`);
        }
    }
    validatePhoneNumber(phoneNo) {
        const phoneRegex = /^(012|011|010|015)\d{8}$/;
        if (!phoneRegex.test(phoneNo)) {
            throw new Error('Invalid phone number format');
        }
    }
    async emailExists(email, tableName) {
        const sql = `SELECT * FROM ${tableName} WHERE email=($1)`;
        const result = await (0, sql_query_1.connectionSQLResult)(sql, [email]);
        if (!result.rows.length) {
            return null;
        }
        const user = result.rows[0];
        return user;
    }
    async authenticate(identifier, password, tableName) {
        const isPhoneNumber = /^\d+$/.test(identifier);
        const field = isPhoneNumber ? 'phone_no' : 'email';
        const sql = `SELECT * FROM ${tableName} WHERE ${field}=($1)`;
        console.log(sql);
        const result = await (0, sql_query_1.connectionSQLResult)(sql, [identifier]);
        console.log(result);
        if (result.rows.length) {
            const baseUser = result.rows[0];
            //   if (comparePassword(password, baseUser.password_digest)) {
            return baseUser;
            //   }
        }
        return null;
    }
    generateJWT(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.TOKEN_SECRET, {
            expiresIn: '48h'
        });
    }
    async delete(id, tableName) {
        try {
            const sql = `DELETE FROM ${tableName} WHERE id=($1)`;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return null;
        }
        catch (err) {
            throw new Error(`Could not delete ${tableName} where id is ${id}. Error: ${err}`);
        }
    }
}
exports.BaseModel = BaseModel;
