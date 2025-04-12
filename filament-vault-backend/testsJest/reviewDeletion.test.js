// reviewDeletion.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Filament = require('../models/Filament');
const User = require('../models/User');

describe('DELETE /api/filaments/:id/reviews/:reviewId', () => {
  let filamentId;
  let reviewId;
  let adminToken;
  
  
  // Set up test data before running tests
  beforeAll(async () => {
    // Create a test admin user
    const adminUser = await User.create({
      username: 'testadmin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    
    
    adminToken = jwt.sign({ userId: adminUser._id, role: 'admin' }, process.env.JWT_SECRET || 'supersecret_dont_share');
    
    
    // Create a test filament with a review
    const filament = await Filament.create({
      name: 'Test PLA',
      material: 'PLA',
      brand: 'TestBrand',
      reviews: [{
        review: 'Test review',
        rating: 5,
        user: adminUser._id
      }]
    });
    
    filamentId = filament._id;
    reviewId = filament.reviews[0]._id;
  });
  
  
  afterAll(async () => {
   
    await User.deleteMany({ username: { $in: ['testadmin', 'testuser'] } });
    await Filament.deleteMany({ name: 'Test PLA' });
    await mongoose.connection.close();
  });
  
  it('should allow admin to delete a review', async () => {
    const res = await request(app)
      .delete(`/api/filaments/${filamentId}/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${adminToken}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Review deleted successfully');
    
    // Verify the review was deleted
    const filament = await Filament.findById(filamentId);
    expect(filament.reviews.length).toBe(0);
  });
  
  
  
  it('should return 404 if review does not exist', async () => {
    const fakeReviewId = new mongoose.Types.ObjectId();
    
    const res = await request(app)
      .delete(`/api/filaments/${filamentId}/reviews/${fakeReviewId}`)
      .set('Authorization', `Bearer ${adminToken}`);
      
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/review not found/i);
  });
});