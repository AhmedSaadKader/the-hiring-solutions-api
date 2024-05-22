"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterModel = void 0;
const Base_model_1 = require("./Base_model");
const Roles_1 = require("./Roles");
const passwordHandler_1 = require("./helpers/passwordHandler");
const sql_query_1 = require("./helpers/sql_query");
class RecruiterModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'recruiters';
    }
    async indexRecruiter() {
        return super.index(this.tableName);
    }
    async showRecruiter(id) {
        return super.show(id, this.tableName);
    }
    async create(recruiter) {
        const { role = Roles_1.Roles.RECRUITER, name, email, password } = recruiter;
        try {
            const sql = 'INSERT INTO recruiters (role, name, email, password_digest) VALUES ($1, $2, $3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                role,
                name,
                email,
                password
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create recruiter ${name}. Error: ${err}`);
        }
    }
    async emailExists(email) {
        const sql = `SELECT * FROM ${this.tableName} WHERE email=($1)`;
        const result = await (0, sql_query_1.connectionSQLResult)(sql, [email]);
        if (!result.rows.length) {
            return undefined;
        }
        const user = result.rows[0];
        return user;
    }
    async authenticateRecruiter(email, password) {
        try {
            const recruiterAccount = await this.emailExists(email);
            if (!recruiterAccount) {
                throw new Error('email unavailable');
            }
            if ((0, passwordHandler_1.comparePassword)(password, recruiterAccount.password_digest)) {
                throw new Error('password is incorrect');
            }
            return recruiterAccount;
        }
        catch (err) {
            throw new Error(`Could not find user ${email}. Error: ${err}`);
        }
    }
    async deleteRecruiter(id) {
        return super.delete(id, this.tableName);
    }
    async update(recruiter) {
        const { id, name, email, password } = recruiter;
        try {
            const sql = 'UPDATE recruiters SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                email,
                password,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update recruiter ${id}. Error: ${err}`);
        }
    }
}
exports.RecruiterModel = RecruiterModel;
