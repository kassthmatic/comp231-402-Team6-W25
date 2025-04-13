// Author: Ramanan Sivagurunathan

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecret_dont_share';

describe('PUT /api/profile/update-email', () => {
  let token;
  let testUser;

  beforeAll(async () => {
    await mongoose.connect(
      'mongodb+srv://FilamentVault:Mi5thDXF0Z07PgzK@filamentvaultdb.pkgea.mongodb.net/FilamentVault?retryWrites=true&w=majority&appName=FilamentVaultDB'
    );
  
    const timestamp = Date.now();
  
    testUser = await User.create({
      username: `jesttestuser${timestamp}`,
      email: `jesttest${timestamp}@example.com`,
      password: 'testing123',
    });
  
    token = jwt.sign({ _id: testUser._id }, JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await User.findByIdAndDelete(testUser._id);
    await mongoose.disconnect();
  });

  it('should update the email of the logged-in user', async () => {
    const uniqueEmail = `jestupdated+${Date.now()}@example.com`;

    const res = await request(app)
      .put('/api/profile/update-email')
      .set('Authorization', `Bearer ${token}`)
      .send({ newEmail: uniqueEmail });

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(uniqueEmail);
  });

  it('should return error if no email is provided', async () => {
    const res = await request(app)
      .put('/api/profile/update-email')
      .set('Authorization', `Bearer ${token}`)
      .send({});


    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('New email is required');
  });
});
