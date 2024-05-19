import { connectionSQLResult } from './helpers/sql_query';

export type JobRequirement = {
  skill_id: number;
  job_id: number;
};

export class JobRequirementModel {
  async index(): Promise<JobRequirement[]> {
    try {
      const sql = 'SELECT * FROM job_requirements';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find job_requirements. Error: ${err}`);
    }
  }

  async show(skill_id: number, job_id: number): Promise<JobRequirement> {
    try {
      const sql =
        'SELECT * FROM job_requirements WHERE skill_id=($1) AND job_id=($2)';
      const result = await connectionSQLResult(sql, [skill_id, job_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find job_requirement. Error: ${err}`);
    }
  }

  async create(skill_id: number, job_id: number): Promise<JobRequirement> {
    try {
      const sql =
        'INSERT INTO job_requirements (skill_id, job_id) VALUES ($1, $2) RETURNING *';
      const result = await connectionSQLResult(sql, [skill_id, job_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create job_requirement. Error: ${err}`);
    }
  }

  async delete(skill_id: number, job_id: number): Promise<undefined> {
    try {
      const sql =
        'DELETE FROM job_requirements WHERE skill_id=($1) AND job_id=($2)';
      const result = await connectionSQLResult(sql, [skill_id, job_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete job_requirement. Error: ${err}`);
    }
  }
}
