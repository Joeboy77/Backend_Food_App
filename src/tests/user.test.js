const request = require('supertest')
const app = require('../server')
const User = require('../models/User')
const mongoose = require('mongoose')

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST)
})

afterAll(async () => {
    await mongoose.close()
})

describe('User API', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });
  
    it('should login a user', async () => {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
  
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });
  
  // tests/meal.test.js
  const request = require('supertest');
  const app = require('../server');
  const Meal = require('../models/mealModel');
  const User = require('../models/userModel');
  const mongoose = require('mongoose');
  
  let token;
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    token = user.generateAuthToken();
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe('Meal API', () => {
    beforeEach(async () => {
      await Meal.deleteMany({});
    });
  
    it('should create a new meal', async () => {
      const res = await request(app)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Meal',
          ingredients: ['5f9f1b9b9b9b9b9b9b9b9b9b'],
          mealType: 'breakfast',
          date: new Date()
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Meal');
    });
  
    it('should get recommended meal plan', async () => {
      const res = await request(app)
        .get('/api/meals/recommended-plan')
        .set('Authorization', `Bearer ${token}`)
        .query({ days: 3 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(3);
    });
  });