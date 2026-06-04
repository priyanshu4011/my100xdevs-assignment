const request = require('supertest');
const app = require('../../../index.js');
describe('JWT Assignment 01-jwt Tests', () => {
  
  // Test 1: Check karna ki kya naya user register ho raha hai
  it('Should signup a new user successfully', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: "priyanshu",
        password: "password123"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'You are signed up');
  });

  // Test 2: Check karna ki kya existing user already exists bol raha hai
  it('Should not signup if user already exists', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: "priyanshu",
        password: "password123"
      });
    expect(res.statusCode).toEqual(400);
  });

  // Test 3: Check karna ki sahi password par token mil raha hai ya nahi
  it('Should login successfully and return a JWT token', async () => {
    const res = await request(app)
      .post('/signin')
      .send({
        username: "priyanshu",
        password: "password123"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test 4: Check karna ki galat password par login block ho raha hai ya nahi
  it('Should reject login with wrong credentials', async () => {
    const res = await request(app)
      .post('/signin')
      .send({
        username: "priyanshu",
        password: "wrongpassword"
      });
    expect(res.statusCode).toEqual(403);
  });
});