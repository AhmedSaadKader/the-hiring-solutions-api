"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCandidate = exports.deleteCandidate = exports.createCandidate = exports.getCandidate = exports.getAllCandidates = void 0;
const Candidate_1 = require("../models/Candidate");
const candidate = new Candidate_1.CandidateModel();
const getAllCandidates = async (_req, res, next) => {
    try {
        const allCandidates = await candidate.index();
        res.json(allCandidates);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCandidates = getAllCandidates;
const getCandidate = async (req, res, next) => {
    try {
        const result = await candidate.show(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidate = getCandidate;
const createCandidate = async (req, res, next) => {
    const candidateData = req.body;
    try {
        const newCandidate = await candidate.create(candidateData);
        res.json(newCandidate);
    }
    catch (error) {
        next(error);
    }
};
exports.createCandidate = createCandidate;
const deleteCandidate = async (req, res, next) => {
    try {
        const result = await candidate.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCandidate = deleteCandidate;
const updateCandidate = async (req, res, next) => {
    try {
        const result = await candidate.show(parseInt(req.params.id));
        const newName = req.body.name || result.name;
        const newEmail = req.body.email || result.email;
        const newPassword = req.body.password || result.password;
        const resume = req.body.resume || result.resume;
        const experience = req.body.experience || result.experience;
        const newCandidate = await candidate.update(parseInt(req.params.id), newName, newEmail, newPassword, resume, experience);
        res.json(newCandidate);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCandidate = updateCandidate;
