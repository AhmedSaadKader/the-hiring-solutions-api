import { JobStatus } from './Job_status';
import { Roles } from './Roles';
import { connectionSQLResult } from './helpers/sql_query';

export type Application = {
  id?: number;
  job_id: number;
  candidate_id: number;
  recruiter_id: number;
  status: JobStatus;
  applied_date?: Date;
  reviewed_date?: Date | null;
  notes: string;
};

export class ApplicationModel {
  async index(): Promise<Application[]> {
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
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find applications. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Application> {
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
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find application ${id}. Error: ${err}`);
    }
  }

  async showUserApplications(
    userRole: Roles,
    userId: number
  ): Promise<Application[]> {
    try {
      let sql, params;
      if (userRole === Roles.COMPANY) {
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
      } else {
        const field =
          userRole === Roles.RECRUITER ? 'recruiter_id' : 'candidate_id';
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
      const result = await connectionSQLResult(sql, params);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user applications. Error: ${err}`);
    }
  }

  async create(application: Application): Promise<Application> {
    const { job_id, candidate_id, recruiter_id, status, notes } = application;
    try {
      const sql =
        'INSERT INTO applications (job_id, candidate_id, recruiter_id, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connectionSQLResult(sql, [
        job_id,
        candidate_id,
        recruiter_id,
        status,
        notes
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create application. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<undefined> {
    try {
      const sql = 'DELETE FROM applications WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete application ${id}. Error: ${err}`);
    }
  }

  async update(
    id: number,
    job_id: number,
    candidate_id: number,
    recruiter_id: number,
    status: JobStatus,
    applied_date: Date,
    notes: string,
    reviewed_date?: Date
  ): Promise<Application> {
    try {
      const sql =
        'UPDATE applications SET job_id=($1), candidate_id=($2), recruiter_id=($3), status=($4), applied_date=($5), notes=($6), reviewed_date=($7) WHERE id=($8) RETURNING *';
      const result = await connectionSQLResult(sql, [
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
    } catch (err) {
      throw new Error(`Could not update application ${id}. Error: ${err}`);
    }
  }
}
