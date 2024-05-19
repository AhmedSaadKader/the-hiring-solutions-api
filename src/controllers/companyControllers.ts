import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Company, CompanyModel } from '../models/Company';

const company = new CompanyModel();

export const getAllCompanies = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCompanies = await company.index();
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
    const result = await company.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
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
    const result = await company.delete(parseInt(req.params.id));
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
    const result = await company.show(parseInt(req.params.id));
    const newName = req.body.name || result.name;
    const industry = req.body.industry || result.industry;
    const description = req.body.description || result.description;
    const newEmail = req.body.email || result.email;
    const newPassword = req.body.password || result.password;
    const newCompany = await company.update(
      parseInt(req.params.id),
      newName,
      industry,
      description,
      newEmail,
      newPassword
    );
    res.json(newCompany);
  } catch (error) {
    next(error);
  }
};
