//Author: Stephanie Figueira
//Method: addReview()

const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

describe('POST /api/filaments/:id/reviews', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y5NjM1YzQ4ZjM0MzYxNmM5NTRjMjYiLCJ1c2VybmFtZSI6InZpZDIiLCJpYXQiOjE3NDQzOTcxNDgsImV4cCI6MTc0NDQwMDc0OH0.zKjHd5aPbFn6x0BWq5riGY4eBnkRaO-cihReXpKSo74'; 
  const filamentId = '67d99a1a42aa0d2dc79212f9';

  it('should add a review to a filament', async () => {
    const res = await request(app)
      .post(`/api/filaments/${filamentId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        review: 'This filament is amazing!',
        rating: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Review added successfully');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
