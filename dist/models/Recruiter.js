"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class RecruiterModel {
    async index() {
        try {
            const sql = 'SELECT * FROM recruiters';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find recruiters. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM recruiters WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find recruiter ${id}. Error: ${err}`);
        }
    }
    async create(recruiter) {
        const { name, email, password } = recruiter;
        try {
            const sql = 'INSERT INTO recruiters (name, email, password) VALUES ($1, $2, $3) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, email, password]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create recruiter ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM recruiters WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete recruiter ${id}. Error: ${err}`);
        }
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
