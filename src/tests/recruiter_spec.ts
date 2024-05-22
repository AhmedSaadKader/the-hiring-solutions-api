import { Recruiter, RecruiterModel } from '../models/Recruiter';

const recruiter = new RecruiterModel();

describe('Recruiter Model', () => {
  let recruiter_id: number;
  it('should have an index method', () => {
    expect(recruiter.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(recruiter.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(recruiter.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(recruiter.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(recruiter.delete).toBeDefined();
  });
  it('create method should add a new recruiter', async () => {
    const result = await recruiter.create({
      name: 'first_test_recruiter',
      email: 'recruiter@email.com',
      password: 'recruiter_password'
    });
    recruiter_id = result.id as number;
    expect(result).toEqual({
      id: recruiter_id,
      name: 'first_test_recruiter',
      email: 'recruiter@email.com',
      password: 'recruiter_password'
    });
  });
  it('index method should return a list of recruiters', async () => {
    const result = await recruiter.indexRecruiter();
    expect(result).toEqual([
      {
        id: recruiter_id,
        name: 'first_test_recruiter',
        email: 'recruiter@email.com',
        password: 'recruiter_password'
      }
    ]);
  });
  it('show method should return the correct list', async () => {
    const result = await recruiter.showRecruiter(recruiter_id);
    expect(result).toEqual({
      id: recruiter_id,
      name: 'first_test_recruiter',
      email: 'recruiter@email.com',
      password: 'recruiter_password'
    });
  });
  it('update method should update specific recruiter', async () => {
    const updatedRecruiter: Recruiter = {
      id: recruiter_id,
      name: 'updated_test_recruiter',
      email: 'recruiter@email.com',
      password: 'recruiter_password'
    };
    const result = await recruiter.update(updatedRecruiter);
    expect(result).toEqual({
      id: recruiter_id,
      name: 'updated_test_recruiter',
      email: 'recruiter@email.com',
      password: 'recruiter_password'
    });
  });
  it('delete method should remove the correct recruiter', async () => {
    const result = await recruiter.deleteRecruiter(recruiter_id);
    expect(result).toEqual(null);
  });
});
