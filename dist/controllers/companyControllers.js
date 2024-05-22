"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.deleteCompany = exports.createCompany = exports.getCompany = exports.getAllCompanies = void 0;
const Company_1 = require("../models/Company");
const company = new Company_1.CompanyModel();
const getAllCompanies = async (_req, res, next) => {
    try {
        const allCompanies = await company.indexCompany();
        res.json(allCompanies);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCompanies = getAllCompanies;
const getCompany = async (req, res, next) => {
    try {
        const result = await company.showCompany(parseInt(req.params.id));
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
        const result = await company.deleteCompany(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCompany = deleteCompany;
const updateCompany = async (req, res, next) => {
    try {
        const result = await company.showCompany(parseInt(req.params.id));
        const updatedCompany = {
            ...result,
            name: req.body.name || result.name,
            industry: req.body.industry || result.industry,
            description: req.body.description || result.description,
            email: req.body.email || result.email,
            password: req.body.password || result.password
        };
        const newCompany = await company.update(updatedCompany);
        res.json(newCompany);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCompany = updateCompany;
