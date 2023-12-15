const supertest = require('supertest');
const app = require('../../index'); // Make sure to adjust the path

describe('Signup API', () => {
  it('should create a new user with valid data', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser',  email: 'test@example.com',
        password: 'password123', firstName: 'John', lastName: 'Doe',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('success');
    expect(response.body.data.user).toHaveProperty('username', 'testuser');
  });

  it('should return an error for missing required fields', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({ });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('Please provide all required information');
  });

  it('should return an error if the username already exists', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser', email: 'newuser@example.com',
        password: 'password123', firstName: 'Jane', lastName: 'Doe',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('User with username already exists');
  });

  it('should return an error if the email already exists', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({
        username: 'another__user', email: 'test@example.com',
        password: 'password123', firstName: 'Jane', lastName: 'Doe',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('User with email already exists');
  });

});
