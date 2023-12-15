const supertest = require('supertest');
const app = require('../your-express-app'); // Adjust the path
const User = require('../models/user'); // Import your User model

describe('Get All Users API', () => {
  it('should get all users, total alumnis, unique job titles, and unique companies', async () => {
    // Assuming you have users in your test database
    const user1 = await createUser({ role: 'alumni', jobTitle: 'Engineer', company: 'ABC Corp' });
    const user2 = await createUser({ role: 'alumni', jobTitle: 'Developer', company: 'XYZ Inc' });
    const user3 = await createUser({ role: 'manager', jobTitle: 'Intern', company: 'ABC Corp' });

    const response = await supertest(app)
      .get('/api/users/all');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');

    expect(response.body.data.users).toHaveLength(4);
    expect(response.body.data.totalAlumnis).toBe(4);

    expect(response.body.data.uniqueJobTitles).toContain('Engineer');
    expect(response.body.data.uniqueJobTitles).toContain('Developer');
    expect(response.body.data.uniqueJobTitles).toContain('Intern');

    expect(response.body.data.uniqueCompanies).toContain('ABC Corp');
    expect(response.body.data.uniqueCompanies).toContain('XYZ Inc');
  });

  it('should handle errors when retrieving users', async () => {
    jest.spyOn(User, 'find').mockImplementationOnce(() => {
      throw new Error('Error retrieving users');
    });

    const response = await supertest(app)
      .get('/api/users/all');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('Error retrieving users');

    jest.restoreAllMocks();
  });

});

let i = 10;
async function createUser(userDetails) {
  const user = await User.create({
    username: `testuser${i}`,
    email: `test${i}@example.com`,
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    ...userDetails,
  });
  i++;
  return user;
}
