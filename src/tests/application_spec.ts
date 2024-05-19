import { ApplicationModel } from '../models/Application';
import { Recruiter, RecruiterModel } from '../models/Recruiter';
import { Candidate, CandidateModel } from '../models/Candidate';
import { Company, CompanyModel } from '../models/Company';
import { Job, JobModel } from '../models/Job';
import { JobStatus } from '../models/Job_status';

const application = new ApplicationModel();
const recruiter = new RecruiterModel();
const candidate = new CandidateModel();
const company = new CompanyModel();
const job = new JobModel();

describe('Application Model', () => {
  let application_id: number;
  let createdApplicationDate: Date;
  let new_recruiter: Recruiter;
  let new_candidate: Candidate;
  let new_company: Company;
  let new_job: Job;
  beforeAll(async () => {
    new_recruiter = await recruiter.create({
      name: 'application_recruiter',
      email: 'application@email.com',
      password: 'application_password'
    });
    new_candidate = await candidate.create({
      name: 'application_candidate',
      email: 'application@email.com',
      password: 'application_password',
      resume: 'application_resume',
      experience: 7
    });
    new_company = await company.create({
      name: 'application_company',
      industry: 'application_industry',
      description: 'application_description',
      email: 'application@email.com',
      password: 'application_password'
    });
    new_job = await job.create({
      company_id: new_company.id as number,
      title: 'application_job',
      description: 'application_description',
      salary: 700,
      location: 'application_location',
      status: JobStatus.OPEN
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
      job_id: new_job.id as number,
      candidate_id: new_candidate.id as number,
      recruiter_id: new_recruiter.id as number,
      status: JobStatus.OPEN,
      notes: 'application_note'
    });
    application_id = result.id as number;
    const createdApplication = await application.show(application_id);
    createdApplicationDate = createdApplication.applied_date as Date;
    const expectedPostedDate = new Date();
    const toleranceInSeconds = 20;
    const diffInSeconds = Math.abs(
      (createdApplicationDate.getTime() - expectedPostedDate.getTime()) / 1000
    );
    expect(diffInSeconds).toBeLessThanOrEqual(toleranceInSeconds);
    expect(result).toEqual({
      id: application_id,
      job_id: new_job.id as number,
      candidate_id: new_candidate.id as number,
      recruiter_id: new_recruiter.id as number,
      status: JobStatus.OPEN,
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
        job_id: new_job.id as number,
        candidate_id: new_candidate.id as number,
        recruiter_id: new_recruiter.id as number,
        status: JobStatus.OPEN,
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
      job_id: new_job.id as number,
      candidate_id: new_candidate.id as number,
      recruiter_id: new_recruiter.id as number,
      status: JobStatus.OPEN,
      applied_date: createdApplicationDate,
      reviewed_date: null,
      notes: 'application_note'
    });
  });
  it('update method should update specific application', async () => {
    const result = await application.update(
      application_id,
      new_job.id as number,
      new_company.id as number,
      new_recruiter.id as number,
      JobStatus.OPEN,
      createdApplicationDate,
      'updated_notes'
    );
    expect(result).toEqual({
      id: application_id,
      job_id: new_job.id as number,
      candidate_id: new_candidate.id as number,
      recruiter_id: new_recruiter.id as number,
      status: JobStatus.OPEN,
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
    await job.delete(new_job.id as number);
    await company.delete(new_company.id as number);
    await recruiter.delete(new_recruiter.id as number);
    await candidate.delete(new_candidate.id as number);
  });
});
