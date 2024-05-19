"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class CompanyModel {
    async index() {
        try {
            const sql = 'SELECT * FROM companies';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find companies. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM companies WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find company ${id}. Error: ${err}`);
        }
    }
    async create(company) {
        const { name, industry, description, email, password } = company;
        try {
            const sql = 'INSERT INTO companies (name, industry, description, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                industry,
                description,
                email,
                password
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create company ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM companies WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete company ${id}. Error: ${err}`);
        }
    }
    async update(id, name, industry, description, email, password) {
        try {
            const sql = 'UPDATE companies SET name=($1), industry=($2), description=($3), email=($4), password=($5) WHERE id=($6) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                name,
                industry,
                description,
                email,
                password,
                id
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update company ${id}. Error: ${err}`);
        }
    }
}
exports.CompanyModel = CompanyModel;
