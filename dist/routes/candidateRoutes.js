"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateControllers_1 = require("../controllers/candidateControllers");
const router = (0, express_1.Router)();
router.get('/', candidateControllers_1.getAllCandidates);
router.get('/:id', candidateControllers_1.getCandidate);
router.post('/', candidateControllers_1.createCandidate);
router.delete('/:id', candidateControllers_1.deleteCandidate);
router.patch('/:id', candidateControllers_1.updateCandidate);
exports.default = router;
