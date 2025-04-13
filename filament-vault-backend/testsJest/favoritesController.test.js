//Author: Kassandra Furtado

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Filament = require('../models/Filament');
const jwt = require('jsonwebtoken');

let testUser;
let testFilament;
let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Use an existing user from MongoDB
  testUser = await User.findById("67faab1638d19311982b45f9");

  // Use an existing filament (you can replace the ID if needed)
  testFilament = await Filament.findOne(); // or use .findById('some-id')

  // Generate token using the user's _id
  token = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
  // Optionally remove the filament from user's favorites after test
  await User.findByIdAndUpdate(testUser._id, {
    $pull: { savedFilaments: testFilament._id }
  });

  await mongoose.connection.close();
});

describe('POST /api/users/save-filament/:filamentId', () => {
  it('should save the filament to the user\'s favorites', async () => {
    const res = await request(app)
      .post(`/api/users/save-filament/${testFilament._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Filament saved successfully');

    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.savedFilaments).toContainEqual(testFilament._id);
  });
});