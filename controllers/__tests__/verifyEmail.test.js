const supertest = require('supertest');
const app = require('../../index'); // Make sure to adjust the path
const User = require("../../models/User");

const endpoint = '/api/users/verify-email'

describe('Verify Email API', () => {
  it('should verify email with valid verification code', async () => {
    const user = await createUserWithVerificationCode();

    const response = await supertest(app)
      .post(endpoint)
      .send({ emailVerificationCode: user.emailVerificationCode });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data.userWithCode.emailVerified).toBe(true);
  });

  it('should return an error for missing email verification code', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('Please provide email verification code');
  });

  it('should return an error for invalid email verification code', async () => {
    const response = await supertest(app)
      .post(endpoint)
      .send({ emailVerificationCode: 'invalidcode' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('Invalid email verification code');
  });

  it('should return an error for expired email verification code', async () => {
    const expiredUser = await createUserWithExpiredVerificationCode();

    const response = await supertest(app)
      .post(endpoint)
      .send({ emailVerificationCode: expiredUser.emailVerificationCode });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('fail');
    expect(response.body.data.message).toBe('Email verification code has expired');
  });


});


async function createUserWithVerificationCode() {
  const user = await User.create({
    username: 'testuser24',
    email: 'test24@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    emailVerificationCode: 'validcode',
    emailVerificationCodeExpiry: new Date(Date.now() + 3600000), // 1 hour in the future
  });
  return user;
}

async function createUserWithExpiredVerificationCode() {
  const user = await User.create({
    username: 'testuser35',
    email: 'test35@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    emailVerificationCode: 'expiredcode',
    emailVerificationCodeExpiry: new Date(Date.now() - 3600000), // 1 hour in the past
  });
  return user;
}
