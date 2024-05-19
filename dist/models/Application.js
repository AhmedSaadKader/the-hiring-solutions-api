"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class ApplicationModel {
    async index() {
        try {
            const sql = 'SELECT * FROM applications';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find applications. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM applications WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find application ${id}. Error: ${err}`);
        }
    }
    async create(application) {
        const { job_id, candidate_id, recruiter_id, status, notes } = application;
        try {
            const sql = 'INSERT INTO applications (job_id, candidate_id, recruiter_id, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                job_id,
                candidate_id,
                recruiter_id,
                status,
                notes
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create application. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM applications WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete application ${id}. Error: ${err}`);
        }
    }
    async update(id, job_id, candidate_id, recruiter_id, status, applied_date, notes, reviewed_date) {
        try {
            const sql = 'UPDATE applications SET job_id=($1), candidate_id=($2), recruiter_id=($3), status=($4), applied_date=($5), notes=($6), reviewed_date=($7) WHERE id=($8) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                job_id,
                candidate_id,
                recruiter_id,
                status,
                applied_date,
                notes,
                reviewed_date,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update application ${id}. Error: ${err}`);
        }
    }
}
exports.ApplicationModel = ApplicationModel;
