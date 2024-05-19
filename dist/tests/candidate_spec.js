"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Candidate_1 = require("../models/Candidate");
const candidate = new Candidate_1.CandidateModel();
describe('candidate Model', () => {
    let candidate_id;
    it('should have an index method', () => {
        expect(candidate.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(candidate.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(candidate.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(candidate.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(candidate.delete).toBeDefined();
    });
    it('create method should add a new candidate', async () => {
        const result = await candidate.create({
            name: 'first_test_candidate',
            email: 'candidate@email.com',
            password: 'candidate_password',
            resume: 'candidate_resume',
            experience: 12
        });
        candidate_id = result.id;
        expect(result).toEqual({
            id: candidate_id,
            name: 'first_test_candidate',
            email: 'candidate@email.com',
            password: 'candidate_password',
            resume: 'candidate_resume',
            experience: 12
        });
    });
    it('index method should return a list of candidates', async () => {
        const result = await candidate.index();
        expect(result).toEqual([
            {
                id: candidate_id,
                name: 'first_test_candidate',
                email: 'candidate@email.com',
                password: 'candidate_password',
                resume: 'candidate_resume',
                experience: 12
            }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await candidate.show(candidate_id);
        expect(result).toEqual({
            id: candidate_id,
            name: 'first_test_candidate',
            email: 'candidate@email.com',
            password: 'candidate_password',
            resume: 'candidate_resume',
            experience: 12
        });
    });
    it('update method should update specific candidate', async () => {
        const result = await candidate.update(candidate_id, 'first_test_candidate', 'candidate@email.com', 'candidate_password', 'candidate_resume', 12);
        expect(result).toEqual({
            id: candidate_id,
            name: 'first_test_candidate',
            email: 'candidate@email.com',
            password: 'candidate_password',
            resume: 'candidate_resume',
            experience: 12
        });
    });
    it('delete method should remove the correct candidate', async () => {
        const result = await candidate.delete(candidate_id);
        expect(result).toEqual(undefined);
    });
});
