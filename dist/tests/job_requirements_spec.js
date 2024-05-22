"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_requirements_1 = require("../models/Job_requirements");
const Skill_1 = require("../models/Skill");
const Job_1 = require("../models/Job");
const Company_1 = require("../models/Company");
const Job_status_1 = require("../models/Job_status");
const jobRequirement = new Job_requirements_1.JobRequirementModel();
const skill = new Skill_1.SkillModel();
const job = new Job_1.JobModel();
const company = new Company_1.CompanyModel();
describe('jobRequirement Model', () => {
    let new_skill;
    let new_job;
    let new_company;
    beforeAll(async () => {
        new_company = await company.create({
            name: 'requirements_company',
            industry: 'requirements_industry',
            description: 'requirements_description',
            email: 'requirements@email.com',
            password: 'requirements_password'
        });
        new_skill = await skill.create({
            name: 'jobRequirement_skill'
        });
        new_job = await job.create({
            company_id: new_company.id,
            title: 'requirements_job',
            description: 'requirements_description',
            salary: 12,
            location: 'requirements_location',
            status: Job_status_1.JobStatus.OPEN
        });
    });
    it('should have an index method', () => {
        expect(jobRequirement.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(jobRequirement.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(jobRequirement.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(jobRequirement.delete).toBeDefined();
    });
    it('create method should add a new jobRequirement', async () => {
        const result = await jobRequirement.create(new_skill.id, new_job.id);
        expect(result).toEqual({
            skill_id: new_skill.id,
            job_id: new_job.id
        });
    });
    it('index method should return a list of jobRequirements', async () => {
        const result = await jobRequirement.index();
        expect(result).toEqual([
            { skill_id: new_skill.id, job_id: new_job.id }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await jobRequirement.show(new_skill.id, new_job.id);
        expect(result).toEqual({
            skill_id: new_skill.id,
            job_id: new_job.id
        });
    });
    it('delete method should remove the correct jobRequirement', async () => {
        const result = await jobRequirement.delete(new_skill.id, new_job.id);
        expect(result).toEqual(undefined);
    });
    afterAll(async () => {
        await job.delete(new_job.id);
        await company.deleteCompany(new_company.id);
        await skill.delete(new_skill.id);
    });
});
