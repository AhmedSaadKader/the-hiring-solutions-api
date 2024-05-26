import { Router } from 'express';
import {
  createAdmin,
  loginAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin
} from '../controllers/adminControllers';
import auth from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';

const router = Router();

router.post('/login', loginAdmin);

router.use(auth);

router.get('/', checkRole(['admin']), getAllAdmins);

router.get('/:id', checkRole(['admin']), getAdmin);

router.post('/', checkRole(['admin']), createAdmin);

router.delete('/:id', checkRole(['admin']), deleteAdmin);

router.patch('/:id', checkRole(['admin']), updateAdmin);

export default router;
