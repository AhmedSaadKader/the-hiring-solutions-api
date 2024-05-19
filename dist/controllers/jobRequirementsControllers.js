"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobRequirement = exports.createJobRequirement = exports.getJobRequirement = exports.getAllJobRequirements = void 0;
const Job_requirements_1 = require("../models/Job_requirements");
const jobRequirement = new Job_requirements_1.JobRequirementModel();
const getAllJobRequirements = async (_req, res, next) => {
    try {
        const allJobRequirements = await jobRequirement.index();
        res.json(allJobRequirements);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllJobRequirements = getAllJobRequirements;
const getJobRequirement = async (req, res, next) => {
    try {
        const result = await jobRequirement.show(parseInt(req.params.skillId), parseInt(req.params.jobId));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getJobRequirement = getJobRequirement;
const createJobRequirement = async (req, res, next) => {
    const JobRequirementData = req.body;
    try {
        if (!JobRequirementData.name) {
            throw new Error('JobRequirement name is required');
        }
        const newJobRequirement = await jobRequirement.create(parseInt(req.params.skillId), parseInt(req.params.jobId));
        res.json(newJobRequirement);
    }
    catch (error) {
        next(error);
    }
};
exports.createJobRequirement = createJobRequirement;
const deleteJobRequirement = async (req, res, next) => {
    try {
        const result = await jobRequirement.delete(parseInt(req.params.skillId), parseInt(req.params.jobId));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteJobRequirement = deleteJobRequirement;
