"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplication = exports.deleteApplication = exports.createApplication = exports.getApplication = exports.getUserApplications = exports.getAllApplications = void 0;
const Application_1 = require("../models/Application");
const application = new Application_1.ApplicationModel();
const getAllApplications = async (_req, res, next) => {
    try {
        const allApplications = await application.index();
        res.json(allApplications);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllApplications = getAllApplications;
const getUserApplications = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const userId = req.user.id;
        const userApplications = await application.showUserApplications(userRole, userId);
        res.json(userApplications);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserApplications = getUserApplications;
const getApplication = async (req, res, next) => {
    try {
        const result = await application.show(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getApplication = getApplication;
const createApplication = async (req, res, next) => {
    const applicationData = req.body;
    try {
        const newApplication = await application.create(applicationData);
        res.json(newApplication);
    }
    catch (error) {
        next(error);
    }
};
exports.createApplication = createApplication;
const deleteApplication = async (req, res, next) => {
    try {
        const result = await application.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteApplication = deleteApplication;
const updateApplication = async (req, res, next) => {
    try {
        const result = await application.show(parseInt(req.params.id));
        const job_id = req.body.job_id || result.job_id;
        const candidate_id = req.body.candidate_id || result.candidate_id;
        const recruiter_id = req.body.recruiter_id || result.recruiter_id;
        const status = req.body.status || result.status;
        const applied_date = req.body.applied_date || result.applied_date;
        const reviewed_date = req.body.reviewed_date || result.reviewed_date;
        const notes = req.body.notes || result.notes;
        const newApplication = await application.update(parseInt(req.params.id), job_id, candidate_id, recruiter_id, status, applied_date, reviewed_date, notes);
        res.json(newApplication);
    }
    catch (error) {
        next(error);
    }
};
exports.updateApplication = updateApplication;
