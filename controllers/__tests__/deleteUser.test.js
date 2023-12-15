const supertest = require('supertest');
const app = require('../../index'); 
const User = require("../../models/User");

describe('Delete User API', () => {
  it('should delete a user with valid userId', async () => {

    const user = await createUser();

    const response = await supertest(app)
      .post('/api/users/delete')
      .send({ userId: user._id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data.message).toBe('User deleted successfully');

    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });

  it('should return an error for missing userId', async () => {
    const response = await supertest(app)
      .post('/api/users/delete')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
  });

  it('should return an error for invalid userId', async () => {
    const response = await supertest(app)
      .post('/api/users/delete')
      .send({ userId: 'invalidId' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
  });

});


async function createUser() {
  const user = await User.create({
    username: 'testuser36',
    email: 'test36@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
  });
  return user;
}
