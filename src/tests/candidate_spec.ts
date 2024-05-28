import { Candidate, CandidateModel } from '../models/Candidate';

const candidate = new CandidateModel();

describe('candidate Model', () => {
  let candidate_id: number;
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
      phone_no: '01201201202',
      email: 'candidate@email.com',
      password: 'candidate_password',
      resume: 'candidate_resume',
      experience: 12
    });
    candidate_id = result.id as number;
    expect(result).toEqual({
      id: candidate_id,
      name: 'first_test_candidate',
      phone_no: '01201201202',
      email: 'candidate@email.com',
      password: 'candidate_password',
      resume: 'candidate_resume',
      experience: 12
    });
  });
  it('index method should return a list of candidates', async () => {
    const result = await candidate.indexCandidate();
    expect(result).toEqual([
      {
        id: candidate_id,
        name: 'first_test_candidate',
        phone_no: '01201201202',
        email: 'candidate@email.com',
        password: 'candidate_password',
        resume: 'candidate_resume',
        experience: 12
      }
    ]);
  });
  it('show method should return the correct list', async () => {
    const result = await candidate.showCandidate(candidate_id);
    expect(result).toEqual({
      id: candidate_id,
      name: 'first_test_candidate',
      phone_no: '01201201202',
      email: 'candidate@email.com',
      password: 'candidate_password',
      resume: 'candidate_resume',
      experience: 12
    });
  });
  it('update method should update specific candidate', async () => {
    const updatedCandidate: Candidate = {
      id: candidate_id,
      name: 'first_test_candidate',
      phone_no: '01201201202',
      email: 'candidate@email.com',
      password: 'candidate_password',
      resume: 'candidate_resume',
      experience: 12
    };
    const result = await candidate.update(updatedCandidate);
    expect(result).toEqual({
      id: candidate_id,
      name: 'first_test_candidate',
      phone_no: '01201201202',
      email: 'candidate@email.com',
      password: 'candidate_password',
      resume: 'candidate_resume',
      experience: 12
    });
  });
  it('delete method should remove the correct candidate', async () => {
    const result = await candidate.deleteCandidate(candidate_id);
    expect(result).toEqual(null);
  });
});
