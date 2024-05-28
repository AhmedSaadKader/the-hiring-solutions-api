"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const Base_model_1 = require("./Base_model");
const Roles_1 = require("./Roles");
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
        const { name, phone_no, email, password } = admin;
        const role = Roles_1.Roles.ADMIN;
        try {
            const sql = 'INSERT INTO admins (role, phone_no, name, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                role,
                phone_no,
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
