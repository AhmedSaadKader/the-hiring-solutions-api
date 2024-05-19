"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class CandidateModel {
    async index() {
        try {
            const sql = 'SELECT * FROM candidates';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find candidates. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM candidates WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find candidate ${id}. Error: ${err}`);
        }
    }
    async create(candidate) {
        const { name, email, password, resume, experience } = candidate;
        try {
            const sql = 'INSERT INTO candidates (name, email, password, resume, experience) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                email,
                password,
                resume,
                experience
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create candidate ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM candidates WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete candidate ${id}. Error: ${err}`);
        }
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
