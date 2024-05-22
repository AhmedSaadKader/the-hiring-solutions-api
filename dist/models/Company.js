"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const Base_model_1 = require("./Base_model");
class CompanyModel extends Base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.tableName = 'companies';
    }
    async index() {
        return super.index(this.tableName);
    }
    async show(id) {
        return super.show(id, this.tableName);
    }
    async create(company) {
        return super.create(company, this.tableName);
    }
    async authenticate(email, password) {
        return super.authenticate(email, password, this.tableName);
    }
    async delete(id) {
        return super.delete(id, this.tableName);
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
