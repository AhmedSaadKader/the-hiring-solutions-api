import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Candidate, CandidateModel } from '../models/Candidate';

const candidate = new CandidateModel();

export const getAllCandidates = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCandidates = await candidate.index();
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
    const result = await candidate.show(parseInt(req.params.id));
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
    const newCandidate = await candidate.create(candidateData);
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
    const result = await candidate.delete(parseInt(req.params.id));
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
    const result = await candidate.show(parseInt(req.params.id));
    const newName = req.body.name || result.name;
    const newEmail = req.body.email || result.email;
    const newPassword = req.body.password || result.password;
    const resume = req.body.resume || result.resume;
    const experience = req.body.experience || result.experience;
    const newCandidate = await candidate.update(
      parseInt(req.params.id),
      newName,
      newEmail,
      newPassword,
      resume,
      experience
    );
    res.json(newCandidate);
  } catch (error) {
    next(error);
  }
};
