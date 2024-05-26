"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = require("../controllers/adminControllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const checkRole_1 = require("../middleware/checkRole");
const router = (0, express_1.Router)();
router.post('/login', adminControllers_1.loginAdmin);
router.use(auth_1.default);
router.get('/', (0, checkRole_1.checkRole)(['admin']), adminControllers_1.getAllAdmins);
router.get('/:id', (0, checkRole_1.checkRole)(['admin']), adminControllers_1.getAdmin);
router.post('/', (0, checkRole_1.checkRole)(['admin']), adminControllers_1.createAdmin);
router.delete('/:id', (0, checkRole_1.checkRole)(['admin']), adminControllers_1.deleteAdmin);
router.patch('/:id', (0, checkRole_1.checkRole)(['admin']), adminControllers_1.updateAdmin);
exports.default = router;
