"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSkillModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class EmployeeSkillModel {
    async index() {
        try {
            const sql = 'SELECT * FROM employee_skills';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find employee_skills. Error: ${err}`);
        }
    }
    async show(skill_id, employee_id) {
        try {
            const sql = 'SELECT * FROM employee_skills WHERE skill_id=($1) AND employee_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, employee_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find employee_skill. Error: ${err}`);
        }
    }
    async create(skill_id, employee_id) {
        try {
            const sql = 'INSERT INTO employee_skills (skill_id, employee_id) VALUES ($1, $2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, employee_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create employee_skill. Error: ${err}`);
        }
    }
    async delete(skill_id, employee_id) {
        try {
            const sql = 'DELETE FROM employee_skills WHERE skill_id=($1) AND employee_id=($2)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [skill_id, employee_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete employee_skill. Error: ${err}`);
        }
    }
}
exports.EmployeeSkillModel = EmployeeSkillModel;
