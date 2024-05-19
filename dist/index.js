"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const recruiterRoutes_1 = __importDefault(require("./routes/recruiterRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const jobRequirementsRoutes_1 = __importDefault(require("./routes/jobRequirementsRoutes"));
const candidateSkillRoutes_1 = __importDefault(require("./routes/candidateSkillRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || '3001';
const address = `localhost:${port}`;
const route = '/api/v1/';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.use(`${route}skills`, skillRoutes_1.default);
app.use(`${route}recruiters`, recruiterRoutes_1.default);
app.use(`${route}companies`, companyRoutes_1.default);
app.use(`${route}jobs`, jobRoutes_1.default);
app.use(`${route}jobrequirements`, jobRequirementsRoutes_1.default);
app.use(`${route}candidateSkills`, candidateSkillRoutes_1.default);
app.use(`${route}candidates`, candidateRoutes_1.default);
app.use(`${route}applications`, applicationRoutes_1.default);
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
