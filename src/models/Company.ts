import { BaseModel, BaseUser } from './Base_model';
import { connectionSQLResult } from './helpers/sql_query';

export type Company = BaseUser & {
  name: string;
  industry: string;
  description: string;
};

export class CompanyModel extends BaseModel {
  tableName = 'companies';

  async index<Company extends BaseUser>(): Promise<Company[]> {
    return super.index<Company>(this.tableName);
  }

  async show<Company extends BaseUser>(id: number): Promise<Company> {
    return super.show<Company>(id, this.tableName);
  }

  async create<Company extends BaseUser>(company: Company): Promise<Company> {
    return super.create<Company>(company, this.tableName);
  }
  async authenticate<Copmany extends BaseUser>(
    email: string,
    password: string
  ) {
    return super.authenticate<Copmany>(email, password, this.tableName);
  }

  async delete<Copmany extends BaseUser>(id: number): Promise<Copmany> {
    return super.delete<Copmany>(id, this.tableName);
  }

  async update(id, name, industry, description, email, password) {
    try {
      const sql =
        'UPDATE companies SET name=($1), industry=($2), description=($3), email=($4), password=($5) WHERE id=($6) RETURNING *';
      const result = await (0, sql_query_1.connectionSQLResult)(sql, [
        name,
        industry,
        description,
        email,
        password,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update company ${id}. Error: ${err}`);
    }
  }
}
