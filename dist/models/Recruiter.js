"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterModel = void 0;
const Base_model_1 = require("./Base_model");
class RecruiterModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'recruiters';
    }
    async index() {
        return super.index(this.tableName);
    }
    async show(id) {
        return super.show(id, this.tableName);
    }
    async create(recruiter) {
        return super.create(recruiter, this.tableName);
    }
    async delete(id) {
        return super.delete(id, this.tableName);
    }
    async update(id, name, email, password) {
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
