"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCandidate = exports.deleteCandidate = exports.createCandidate = exports.loginCandidate = exports.getCandidate = exports.getAllCandidates = void 0;
const Candidate_1 = require("../models/Candidate");
const candidateModel = new Candidate_1.CandidateModel();
const getAllCandidates = async (_req, res, next) => {
    try {
        const allCandidates = await candidateModel.indexCandidate();
        res.json(allCandidates);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCandidates = getAllCandidates;
const getCandidate = async (req, res, next) => {
    try {
        const result = await candidateModel.showCandidate(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidate = getCandidate;
const loginCandidate = async (req, res, next) => {
    console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        throw new Error('Please provide all values');
    }
    try {
        const createdCandidate = await candidateModel.authenticate(email, password, candidateModel.tableName);
        const token = candidateModel.generateJWT(createdCandidate);
        res.json({
            token,
            email: createdCandidate.email,
            id: createdCandidate.id?.toString(),
            role: createdCandidate.role
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.loginCandidate = loginCandidate;
const createCandidate = async (req, res, next) => {
    const candidateData = req.body;
    try {
        const newCandidate = await candidateModel.create(candidateData);
        res.json(newCandidate);
    }
    catch (error) {
        next(error);
    }
};
exports.createCandidate = createCandidate;
const deleteCandidate = async (req, res, next) => {
    try {
        const result = await candidateModel.deleteCandidate(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCandidate = deleteCandidate;
const updateCandidate = async (req, res, next) => {
    try {
        const result = await candidateModel.showCandidate(parseInt(req.params.id));
        const updatedCandidate = {
            ...result,
            name: req.body.name || result.name,
            email: req.body.email || result.email,
            password: req.body.password || result.password,
            resume: req.body.resume || result.resume,
            experience: req.body.experience || result.experience
        };
        const newCandidate = await candidateModel.update(updatedCandidate);
        res.json(newCandidate);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCandidate = updateCandidate;
