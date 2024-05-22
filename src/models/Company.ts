import { BaseModel, BaseUser } from './Base_model';
import { connectionSQLResult } from './helpers/sql_query';

export type Company = BaseUser & {
  name: string;
  industry: string;
  description: string;
  password_digest?: string;
};

export class CompanyModel extends BaseModel {
  tableName = 'companies';

  async indexCompany(): Promise<Company[]> {
    return super.index<Company>(this.tableName);
  }

  async showCompany(id: number): Promise<Company> {
    return super.show<Company>(id, this.tableName);
  }

  async create(company: Company): Promise<Company> {
    const { name, industry, description, email, password } = company;
    try {
      const sql =
        'INSERT INTO companies (name, industry, description, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        industry,
        description,
        email,
        password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create company ${name}. Error: ${err}`);
    }
  }

  async authenticateCompany<Copmany extends BaseUser>(
    email: string,
    password: string
  ) {
    return super.authenticate<Copmany>(email, password, this.tableName);
  }

  async deleteCompany<Copmany extends BaseUser>(
    id: number
  ): Promise<Copmany | null> {
    return super.delete<Copmany>(id, this.tableName);
  }

  async update(company: Company) {
    const { id, name, industry, description, email, password } = company;
    try {
      const sql =
        'UPDATE companies SET name=($1), industry=($2), description=($3), email=($4), password=($5) WHERE id=($6) RETURNING *';
      const result = await connectionSQLResult(sql, [
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
