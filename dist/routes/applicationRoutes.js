"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationControllers_1 = require("../controllers/applicationControllers");
const checkRole_1 = require("../middleware/checkRole");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.post('/', applicationControllers_1.createApplication);
router.delete('/:applicationId', applicationControllers_1.deleteApplication);
router.get('/allApplications', (0, checkRole_1.checkRole)(['admin']), applicationControllers_1.getAllApplications);
router.get('/user', (0, checkRole_1.checkRole)(['recruiter', 'candidate', 'company']), applicationControllers_1.getUserApplications);
router.get('/applicationId', checkRole_1.checkApplicationOwnershipOrAdmin, applicationControllers_1.getApplication);
exports.default = router;
