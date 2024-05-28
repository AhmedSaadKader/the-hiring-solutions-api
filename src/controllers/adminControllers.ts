import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Admin, AdminModel } from '../models/Admin';
import jwt from 'jsonwebtoken';
import { BaseUser } from '../models/Base_model';

const admin = new AdminModel();

export const getAllAdmins = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allAdmins = await admin.indexAdmin();
    res.json(allAdmins);
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await admin.showAdmin(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const adminData: Admin = req.body;
  try {
    const newAdmin = await admin.create(adminData);
    const token = jwt.sign(
      { admin: newAdmin },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (
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
    console.log('login admin');
    const createdAdmin = await admin.authenticate(
      email,
      password,
      admin.tableName
    );
    console.log('createdadmin: ', createdAdmin);
    const token = admin.generateJWT(createdAdmin as Admin);
    res.json({
      token,
      email: (createdAdmin as Admin).email,
      id: (createdAdmin as Admin).id,
      role: (createdAdmin as Admin).role
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteAdmin = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await admin.deleteAdmin(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await admin.showAdmin(parseInt(req.params.id));
    const updatedAdmin: Admin = {
      ...result,
      name: req.body.name || result.name,
      email: req.body.email || result.email,
      password_digest: req.body.password || result.password_digest
    };
    const newAdmin = await admin.update(updatedAdmin);
    res.json(newAdmin);
  } catch (error) {
    next(error);
  }
};
