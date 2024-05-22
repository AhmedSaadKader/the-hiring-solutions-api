"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillController_1 = require("../controllers/skillController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.use(auth_1.default);
router.get('/', skillController_1.getAllSkills);
router.get('/:id', skillController_1.getSkill);
router.post('/', skillController_1.createSkill);
router.delete('/:id', skillController_1.deleteSkill);
router.patch('/:id', skillController_1.updateSkill);
exports.default = router;
