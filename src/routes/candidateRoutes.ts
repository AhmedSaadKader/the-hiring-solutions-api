import { Router } from 'express';
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidate,
  updateCandidate
} from '../controllers/candidateControllers';

const router = Router();

router.get('/', getAllCandidates);

router.get('/:id', getCandidate);

router.post('/', createCandidate);

router.delete('/:id', deleteCandidate);

router.patch('/:id', updateCandidate);

export default router;
