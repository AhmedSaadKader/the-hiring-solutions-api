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
    const { name, phone_no, email, password } = admin;
    const role = Roles.ADMIN;
    try {
      const sql =
        'INSERT INTO admins (role, phone_no, name, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connectionSQLResult(sql, [
        role,
        phone_no,
        name,
        email,
        password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create admin ${name}. Error: ${err}`);
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
