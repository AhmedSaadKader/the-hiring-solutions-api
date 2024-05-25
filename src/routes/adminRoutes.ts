import { Router } from 'express';
import {
  createAdmin,
  loginAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin
} from '../controllers/adminControllers';

const router = Router();

router.post('/login', loginAdmin);

router.get('/', getAllAdmins);

router.get('/:id', getAdmin);

router.post('/', createAdmin);

router.delete('/:id', deleteAdmin);

router.patch('/:id', updateAdmin);

export default router;
