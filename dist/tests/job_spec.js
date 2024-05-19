"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../models/Job");
const Company_1 = require("../models/Company");
const Job_status_1 = require("../models/Job_status");
const company = new Company_1.CompanyModel();
const job = new Job_1.JobModel();
let createdPostedDate;
describe('Job Model', () => {
    let new_company;
    let job_id;
    beforeAll(async () => {
        new_company = await company.create({
            name: 'job_test_company',
            industry: 'job_test_industry',
            description: 'job_company_description',
            email: 'job_company@email.com',
            password: 'job_company_password'
        });
    });
    it('should have an index method', () => {
        expect(job.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(job.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(job.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(job.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(job.delete).toBeDefined();
    });
    it('create method should add a new job', async () => {
        const result = await job.create({
            company_id: new_company.id,
            title: 'first_test_job',
            description: 'test_job_description',
            salary: 12,
            location: 'test_job_location',
            status: Job_status_1.JobStatus.OPEN
        });
        job_id = result.id;
        const createdJob = await job.show(job_id);
        createdPostedDate = createdJob.posted_date;
        const expectedPostedDate = new Date();
        const toleranceInSeconds = 20;
        const diffInSeconds = Math.abs((createdPostedDate.getTime() - expectedPostedDate.getTime()) / 1000);
        expect(diffInSeconds).toBeLessThanOrEqual(toleranceInSeconds);
        expect(result).toEqual({
            id: job_id,
            company_id: new_company.id,
            title: 'first_test_job',
            description: 'test_job_description',
            salary: 12,
            location: 'test_job_location',
            posted_date: createdPostedDate,
            status: Job_status_1.JobStatus.OPEN
        });
    });
    it('index method should return a list of jobs', async () => {
        const result = await job.index();
        expect(result).toEqual([
            {
                id: job_id,
                company_id: new_company.id,
                title: 'first_test_job',
                description: 'test_job_description',
                salary: 12,
                location: 'test_job_location',
                posted_date: createdPostedDate,
                status: Job_status_1.JobStatus.OPEN
            }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await job.show(job_id);
        expect(result).toEqual({
            id: job_id,
            company_id: new_company.id,
            title: 'first_test_job',
            description: 'test_job_description',
            salary: 12,
            location: 'test_job_location',
            posted_date: createdPostedDate,
            status: Job_status_1.JobStatus.OPEN
        });
    });
    it('update method should update specific job', async () => {
        const result = await job.update(job_id, new_company.id, 'updated_test_job', 'test_job_description', 12, 'test_job_location', Job_status_1.JobStatus.OPEN);
        expect(result).toEqual({
            id: job_id,
            company_id: new_company.id,
            title: 'updated_test_job',
            description: 'test_job_description',
            salary: 12,
            location: 'test_job_location',
            posted_date: createdPostedDate,
            status: Job_status_1.JobStatus.OPEN
        });
    });
    it('delete method should remove the correct job', async () => {
        const result = await job.delete(job_id);
        expect(result).toEqual(undefined);
    });
    afterAll(async () => {
        await company.delete(new_company.id);
    });
});
