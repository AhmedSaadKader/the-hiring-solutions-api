import { Roles } from './Roles';
import { hashPassword, comparePassword } from './helpers/passwordHandler';
import { connectionSQLResult } from './helpers/sql_query';
import jwt from 'jsonwebtoken';

export type BaseUser = {
  id?: number;
  role?: Roles;
  name: string;
  email: string;
  password: string;
};

export class BaseModel {
  async index<T extends BaseUser>(tableName: string): Promise<T[]> {
    try {
      const sql = `SELECT * FROM ${tableName}`;
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find ${tableName}. Error: ${err}`);
    }
  }

  async show<T extends BaseUser>(id: number, tableName: string): Promise<T> {
    try {
      const sql = `SELECT * FROM ${tableName} WHERE id=($1)`;
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find ${tableName} with the id: ${id}. Error: ${err}`
      );
    }
  }

  async authenticate<T extends BaseUser>(
    email: string,
    password: string,
    tableName: string
  ): Promise<T | null> {
    const sql = `SELECT password_digest FROM ${tableName} WHERE email=($1)`;
    const result = await connectionSQLResult(sql, [email]);

    if (result.rows.length) {
      const baseUser = result.rows[0];
      if (comparePassword(password, baseUser.password_digest)) {
        return baseUser;
      }
    }
    return null;
  }

  generateJWT(user: BaseUser): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: '1h'
      }
    );
  }

  async delete<T extends BaseUser>(
    id: number,
    tableName: string
  ): Promise<T | null> {
    try {
      const sql = `DELETE FROM ${tableName} WHERE id=($1)`;
      const result = await connectionSQLResult(sql, [id]);
      return null;
    } catch (err) {
      throw new Error(
        `Could not delete ${tableName} where id is ${id}. Error: ${err}`
      );
    }
  }

  //   async update<T extends BaseUser>(user: T, tableName: string): Promise<T> {
  //     const { id, name, email, password } = user;
  //     try {
  //       const sql = `UPDATE ${tableName} SET name=($1), email=($2), password_digest=($3) WHERE id=($4) RETURNING *`;
  //       const result = await connectionSQLResult(sql, [
  //         name,
  //         email,
  //         password,
  //         id
  //       ]);
  //       return result.rows[0];
  //     } catch (err) {
  //       throw new Error(
  //         `Could not update ${tableName} where id is ${id}. Error: ${err}`
  //       );
  //     }
  //   }
}
