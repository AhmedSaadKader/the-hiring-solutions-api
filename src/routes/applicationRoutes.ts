import { Router } from 'express';
import {
  getAllApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  getUserApplications
} from '../controllers/applicationControllers';
import {
  checkApplicationOwnershipOrAdmin,
  checkRole
} from '../middleware/checkRole';
import auth from '../middleware/auth';

const router = Router();

router.use(auth);

router.post('/', createApplication);

router.delete('/:applicationId', deleteApplication);

router.get('/allApplications', checkRole(['admin']), getAllApplications);

router.get(
  '/user',
  checkRole(['recruiter', 'candidate', 'company']),
  getUserApplications
);

router.get('/applicationId', checkApplicationOwnershipOrAdmin, getApplication);

export default router;
