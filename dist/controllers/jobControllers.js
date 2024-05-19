"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.deleteJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const Job_1 = require("../models/Job");
const job = new Job_1.JobModel();
const getAllJobs = async (_req, res, next) => {
    try {
        const allJobs = await job.index();
        res.json(allJobs);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllJobs = getAllJobs;
const getJob = async (req, res, next) => {
    try {
        const result = await job.show(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getJob = getJob;
const createJob = async (req, res, next) => {
    const JobData = req.body;
    try {
        const newJob = await job.create(JobData);
        res.json(newJob);
    }
    catch (error) {
        next(error);
    }
};
exports.createJob = createJob;
const deleteJob = async (req, res, next) => {
    try {
        const result = await job.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteJob = deleteJob;
const updateJob = async (req, res, next) => {
    try {
        const result = await job.show(parseInt(req.params.id));
        const company_id = req.body.company_id || result.company_id;
        const title = req.body.title || result.title;
        const description = req.body.description || result.description;
        const salary = req.body.salary || result.salary;
        const location = req.body.location || result.location;
        const posted_date = req.body.posted_date || result.posted_date;
        const status = req.body.status || result.status;
        const newJob = await job.update(parseInt(req.params.id), company_id, title, description, salary, location, status);
        res.json(newJob);
    }
    catch (error) {
        next(error);
    }
};
exports.updateJob = updateJob;
