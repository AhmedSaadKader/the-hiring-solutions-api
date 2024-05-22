import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Candidate, CandidateModel } from '../models/Candidate';

const candidateModel = new CandidateModel();

export const getAllCandidates = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCandidates = await candidateModel.indexCandidate();
    res.json(allCandidates);
  } catch (error) {
    next(error);
  }
};

export const getCandidate = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await candidateModel.showCandidate(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCandidate = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const candidateData: Candidate = req.body;
  try {
    const newCandidate = await candidateModel.create(candidateData);
    res.json(newCandidate);
  } catch (error) {
    next(error);
  }
};

export const deleteCandidate = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await candidateModel.deleteCandidate(
      parseInt(req.params.id)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await candidateModel.showCandidate(parseInt(req.params.id));
    const updatedCandidate: Candidate = {
      ...result,
      name: req.body.name || result.name,
      email: req.body.email || result.email,
      password: req.body.password || result.password,
      resume: req.body.resume || result.resume,
      experience: req.body.experience || result.experience
    };
    const newCandidate = await candidateModel.update(updatedCandidate);
    res.json(newCandidate);
  } catch (error) {
    next(error);
  }
};
