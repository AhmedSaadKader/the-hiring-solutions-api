"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.deleteCompany = exports.createCompany = exports.getCompany = exports.getAllCompanies = void 0;
const Company_1 = require("../models/Company");
const company = new Company_1.CompanyModel();
const getAllCompanies = async (_req, res, next) => {
    try {
        const allCompanies = await company.index();
        res.json(allCompanies);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCompanies = getAllCompanies;
const getCompany = async (req, res, next) => {
    try {
        const result = await company.show(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getCompany = getCompany;
const createCompany = async (req, res, next) => {
    const CompanyData = req.body;
    try {
        const newCompany = await company.create(CompanyData);
        res.json(newCompany);
    }
    catch (error) {
        next(error);
    }
};
exports.createCompany = createCompany;
const deleteCompany = async (req, res, next) => {
    try {
        const result = await company.delete(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCompany = deleteCompany;
const updateCompany = async (req, res, next) => {
    try {
        const result = await company.show(parseInt(req.params.id));
        const newName = req.body.name || result.name;
        const industry = req.body.industry || result.industry;
        const description = req.body.description || result.description;
        const newEmail = req.body.email || result.email;
        const newPassword = req.body.password || result.password;
        const newCompany = await company.update(parseInt(req.params.id), newName, industry, description, newEmail, newPassword);
        res.json(newCompany);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCompany = updateCompany;
