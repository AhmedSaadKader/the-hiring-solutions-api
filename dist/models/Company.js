"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const Base_model_1 = require("./Base_model");
const sql_query_1 = require("./helpers/sql_query");
class CompanyModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'companies';
    }
    async indexCompany() {
        return super.index(this.tableName);
    }
    async showCompany(id) {
        return super.show(id, this.tableName);
    }
    async create(company) {
        const { name, industry, description, email, password } = company;
        try {
            const sql = 'INSERT INTO companies (name, industry, description, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *';
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
    async authenticateCompany(email, password) {
        return super.authenticate(email, password, this.tableName);
    }
    async deleteCompany(id) {
        return super.delete(id, this.tableName);
    }
    async update(company) {
        const { id, name, industry, description, email, password } = company;
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
