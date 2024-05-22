"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const passwordHandler_1 = require("./helpers/passwordHandler");
const sql_query_1 = require("./helpers/sql_query");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BaseModel {
    async index(tableName) {
        try {
            const sql = `SELECT * FROM ${tableName}`;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find ${tableName}. Error: ${err}`);
        }
    }
    async show(id, tableName) {
        try {
            const sql = `SELECT * FROM ${tableName} WHERE id=($1)`;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find ${tableName} with the id: ${id}. Error: ${err}`);
        }
    }
    async create(user, tableName) {
        const { name, email, password } = user;
        try {
            const sql = `INSERT INTO ${tableName} (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
            const hash = (0, passwordHandler_1.hashPassword)(password);
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, email, hash]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create ${tableName} ${name}. Error: ${err}`);
        }
    }
    async authenticate(email, password, tableName) {
        const sql = `SELECT password_digest FROM ${tableName} WHERE email=($1)`;
        const result = await (0, sql_query_1.connectionSQLResult)(sql, [email]);
        if (result.rows.length) {
            const baseUser = result.rows[0];
            if ((0, passwordHandler_1.comparePassword)(password, baseUser.password_digest)) {
                return baseUser;
            }
        }
        return null;
    }
    generateJWT(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });
    }
    async delete(id, tableName) {
        try {
            const sql = `DELETE FROM ${tableName} WHERE id=($1) RETURNING *`;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete ${tableName} where id is ${id}. Error: ${err}`);
        }
    }
    async update(user, tableName) {
        const { id, name, email, password } = user;
        try {
            const sql = `UPDATE ${tableName} SET name=($1), email=($2), password_digest=($3) WHERE id=($4) RETURNING *`;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                email,
                password,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update ${tableName} where id is ${id}. Error: ${err}`);
        }
    }
}
exports.BaseModel = BaseModel;
