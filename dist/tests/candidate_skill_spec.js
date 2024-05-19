"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Candidate_1 = require("../models/Candidate");
const Candidate_skill_1 = require("../models/Candidate_skill");
const Skill_1 = require("../models/Skill");
const candidateSkill = new Candidate_skill_1.CandidateSkillModel();
const skill = new Skill_1.SkillModel();
const candidate = new Candidate_1.CandidateModel();
describe('candidateSkill Model', () => {
    let new_skill;
    let new_candidate;
    beforeAll(async () => {
        new_candidate = await candidate.create({
            name: 'skills_candidate',
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
        const result = await candidateSkill.create(new_skill.id, new_candidate.id);
        expect(result).toEqual({
            skill_id: new_skill.id,
            candidate_id: new_candidate.id
        });
    });
    it('index method should return a list of candidateSkills', async () => {
        const result = await candidateSkill.index();
        expect(result).toEqual([
            {
                skill_id: new_skill.id,
                candidate_id: new_candidate.id
            }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await candidateSkill.show(new_skill.id, new_candidate.id);
        expect(result).toEqual({
            skill_id: new_skill.id,
            candidate_id: new_candidate.id
        });
    });
    it('delete method should remove the correct candidateSkill', async () => {
        const result = await candidateSkill.delete(new_skill.id, new_candidate.id);
        expect(result).toEqual(undefined);
    });
    afterAll(async () => {
        await candidate.delete(new_candidate.id);
        await skill.delete(new_skill.id);
    });
});
