import { JobRequirementModel } from '../models/Job_requirements';
import { Skill, SkillModel } from '../models/Skill';
import { Job, JobModel } from '../models/Job';
import { Company, CompanyModel } from '../models/Company';
import { JobStatus } from '../models/Job_status';

const jobRequirement = new JobRequirementModel();
const skill = new SkillModel();
const job = new JobModel();
const company = new CompanyModel();

describe('jobRequirement Model', () => {
  let new_skill: Skill;
  let new_job: Job;
  let new_company: Company;
  beforeAll(async () => {
    new_company = await company.create({
      name: 'requirements_company',
      industry: 'requirements_industry',
      description: 'requirements_description',
      phone_no: '01201201202',
      email: 'requirements@email.com',
      password: 'requirements_password'
    });
    new_skill = await skill.create({
      name: 'jobRequirement_skill'
    });
    new_job = await job.create({
      company_id: new_company.id as number,
      title: 'requirements_job',
      description: 'requirements_description',
      salary: 12,
      location: 'requirements_location',
      status: JobStatus.OPEN
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
    const result = await jobRequirement.create(
      new_skill.id as number,
      new_job.id as number
    );
    expect(result).toEqual({
      skill_id: new_skill.id as number,
      job_id: new_job.id as number
    });
  });
  it('index method should return a list of jobRequirements', async () => {
    const result = await jobRequirement.index();
    expect(result).toEqual([
      { skill_id: new_skill.id as number, job_id: new_job.id as number }
    ]);
  });
  it('show method should return the correct list', async () => {
    const result = await jobRequirement.show(
      new_skill.id as number,
      new_job.id as number
    );
    expect(result).toEqual({
      skill_id: new_skill.id as number,
      job_id: new_job.id as number
    });
  });
  it('delete method should remove the correct jobRequirement', async () => {
    const result = await jobRequirement.delete(
      new_skill.id as number,
      new_job.id as number
    );
    expect(result).toEqual(undefined);
  });
  afterAll(async () => {
    await job.delete(new_job.id as number);
    await company.deleteCompany(new_company.id as number);
    await skill.delete(new_skill.id as number);
  });
});
