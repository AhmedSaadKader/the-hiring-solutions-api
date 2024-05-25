import { BaseModel, BaseUser } from './Base_model';
import { Roles } from './Roles';
import { comparePassword } from './helpers/passwordHandler';
import { connectionSQLResult } from './helpers/sql_query';

export type Admin = BaseUser & {
  password_digest?: string;
};

export class AdminModel extends BaseModel {
  tableName = 'admins';

  async indexAdmin(): Promise<Admin[]> {
    return super.index(this.tableName);
  }

  async showAdmin(id: number): Promise<Admin> {
    return super.show(id, this.tableName);
  }

  async create(admin: Admin): Promise<Admin> {
    const { name, email, password } = admin;
    const role = Roles.ADMIN;
    try {
      const sql =
        'INSERT INTO admins (role, name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connectionSQLResult(sql, [
        role,
        name,
        email,
        password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create admin ${name}. Error: ${err}`);
    }
  }

  async emailExists(email: string): Promise<Admin | undefined> {
    const sql = `SELECT * FROM ${this.tableName} WHERE email=($1)`;
    const result = await connectionSQLResult(sql, [email]);
    if (!result.rows.length) {
      return undefined;
    }
    const user = result.rows[0];
    return user;
  }

  async authenticateAdmin(
    email: string,
    password: string
  ): Promise<Admin | string> {
    try {
      const adminAccount = await this.emailExists(email);
      if (!adminAccount) {
        throw new Error('email unavailable');
      }
      if (comparePassword(password, adminAccount.password_digest as string)) {
        throw new Error('password is incorrect');
      }
      return adminAccount;
    } catch (err) {
      throw new Error(`Could not find user ${email}. Error: ${err}`);
    }
  }

  async deleteAdmin<Admin extends BaseUser>(id: number): Promise<Admin | null> {
    return super.delete(id, this.tableName);
  }

  async update(admin: Admin) {
    const { id, name, email, password } = admin;
    try {
      const sql =
        'UPDATE admins SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        email,
        password,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update admin ${id}. Error: ${err}`);
    }
  }
}
