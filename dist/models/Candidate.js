"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
const Base_model_1 = require("./Base_model");
const passwordHandler_1 = require("./helpers/passwordHandler");
const sql_query_1 = require("./helpers/sql_query");
class CandidateModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'candidates';
    }
    async indexCandidate() {
        // const sql =
        //   'SELECT c.*, r.name AS recruiter_name FROM candidates AS c LEFT JOIN recruiters AS r ON c.recruiter_id = r.id';
        return super.index(this.tableName);
    }
    async showCandidate(id) {
        // const sql =
        //   'SELECT c.*, r.name AS recruiter_name FROM candidates AS c LEFT JOIN recruiters AS r ON c.recruiter_id = r.id WHERE c.id = $1';
        return super.show(id, this.tableName);
    }
    async create(candidate) {
        const { name, phone_no, email, password, resume, experience } = candidate;
        try {
            const sql = 'INSERT INTO candidates (name, phone_no, email, password_digest, resume, experience) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const password_digest = (0, passwordHandler_1.hashPassword)(password);
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                phone_no,
                email,
                password_digest,
                resume,
                experience
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create candidate ${name}. Error: ${err}`);
        }
    }
    async deleteCandidate(id) {
        return super.delete(id, this.tableName);
    }
    async update(candidate) {
        const { id, recruiter_id, name, email, password, resume, experience } = candidate;
        try {
            const sql = 'UPDATE candidates SET recruiter_id=($1), name=($2), email=($3), password_digest=($4), resume=($5), experience=($6) WHERE id=($7) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                recruiter_id,
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
