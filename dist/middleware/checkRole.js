"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApplicationOwnershipOrAdmin = exports.checkRole = void 0;
const Application_1 = require("../models/Application");
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return res.status(403).send('Access forbidden: insufficient permissions');
        }
        next();
    };
};
exports.checkRole = checkRole;
const checkApplicationOwnershipOrAdmin = async (req, res, next) => {
    const applicationId = parseInt(req.params.applicationId);
    const applicationModel = new Application_1.ApplicationModel();
    try {
        const application = await applicationModel.show(applicationId);
        if (req.user.role === 'admin' ||
            (req.user.role === 'candidate' &&
                req.user.id === application.candidate_id) ||
            (req.user.role === 'recruiter' &&
                req.user.id === application.recruiter_id)) {
            next();
        }
        else {
            res.status(403).send('Access denied. You do not own this resource.');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.checkApplicationOwnershipOrAdmin = checkApplicationOwnershipOrAdmin;
