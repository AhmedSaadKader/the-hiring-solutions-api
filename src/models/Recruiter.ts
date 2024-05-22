import { BaseModel, BaseUser } from './Base_model';
import { Roles } from './Roles';
import { comparePassword } from './helpers/passwordHandler';
import { connectionSQLResult } from './helpers/sql_query';

export type Recruiter = BaseUser & {
  password_digest?: string;
};

export class RecruiterModel extends BaseModel {
  tableName = 'recruiters';
  async indexRecruiter(): Promise<Recruiter[]> {
    return super.index(this.tableName);
  }

  async showRecruiter(id: number): Promise<Recruiter> {
    return super.show(id, this.tableName);
  }

  async create(recruiter: Recruiter): Promise<Recruiter> {
    const { role = Roles.RECRUITER, name, email, password } = recruiter;
    try {
      const sql =
        'INSERT INTO recruiters (role, name, email, password_digest) VALUES ($1, $2, $3) RETURNING *';
      const result = await connectionSQLResult(sql, [
        role,
        name,
        email,
        password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create recruiter ${name}. Error: ${err}`);
    }
  }

  async emailExists(email: string): Promise<Recruiter | undefined> {
    const sql = `SELECT * FROM ${this.tableName} WHERE email=($1)`;
    const result = await connectionSQLResult(sql, [email]);
    if (!result.rows.length) {
      return undefined;
    }
    const user = result.rows[0];
    return user;
  }

  async authenticateRecruiter(
    email: string,
    password: string
  ): Promise<Recruiter | string> {
    try {
      const recruiterAccount = await this.emailExists(email);
      if (!recruiterAccount) {
        throw new Error('email unavailable');
      }
      if (
        comparePassword(password, recruiterAccount.password_digest as string)
      ) {
        throw new Error('password is incorrect');
      }
      return recruiterAccount;
    } catch (err) {
      throw new Error(`Could not find user ${email}. Error: ${err}`);
    }
  }

  async deleteRecruiter<Recruiter extends BaseUser>(
    id: number
  ): Promise<Recruiter | null> {
    return super.delete(id, this.tableName);
  }

  async update(recruiter: Recruiter) {
    const { id, name, email, password } = recruiter;
    try {
      const sql =
        'UPDATE recruiters SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
      const result = await connectionSQLResult(sql, [
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
