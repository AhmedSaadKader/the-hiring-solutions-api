"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterModel = void 0;
const Base_model_1 = require("./Base_model");
const Roles_1 = require("./Roles");
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
        const { name, email, password } = recruiter;
        const role = Roles_1.Roles.RECRUITER;
        try {
            const sql = 'INSERT INTO recruiters (role, name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
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
