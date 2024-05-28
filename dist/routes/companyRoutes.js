"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyControllers_1 = require("../controllers/companyControllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const checkRole_1 = require("../middleware/checkRole");
const router = (0, express_1.Router)();
router.post('/login', companyControllers_1.loginCompany);
router.post('/', companyControllers_1.createCompany);
router.use(auth_1.default);
router.get('/', (0, checkRole_1.checkRole)(['admin']), companyControllers_1.getAllCompanies);
router.get('/:id', (0, checkRole_1.checkRole)(['admin']), companyControllers_1.getCompany);
router.delete('/:id', companyControllers_1.deleteCompany);
router.patch('/:id', companyControllers_1.updateCompany);
exports.default = router;
