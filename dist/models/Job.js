"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class JobModel {
    async index() {
        try {
            const sql = 'SELECT j.*, c.name AS company_name, c.email AS company_email FROM jobs AS j JOIN companies AS c ON j.company_id = c.id';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find jobs. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT j.* c.name AS company_name, c.email AS company_email FROM jobs AS j JOIN companies AS c ON j.company_id = c.id WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find job ${id}. Error: ${err}`);
        }
    }
    async create(job) {
        const { company_id, title, description, salary, location, status } = job;
        try {
            const sql = 'INSERT INTO jobs (company_id, title, description, salary, location, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                company_id,
                title,
                description,
                salary,
                location,
                status
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create job. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM jobs WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete job ${id}. Error: ${err}`);
        }
    }
    async update(id, company_id, title, description, salary, location, status) {
        try {
            const sql = 'UPDATE jobs SET company_id=($1), title=($2), description=($3), salary=($4), location=($5), status=($6) WHERE id=($7) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                company_id,
                title,
                description,
                salary,
                location,
                status,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update job ${id}. Error: ${err}`);
        }
    }
}
exports.JobModel = JobModel;
