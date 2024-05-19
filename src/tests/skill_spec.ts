import { SkillModel } from '../models/Skill';

const skill = new SkillModel();

describe('Skill Model', () => {
  let skill_id: number;
  it('should have an index method', () => {
    expect(skill.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(skill.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(skill.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(skill.update).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(skill.delete).toBeDefined();
  });
  it('create method should add a new skill', async () => {
    const result = await skill.create({ name: 'first_test_skill' });
    skill_id = result.id as number;
    expect(result).toEqual({ id: skill_id, name: 'first_test_skill' });
  });
  it('index method should return a list of skills', async () => {
    const result = await skill.index();
    expect(result).toEqual([{ id: skill_id, name: 'first_test_skill' }]);
  });
  it('show method should return the correct list', async () => {
    const result = await skill.show(skill_id);
    expect(result).toEqual({ id: skill_id, name: 'first_test_skill' });
  });
  it('update method should update specific skill', async () => {
    const result = await skill.update(skill_id, 'updated_test_skill');
    expect(result).toEqual({ id: skill_id, name: 'updated_test_skill' });
  });
  it('delete method should remove the correct skill', async () => {
    const result = await skill.delete(skill_id);
    expect(result).toEqual(undefined);
  });
});
