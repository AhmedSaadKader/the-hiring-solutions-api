import { Router } from 'express';
import {
  getAllApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/applicationControllers';

const router = Router();

router.get('/', getAllApplications);

router.get('/applicationId', getApplication);

router.post('/', createApplication);

router.delete('/:applicationId', deleteApplication);

export default router;
