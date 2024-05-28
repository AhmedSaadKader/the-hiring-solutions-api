import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Company, CompanyModel } from '../models/Company';
import { BaseUser } from '../models/Base_model';

const company = new CompanyModel();

export const getAllCompanies = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCompanies = await company.indexCompany();
    res.json(allCompanies);
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await company.showCompany(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const loginCompany = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.body);
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new Error('Please provide all values');
  }
  try {
    console.log('login Company');
    const createdCompany = await company.authenticate(
      email,
      password,
      company.tableName
    );
    console.log('createdCompany: ', createdCompany);
    const token = company.generateJWT(createdCompany as BaseUser);
    res.json({
      token,
      email: (createdCompany as BaseUser).email,
      id: (createdCompany as BaseUser).id,
      role: (createdCompany as BaseUser).role
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const createCompany = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const CompanyData: Company = req.body;
  try {
    const newCompany = await company.create(CompanyData);
    res.json(newCompany);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await company.deleteCompany(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await company.showCompany(parseInt(req.params.id));
    const updatedCompany: Company = {
      ...result,
      name: req.body.name || result.name,
      industry: req.body.industry || result.industry,
      description: req.body.description || result.description,
      email: req.body.email || result.email,
      password: req.body.password || result.password
    };
    const newCompany = await company.update(updatedCompany);
    res.json(newCompany);
  } catch (error) {
    next(error);
  }
};
