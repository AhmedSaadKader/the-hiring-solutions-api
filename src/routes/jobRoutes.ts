import { Router } from 'express';
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob
} from '../controllers/jobControllers';

const router = Router();

router.get('/', getAllJobs);

router.get('/:id', getJob);

router.post('/', createJob);

router.delete('/:id', deleteJob);

router.patch('/:id', updateJob);

export default router;
