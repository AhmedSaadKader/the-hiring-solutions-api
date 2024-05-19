"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRequirementModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class JobRequirementModel {
    async index() {
        try {
            const sql = 'SELECT * FROM job_requirements';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find job_requirements. Error: ${err}`);
        }
    }
    async show(skill_id, job_id) {
        try {
            const sql = 'SELECT * FROM job_requirements WHERE skill_id=($1) AND job_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, job_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find job_requirement. Error: ${err}`);
        }
    }
    async create(skill_id, job_id) {
        try {
            const sql = 'INSERT INTO job_requirements (skill_id, job_id) VALUES ($1, $2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, job_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create job_requirement. Error: ${err}`);
        }
    }
    async delete(skill_id, job_id) {
        try {
            const sql = 'DELETE FROM job_requirements WHERE skill_id=($1) AND job_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, job_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete job_requirement. Error: ${err}`);
        }
    }
}
exports.JobRequirementModel = JobRequirementModel;
