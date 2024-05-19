"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCandidateSkill = exports.createCandidateSkill = exports.getCandidateSkill = exports.getAllCandidateSkills = void 0;
const Candidate_skill_1 = require("../models/Candidate_skill");
const candidateSkill = new Candidate_skill_1.CandidateSkillModel();
const getAllCandidateSkills = async (_req, res, next) => {
    try {
        const allCandidateSkills = await candidateSkill.index();
        res.json(allCandidateSkills);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCandidateSkills = getAllCandidateSkills;
const getCandidateSkill = async (req, res, next) => {
    try {
        const result = await candidateSkill.show(parseInt(req.params.candidateId), parseInt(req.params.skillId));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidateSkill = getCandidateSkill;
const createCandidateSkill = async (req, res, next) => {
    const candidateSkillData = req.body;
    try {
        if (!candidateSkillData.skillId) {
            throw new Error('CandidateSkill skillId is required');
        }
        const newCandidateSkill = await candidateSkill.create(parseInt(candidateSkillData.skillId), parseInt(candidateSkillData.candidateId));
        res.json(newCandidateSkill);
    }
    catch (error) {
        next(error);
    }
};
exports.createCandidateSkill = createCandidateSkill;
const deleteCandidateSkill = async (req, res, next) => {
    try {
        const result = await candidateSkill.delete(parseInt(req.params.candidateId), parseInt(req.params.skillId));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCandidateSkill = deleteCandidateSkill;
