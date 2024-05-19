import { v4 as uuidv4 } from 'uuid';
import { JobStatus } from './Job_status';
import { connectionSQLResult } from './helpers/sql_query';

export type Job = {
  id?: number;
  company_id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  posted_date?: Date;
  status: JobStatus;
};

export class JobModel {
  async index(): Promise<Job[]> {
    try {
      const sql = 'SELECT * FROM jobs';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find jobs. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Job> {
    try {
      const sql = 'SELECT * FROM jobs WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find job ${id}. Error: ${err}`);
    }
  }

  async create(job: Job): Promise<Job> {
    const { company_id, title, description, salary, location, status } = job;
    try {
      const sql =
        'INSERT INTO jobs (company_id, title, description, salary, location, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const result = await connectionSQLResult(sql, [
        company_id,
        title,
        description,
        salary,
        location,
        status
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create job. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<undefined> {
    try {
      const sql = 'DELETE FROM jobs WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete job ${id}. Error: ${err}`);
    }
  }

  async update(
    id: number,
    company_id: number,
    title: string,
    description: string,
    salary: number,
    location: string,
    status: JobStatus
  ): Promise<Job> {
    try {
      const sql =
        'UPDATE jobs SET company_id=($1), title=($2), description=($3), salary=($4), location=($5), status=($6) WHERE id=($7) RETURNING *';
      const result = await connectionSQLResult(sql, [
        company_id,
        title,
        description,
        salary,
        location,
        status,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update job ${id}. Error: ${err}`);
    }
  }
}
