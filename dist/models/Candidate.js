"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
const Base_model_1 = require("./Base_model");
class CandidateModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'candidates';
    }
    async index() {
        return super.index(this.tableName);
    }
    async show(id) {
        return super.show(id, this.tableName);
    }
    async create(candidate) {
        return super.create(candidate, this.tableName);
    }
    async authenticate(email, password) {
        return super.authenticate(email, password, this.tableName);
    }
    async delete(id) {
        return super.delete(id, this.tableName);
    }
    async update(id, name, email, password, resume, experience) {
        try {
            const sql = 'UPDATE candidates SET name=($1), email=($2), password=($3), resume=($4), experience=($5) WHERE id=($6) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                email,
                password,
                resume,
                experience,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update candidate ${id}. Error: ${err}`);
        }
    }
}
exports.CandidateModel = CandidateModel;
