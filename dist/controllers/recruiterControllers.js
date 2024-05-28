"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecruiter = exports.deleteRecruiter = exports.loginRecruiter = exports.createRecruiter = exports.getRecruiter = exports.getAllRecruiters = void 0;
const Recruiter_1 = require("../models/Recruiter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const recruiter = new Recruiter_1.RecruiterModel();
const getAllRecruiters = async (_req, res, next) => {
    try {
        const allRecruiters = await recruiter.indexRecruiter();
        res.json(allRecruiters);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllRecruiters = getAllRecruiters;
const getRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.showRecruiter(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getRecruiter = getRecruiter;
const createRecruiter = async (req, res, next) => {
    const recruiterData = req.body;
    try {
        const newRecruiter = await recruiter.create(recruiterData);
        const token = jsonwebtoken_1.default.sign({ recruiter: newRecruiter }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        next(error);
    }
};
exports.createRecruiter = createRecruiter;
const loginRecruiter = async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        throw new Error('Please provide all values');
    }
    try {
        const createdRecruiter = await recruiter.authenticate(email, password, recruiter.tableName);
        const token = recruiter.generateJWT(createdRecruiter);
        res.json({
            token,
            email: createdRecruiter.email,
            id: createdRecruiter.id,
            role: createdRecruiter.role
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.loginRecruiter = loginRecruiter;
const deleteRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.deleteRecruiter(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRecruiter = deleteRecruiter;
const updateRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.showRecruiter(parseInt(req.params.id));
        const updatedRecruiter = {
            ...result,
            name: req.body.name || result.name,
            email: req.body.email || result.email,
            password_digest: req.body.password || result.password_digest
        };
        const newRecruiter = await recruiter.update(updatedRecruiter);
        res.json(newRecruiter);
    }
    catch (error) {
        next(error);
    }
};
exports.updateRecruiter = updateRecruiter;
