"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const uuid_1 = require("uuid");
const sql_query_1 = require("./helpers/sql_query");
class EmployeeModel {
    async index() {
        try {
            const sql = 'SELECT * FROM employees';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find employees. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM employees WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find employee ${id}. Error: ${err}`);
        }
    }
    async create(employee) {
        const { id = (0, uuid_1.v4)(), name, email, password, resume, experience } = employee;
        try {
            const sql = 'INSERT INTO employees (id, name, email, password, resume, experience) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [
                id,
                name,
                email,
                password,
                resume,
                experience
            ]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create employee ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM employees WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete employee ${id}. Error: ${err}`);
        }
    }
    async update(id, name, email, password, resume, experience) {
        try {
            const sql = 'UPDATE employees SET name=($1), email=($2), password=($3), resume=($4), experience=($5) WHERE id=($6) RETURNING *';
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
            throw new Error(`Could not update employee ${id}. Error: ${err}`);
        }
    }
}
exports.EmployeeModel = EmployeeModel;
