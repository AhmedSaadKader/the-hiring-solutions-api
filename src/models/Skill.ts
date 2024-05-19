import { connectionSQLResult } from './helpers/sql_query';

export type Skill = {
  id?: number;
  name: string;
};

export class SkillModel {
  async index(): Promise<Skill[]> {
    try {
      const sql = 'SELECT * FROM skills';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find skills. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Skill> {
    try {
      const sql = 'SELECT * FROM skills WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find skill ${id}. Error: ${err}`);
    }
  }

  async create(skill: Skill): Promise<Skill> {
    const { name } = skill;
    try {
      const sql = 'INSERT INTO skills (name) VALUES ($1) RETURNING *';
      const result = await connectionSQLResult(sql, [name]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create skill ${name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<undefined> {
    try {
      const sql = 'DELETE FROM skills WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete skill ${id}. Error: ${err}`);
    }
  }

  async update(id: number, name: string): Promise<Skill> {
    try {
      const sql = 'UPDATE skills SET name=($1) WHERE id=($2) RETURNING *';
      const result = await connectionSQLResult(sql, [name, id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update skill ${id}. Error: ${err}`);
    }
  }
}
