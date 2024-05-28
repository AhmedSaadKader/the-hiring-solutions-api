import { Candidate, CandidateModel } from '../models/Candidate';
import { CandidateSkillModel } from '../models/Candidate_skill';
import { Skill, SkillModel } from '../models/Skill';

const candidateSkill = new CandidateSkillModel();
const skill = new SkillModel();
const candidate = new CandidateModel();

describe('candidateSkill Model', () => {
  let new_skill: Skill;
  let new_candidate: Candidate;
  beforeAll(async () => {
    new_candidate = await candidate.create({
      name: 'skills_candidate',
      phone_no: '01201201202',
      email: 'skills@email.com',
      password: 'skills_password',
      resume: 'skill_resume',
      experience: 12
    });
    new_skill = await skill.create({
      name: 'candidateSkill_skill'
    });
  });
  it('should have an index method', () => {
    expect(candidateSkill.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(candidateSkill.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(candidateSkill.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(candidateSkill.delete).toBeDefined();
  });
  it('create method should add a new candidateSkill', async () => {
    const result = await candidateSkill.create(
      new_skill.id as number,
      new_candidate.id as number
    );
    expect(result).toEqual({
      skill_id: new_skill.id as number,
      candidate_id: new_candidate.id as number
    });
  });
  it('index method should return a list of candidateSkills', async () => {
    const result = await candidateSkill.index();
    expect(result).toEqual([
      {
        skill_id: new_skill.id as number,
        candidate_id: new_candidate.id as number
      }
    ]);
  });
  it('show method should return the correct list', async () => {
    const result = await candidateSkill.show(
      new_skill.id as number,
      new_candidate.id as number
    );
    expect(result).toEqual({
      skill_id: new_skill.id as number,
      candidate_id: new_candidate.id as number
    });
  });
  it('delete method should remove the correct candidateSkill', async () => {
    const result = await candidateSkill.delete(
      new_skill.id as number,
      new_candidate.id as number
    );
    expect(result).toEqual(undefined);
  });
  afterAll(async () => {
    await candidate.deleteCandidate(new_candidate.id as number);
    await skill.delete(new_skill.id as number);
  });
});
