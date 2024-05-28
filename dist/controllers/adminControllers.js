"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = exports.deleteAdmin = exports.loginAdmin = exports.createAdmin = exports.getAdmin = exports.getAllAdmins = void 0;
const Admin_1 = require("../models/Admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin = new Admin_1.AdminModel();
const getAllAdmins = async (_req, res, next) => {
    try {
        const allAdmins = await admin.indexAdmin();
        res.json(allAdmins);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllAdmins = getAllAdmins;
const getAdmin = async (req, res, next) => {
    try {
        const result = await admin.showAdmin(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getAdmin = getAdmin;
const createAdmin = async (req, res, next) => {
    const adminData = req.body;
    try {
        const newAdmin = await admin.create(adminData);
        const token = jsonwebtoken_1.default.sign({ admin: newAdmin }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        next(error);
    }
};
exports.createAdmin = createAdmin;
const loginAdmin = async (req, res, next) => {
    console.log(req.body);
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        throw new Error('Please provide all values');
    }
    try {
        console.log('login admin');
        const createdAdmin = await admin.authenticate(email, password, admin.tableName);
        console.log('createdadmin: ', createdAdmin);
        const token = admin.generateJWT(createdAdmin);
        res.json({
            token,
            email: createdAdmin.email,
            id: createdAdmin.id,
            role: createdAdmin.role
        });
    }
    catch (error) {
        res.status(400);
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
const deleteAdmin = async (req, res, next) => {
    try {
        const result = await admin.deleteAdmin(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAdmin = deleteAdmin;
const updateAdmin = async (req, res, next) => {
    try {
        const result = await admin.showAdmin(parseInt(req.params.id));
        const updatedAdmin = {
            ...result,
            name: req.body.name || result.name,
            email: req.body.email || result.email,
            password_digest: req.body.password || result.password_digest
        };
        const newAdmin = await admin.update(updatedAdmin);
        res.json(newAdmin);
    }
    catch (error) {
        next(error);
    }
};
exports.updateAdmin = updateAdmin;
