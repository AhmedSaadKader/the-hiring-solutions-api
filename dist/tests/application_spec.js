"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("../models/Application");
const Recruiter_1 = require("../models/Recruiter");
const Candidate_1 = require("../models/Candidate");
const Company_1 = require("../models/Company");
const Job_1 = require("../models/Job");
const Job_status_1 = require("../models/Job_status");
const application = new Application_1.ApplicationModel();
const recruiter = new Recruiter_1.RecruiterModel();
const candidate = new Candidate_1.CandidateModel();
const company = new Company_1.CompanyModel();
const job = new Job_1.JobModel();
describe('Application Model', () => {
    let application_id;
    let createdApplicationDate;
    let new_recruiter;
    let new_candidate;
    let new_company;
    let new_job;
    beforeAll(async () => {
        new_recruiter = await recruiter.create({
            name: 'application_recruiter',
            phone_no: '01201201202',
            email: 'application@email.com',
            password: 'application_password'
        });
        new_candidate = await candidate.create({
            name: 'application_candidate',
            phone_no: '01201201202',
            email: 'application@email.com',
            password: 'application_password',
            resume: 'application_resume',
            experience: 7
        });
        new_company = await company.create({
            name: 'application_company',
            industry: 'application_industry',
            description: 'application_description',
            phone_no: '01201201202',
            email: 'application@email.com',
            password: 'application_password'
        });
        new_job = await job.create({
            company_id: new_company.id,
            title: 'application_job',
            description: 'application_description',
            salary: 700,
            location: 'application_location',
            status: Job_status_1.JobStatus.OPEN
        });
    });
    it('should have an index method', () => {
        expect(application.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(application.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(application.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(application.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(application.delete).toBeDefined();
    });
    it('create method should add a new application', async () => {
        const result = await application.create({
            job_id: new_job.id,
            candidate_id: new_candidate.id,
            recruiter_id: new_recruiter.id,
            status: Job_status_1.JobStatus.OPEN,
            notes: 'application_note'
        });
        application_id = result.id;
        const createdApplication = await application.show(application_id);
        createdApplicationDate = createdApplication.applied_date;
        const expectedPostedDate = new Date();
        const toleranceInSeconds = 20;
        const diffInSeconds = Math.abs((createdApplicationDate.getTime() - expectedPostedDate.getTime()) / 1000);
        expect(diffInSeconds).toBeLessThanOrEqual(toleranceInSeconds);
        expect(result).toEqual({
            id: application_id,
            job_id: new_job.id,
            candidate_id: new_candidate.id,
            recruiter_id: new_recruiter.id,
            status: Job_status_1.JobStatus.OPEN,
            applied_date: createdApplicationDate,
            reviewed_date: null,
            notes: 'application_note'
        });
    });
    it('index method should return a list of applications', async () => {
        const result = await application.index();
        expect(result).toEqual([
            {
                id: application_id,
                job_id: new_job.id,
                candidate_id: new_candidate.id,
                recruiter_id: new_recruiter.id,
                status: Job_status_1.JobStatus.OPEN,
                applied_date: createdApplicationDate,
                reviewed_date: null,
                notes: 'application_note'
            }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await application.show(application_id);
        expect(result).toEqual({
            id: application_id,
            job_id: new_job.id,
            candidate_id: new_candidate.id,
            recruiter_id: new_recruiter.id,
            status: Job_status_1.JobStatus.OPEN,
            applied_date: createdApplicationDate,
            reviewed_date: null,
            notes: 'application_note'
        });
    });
    it('update method should update specific application', async () => {
        const result = await application.update(application_id, new_job.id, new_company.id, new_recruiter.id, Job_status_1.JobStatus.OPEN, createdApplicationDate, 'updated_notes');
        expect(result).toEqual({
            id: application_id,
            job_id: new_job.id,
            candidate_id: new_candidate.id,
            recruiter_id: new_recruiter.id,
            status: Job_status_1.JobStatus.OPEN,
            applied_date: createdApplicationDate,
            reviewed_date: null,
            notes: 'updated_notes'
        });
    });
    it('delete method should remove the correct application', async () => {
        const result = await application.delete(1);
        expect(result).toEqual(undefined);
    });
    afterAll(async () => {
        await job.delete(new_job.id);
        await company.deleteCompany(new_company.id);
        await recruiter.deleteRecruiter(new_recruiter.id);
        await candidate.deleteCandidate(new_candidate.id);
    });
});
