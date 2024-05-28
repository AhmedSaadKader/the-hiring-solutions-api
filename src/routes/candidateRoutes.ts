import { Router } from 'express';
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidate,
  loginCandidate,
  updateCandidate
} from '../controllers/candidateControllers';
import auth from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';

const router = Router();

router.post('/login', loginCandidate);

router.post('/', createCandidate);

router.get('/:id', getCandidate);

router.use(auth);

router.get('/', checkRole(['admin']), getAllCandidates);

router.delete('/:id', deleteCandidate);

router.patch('/:id', updateCandidate);

export default router;
