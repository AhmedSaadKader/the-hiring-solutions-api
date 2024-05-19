"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateSkillModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class CandidateSkillModel {
    async index() {
        try {
            const sql = 'SELECT * FROM candidate_skills';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find candidate_skills. Error: ${err}`);
        }
    }
    async show(skill_id, candidate_id) {
        try {
            const sql = 'SELECT * FROM candidate_skills WHERE skill_id=($1) AND candidate_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, candidate_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find candidate_skill. Error: ${err}`);
        }
    }
    async create(skill_id, candidate_id) {
        try {
            const sql = 'INSERT INTO candidate_skills (skill_id, candidate_id) VALUES ($1, $2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, candidate_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create candidate_skill. Error: ${err}`);
        }
    }
    async delete(skill_id, candidate_id) {
        try {
            const sql = 'DELETE FROM candidate_skills WHERE skill_id=($1) AND candidate_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, candidate_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete candidate_skill. Error: ${err}`);
        }
    }
}
exports.CandidateSkillModel = CandidateSkillModel;
