"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const Roles_1 = require("./Roles");
const sql_query_1 = require("./helpers/sql_query");
class ApplicationModel {
    async index() {
        try {
            const sql = `
		SELECT 
		a.*, 
		c.name AS candidate_name, 
		c.email AS candidate_email,
		r.name AS recruiter_name,
		r.email AS recruiter_email,
		j.title AS job_title,
		j.company_id, comp.name AS company_name
		FROM applications a
		JOIN jobs j ON a.job_id = j.id
		JOIN candidates c ON a.candidate_id = c.id
		JOIN recruiters r ON a.recruiter_id = r.id
		JOIN companies comp ON j.company_id = comp.id
		  `;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, []);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find applications. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = `
			SELECT 
			a.*, 
			c.name AS candidate_name, 
			c.email AS candidate_email,
			r.name AS recruiter_name,
			r.email AS recruiter_email,
			j.title AS job_title,
			j.company_id, comp.name AS company_name
			FROM applications a
			JOIN jobs j ON a.job_id = j.id
			JOIN candidates c ON a.candidate_id = c.id
			JOIN recruiters r ON a.recruiter_id = r.id
			JOIN companies comp ON j.company_id = comp.id
			WHERE a.id = $1
		  `;
            const result = await (0, sql_query_1.connectionSQLResult)(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find application ${id}. Error: ${err}`);
        }
    }
    async showUserApplications(userRole, userId) {
        try {
            let sql, params;
            if (userRole === Roles_1.Roles.COMPANY) {
                sql = `
			SELECT 
			a.*, 
			c.name AS candidate_name, 
			c.email AS candidate_email,
			r.name AS recruiter_name,
			r.email AS recruiter_email,
			j.title AS job_title,
			j.company_id, comp.name AS company_name
			FROM applications a
			JOIN jobs j ON a.job_id = j.id
			JOIN candidates c ON a.candidate_id = c.id
			JOIN recruiters r ON a.recruiter_id = r.id
			JOIN companies comp ON j.company_id = comp.id
			WHERE j.company_id = $1
			`;
                params = [userId];
            }
            else {
                const field = userRole === Roles_1.Roles.RECRUITER ? 'recruiter_id' : 'candidate_id';
                sql = `
			SELECT 
			a.*, 
			c.name AS candidate_name, 
			c.email AS candidate_email,
			r.name AS recruiter_name,
			r.email AS recruiter_email,
			j.title AS job_title,
			j.company_id,
			comp.name AS company_name
			FROM applications a
			JOIN jobs j ON a.job_id = j.id
			JOIN candidates c ON a.candidate_id = c.id
			JOIN recruiters r ON a.recruiter_id = r.id
			JOIN companies comp ON j.company_id = comp.id
			WHERE a.${field} = $1
			`;
                params = [userId];
            }
            const result = await (0, sql_query_1.connectionSQLResult)(sql, params);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get user applications. Error: ${err}`);
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
