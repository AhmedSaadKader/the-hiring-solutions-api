import { Router } from 'express';
import {
  createRecruiter,
  loginRecruiter,
  deleteRecruiter,
  getAllRecruiters,
  getRecruiter,
  updateRecruiter
} from '../controllers/recruiterControllers';

const router = Router();

router.post('/login', loginRecruiter);

router.get('/', getAllRecruiters);

router.get('/:id', getRecruiter);

router.post('/', createRecruiter);

router.delete('/:id', deleteRecruiter);

router.patch('/:id', updateRecruiter);

export default router;
