// Author: Nikitha Bijju
// Method: filterByMaterial()

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /api/filaments/filter', () => {
  it('should return filaments matching the specified material', async () => {
    const material = 'PLA';

    const res = await request(app).get(`/api/filaments/filter?material=${material}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(filament => {
      expect(filament.material.toLowerCase()).toContain(material.toLowerCase());
    });
  });

  it('should return 400 if no material is provided', async () => {
    const res = await request(app).get('/api/filaments/filter');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Material query parameter is required.");
  });

  it('should return 404 if no filaments match the material', async () => {
    const res = await request(app).get('/api/filaments/filter?material=Unobtainium');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/No filaments found/i);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
