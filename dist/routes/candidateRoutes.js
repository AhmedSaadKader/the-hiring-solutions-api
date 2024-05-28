"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateControllers_1 = require("../controllers/candidateControllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const checkRole_1 = require("../middleware/checkRole");
const router = (0, express_1.Router)();
router.post('/login', candidateControllers_1.loginCandidate);
router.post('/', candidateControllers_1.createCandidate);
router.get('/:id', candidateControllers_1.getCandidate);
router.use(auth_1.default);
router.get('/', (0, checkRole_1.checkRole)(['admin']), candidateControllers_1.getAllCandidates);
router.delete('/:id', candidateControllers_1.deleteCandidate);
router.patch('/:id', candidateControllers_1.updateCandidate);
exports.default = router;
