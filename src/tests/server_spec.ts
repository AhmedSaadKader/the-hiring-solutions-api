import request from 'supertest';
import app from '../index';

describe("GET API '/'", () => {
  it('should return "Hello World!"', async () => {
    const res = await request(app).get('/').send('Hello World!');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello world!');
  });
});
