import { connectionSQLResult } from './helpers/sql_query';

export type CandidateSkill = {
  skill_id: number;
  candidate_id: number;
};

export class CandidateSkillModel {
  async index(): Promise<CandidateSkill[]> {
    try {
      const sql = 'SELECT * FROM candidate_skills';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find candidate_skills. Error: ${err}`);
    }
  }

  async show(skill_id: number, candidate_id: number): Promise<CandidateSkill> {
    try {
      const sql =
        'SELECT * FROM candidate_skills WHERE skill_id=($1) AND candidate_id=($2)';
      const result = await connectionSQLResult(sql, [skill_id, candidate_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find candidate_skill. Error: ${err}`);
    }
  }

  async create(
    skill_id: number,
    candidate_id: number
  ): Promise<CandidateSkill> {
    try {
      const sql =
        'INSERT INTO candidate_skills (skill_id, candidate_id) VALUES ($1, $2) RETURNING *';
      const result = await connectionSQLResult(sql, [skill_id, candidate_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create candidate_skill. Error: ${err}`);
    }
  }

  async delete(skill_id: number, candidate_id: number): Promise<undefined> {
    try {
      const sql =
        'DELETE FROM candidate_skills WHERE skill_id=($1) AND candidate_id=($2)';
      const result = await connectionSQLResult(sql, [skill_id, candidate_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete candidate_skill. Error: ${err}`);
    }
  }
}
