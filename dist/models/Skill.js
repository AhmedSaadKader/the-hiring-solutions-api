"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModel = void 0;
const sql_query_1 = require("./helpers/sql_query");
class SkillModel {
    async index() {
        try {
            const sql = 'SELECT * FROM skills';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find skills. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM skills WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find skill ${id}. Error: ${err}`);
        }
    }
    async create(skill) {
        const { name } = skill;
        try {
            const sql = 'INSERT INTO skills (name) VALUES ($1) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create skill ${name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM skills WHERE id=($1)';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete skill ${id}. Error: ${err}`);
        }
    }
    async update(id, name) {
        try {
            const sql = 'UPDATE skills SET name=($1) WHERE id=($2) RETURNING *';
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [name, id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update skill ${id}. Error: ${err}`);
        }
    }
}
exports.SkillModel = SkillModel;
