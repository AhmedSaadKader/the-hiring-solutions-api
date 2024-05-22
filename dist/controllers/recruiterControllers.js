"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecruiter = exports.deleteRecruiter = exports.createRecruiter = exports.getRecruiter = exports.getAllRecruiters = void 0;
const Recruiter_1 = require("../models/Recruiter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const recruiter = new Recruiter_1.RecruiterModel();
const getAllRecruiters = async (_req, res, next) => {
    try {
        const allRecruiters = await recruiter.index();
        res.json(allRecruiters);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllRecruiters = getAllRecruiters;
const getRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.show(parseInt(req.params.id));
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
const deleteRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRecruiter = deleteRecruiter;
const updateRecruiter = async (req, res, next) => {
    try {
        const result = await recruiter.show(parseInt(req.params.id));
        const newName = req.body.name || result.name;
        const newEmail = req.body.email || result.email;
        const newPassword = req.body.password || result.password_digest;
        const newRecruiter = await recruiter.update(parseInt(req.params.id), newName, newEmail, newPassword);
        res.json(newRecruiter);
    }
    catch (error) {
        next(error);
    }
};
exports.updateRecruiter = updateRecruiter;
