import { BaseModel, BaseUser } from './Base_model';

export type Recruiter = BaseUser & {
  password_digest?: string;
};

export class RecruiterModel extends BaseModel {
  tableName = 'recruiters';
  async index<Recruiter extends BaseUser>(): Promise<Recruiter[]> {
    return super.index(this.tableName);
  }

  async show<Recruiter extends BaseUser>(id: number): Promise<Recruiter> {
    return super.show(id, this.tableName);
  }

  async create<Recruiter extends BaseUser>(
    recruiter: Recruiter
  ): Promise<Recruiter> {
    return super.create(recruiter, this.tableName);
  }

  async delete<Recruiter extends BaseUser>(id: number): Promise<Recruiter> {
    return super.delete(id, this.tableName);
  }

  async update(id, name, email, password) {
    try {
      const sql =
        'UPDATE recruiters SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
      const result = await (0, sql_query_1.connectionSQLResult)(sql, [
        name,
        email,
        password,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update recruiter ${id}. Error: ${err}`);
    }
  }
}
