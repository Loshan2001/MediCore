require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Import the controller and create a mock app for testing
const userAuthController = require('../controller/userController');
const User = require('../models/User');

// Create a mock Express app
const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/signup', userAuthController.signup);
app.post('/login', userAuthController.login);
app.get('/profile/:userId', userAuthController.getProfile);
app.put('/profile/:userId', userAuthController.updateUser);
app.get('/users', userAuthController.getAllUsers);
app.get('/user/:id', userAuthController.getUser);

jest.mock('../models/User');
jest.mock('bcryptjs', () => ({
    genSalt: jest.fn().mockResolvedValue('somesalt'),
    hash: jest.fn().mockResolvedValue('hashedpassword')
  }));
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('testtoken')
  }));

describe('User Authentication Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /signup', () => {
    it('should register a new user and return a token', async () => {
      const reqBody = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({ _id: '12345' });

      const response = await request(app).post('/signup').send(reqBody);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.msg).toBe('User registered successfully');
    });

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      const response = await request(app)
        .post('/signup')
        .send({ email: 'john@example.com', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('User already exists');
    });
  });

  describe('POST /login', () => {
    it('should login a user and return a token', async () => {
      const reqBody = {
        email: 'john@example.com',
        password: 'password123'
      };

      const user = {
        _id: '12345',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        userType: 'standard',
        fullName: 'John Doe',
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const response = await request(app).post('/login').send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.username).toBe('John Doe');
    });

    it('should return 400 if credentials are invalid', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ email: 'john@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Invalid credentials');
    });
  });

  describe('GET /profile/:userId', () => {
    it('should return user profile data', async () => {
      const user = {
        _id: '12345',
        fullName: 'John Doe',
        email: 'john@example.com'
      };
  
      const userId = '12345';
  
      // Mocking User.findById to return an object with a `select` method.
      User.findById = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(user),
      });
  
      const response = await request(app).get(`/profile/${userId}`);
  
      // Log the response body if the test fails
      if (response.status !== 200) {
        console.error('Test Error:', response.body);
      }
  
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
    });
  
  

    it('should return 404 if user not found', async () => {
        // Mock the User.findById method to return null, mimicking a not found scenario
        User.findById.mockImplementation(() => ({
          select: jest.fn().mockResolvedValue(null)  // Mock the select method to return null
        }));
      
        const response = await request(app).get('/profile/12345');
      
        // Log the response body if the status is not as expected.
        if (response.status !== 404) {
          console.error('Test Error:', response.body);
        }
      
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('User not found');
      });
      
      
  });

  describe('PUT /profile/:userId', () => {
    it('should update user data', async () => {
      const reqBody = {
        fullName: 'John Doe Updated',
        email: 'john@example.com',
        address: '123 Street',
        phoneNo: '1234567890'
      };

      User.findByIdAndUpdate.mockResolvedValue({
        ...reqBody,
        _id: '12345'
      });

      const response = await request(app)
        .put('/profile/12345')
        .send(reqBody);

      expect(response.status).toBe(200);
      expect(response.body.fullName).toBe('John Doe Updated');
    });

    it('should return 404 if user not found', async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/profile/12345').send({
        fullName: 'John Doe Updated',
        email: 'john@example.com'
      });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('GET /users/all', () => {
    it('should return all users', async () => {
      const users = [
        { _id: '12345', fullName: 'John Doe', email: 'john@example.com' },
        { _id: '67890', fullName: 'Jane Doe', email: 'jane@example.com' }
      ];
  
      // Mock the User.find method
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(users) // Mock select to return users
      });
  
      // Test the endpoint
      const response = await request(app).get('/users');
  
      // Check if the response status is 200 (OK).
      expect(response.status).toBe(200);
      // Check if the response body length is equal to the number of users.
      expect(response.body.length).toBe(2);
      // Optional: Check if the response body matches the mock data.
      expect(response.body).toEqual(users);
    });
  
  });

  describe('GET /user/:id', () => {
    it('should return a user by ID', async () => {
      const user = { _id: '12345', fullName: 'John Doe', email: 'john@example.com' };

      User.findById.mockResolvedValue(user);

      const response = await request(app).get('/user/12345');

      expect(response.status).toBe(200);
      expect(response.body.fullName).toBe('John Doe');
    });
  });
});
