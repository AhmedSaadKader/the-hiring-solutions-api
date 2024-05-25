"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const Base_model_1 = require("./Base_model");
const Roles_1 = require("./Roles");
const passwordHandler_1 = require("./helpers/passwordHandler");
const sql_query_1 = require("./helpers/sql_query");
class AdminModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'admins';
    }
    async indexAdmin() {
        return super.index(this.tableName);
    }
    async showAdmin(id) {
        return super.show(id, this.tableName);
    }
    async create(admin) {
        const { name, email, password } = admin;
        const role = Roles_1.Roles.ADMIN;
        try {
            const sql = 'INSERT INTO admins (role, name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                role,
                name,
                email,
                password
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create admin ${name}. Error: ${err}`);
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
    async authenticateAdmin(email, password) {
        try {
            const adminAccount = await this.emailExists(email);
            if (!adminAccount) {
                throw new Error('email unavailable');
            }
            if ((0, passwordHandler_1.comparePassword)(password, adminAccount.password_digest)) {
                throw new Error('password is incorrect');
            }
            return adminAccount;
        }
        catch (err) {
            throw new Error(`Could not find user ${email}. Error: ${err}`);
        }
    }
    async deleteAdmin(id) {
        return super.delete(id, this.tableName);
    }
    async update(admin) {
        const { id, name, email, password } = admin;
        try {
            const sql = 'UPDATE admins SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                email,
                password,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update admin ${id}. Error: ${err}`);
        }
    }
}
exports.AdminModel = AdminModel;
