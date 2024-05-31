"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.deleteCompany = exports.createCompany = exports.loginCompany = exports.getCompany = exports.getAllCompanies = void 0;
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
const loginCompany = async (req, res, next) => {
    console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        throw new Error('Please provide all values');
    }
    try {
        console.log('login Company');
        const createdCompany = await company.authenticate(email, password, company.tableName);
        console.log('createdCompany: ', createdCompany);
        const token = company.generateJWT(createdCompany);
        res.json({
            token,
            email: createdCompany.email,
            id: createdCompany.id?.toString(),
            role: createdCompany.role
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.loginCompany = loginCompany;
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
