"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkill = exports.deleteSkill = exports.createSkill = exports.getSkill = exports.getAllSkills = void 0;
const Skill_1 = require("../models/Skill");
const skill = new Skill_1.SkillModel();
const getAllSkills = async (_req, res, next) => {
    try {
        const allSkills = await skill.index();
        res.json(allSkills);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllSkills = getAllSkills;
const getSkill = async (req, res, next) => {
    try {
        const result = await skill.show(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getSkill = getSkill;
const createSkill = async (req, res, next) => {
    const skillData = req.body;
    try {
        if (!skillData.name) {
            throw new Error('Skill name is required');
        }
        const newSkill = await skill.create(skillData);
        res.json(newSkill);
    }
    catch (error) {
        next(error);
    }
};
exports.createSkill = createSkill;
const deleteSkill = async (req, res, next) => {
    try {
        const result = await skill.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkill = deleteSkill;
const updateSkill = async (req, res, next) => {
    try {
        const result = await skill.show(parseInt(req.params.id));
        const newName = req.body.name || result.name;
        const newSkill = await skill.update(parseInt(req.params.id), newName);
        res.json(newSkill);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSkill = updateSkill;
