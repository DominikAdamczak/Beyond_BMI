const request = require('supertest');
const express = require('express');
const routes = require('../routes');

// Create test app
const app = express();
app.use(express.json());
app.use('/api', routes);

describe('API Endpoints', () => {
  
  describe('GET /api/appointments', () => {
    it('should return list of available appointments', async () => {
      const response = await request(app)
        .get('/api/appointments')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('date');
      expect(response.body[0]).toHaveProperty('time');
      expect(response.body[0]).toHaveProperty('available');
    });
  });

  describe('POST /api/book', () => {
    it('should create a booking with valid data', async () => {
      const bookingData = {
        name: 'Test User',
        email: 'test@example.com',
        slotId: 1
      };

      const response = await request(app)
        .post('/api/book')
        .send(bookingData)
        .expect(200);

      expect(response.body).toHaveProperty('bookingId');
    });

    it('should reject booking with missing fields', async () => {
      const response = await request(app)
        .post('/api/book')
        .send({ name: 'Test User' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should reject booking with invalid email', async () => {
      const response = await request(app)
        .post('/api/book')
        .send({ 
          name: 'Test User', 
          email: 'invalid-email',
          slotId: 1
        })
        .expect(400);

      expect(response.body.error).toMatch(/email/i);
    });
  });

  describe('GET /api/admin/bookings', () => {
    it('should return all bookings', async () => {
      const response = await request(app)
        .get('/api/admin/bookings')
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('bookings');
      expect(Array.isArray(response.body.bookings)).toBe(true);
    });
  });

  describe('POST /api/cancel', () => {
    it('should cancel a booking', async () => {
      // First create a booking
      const bookingResponse = await request(app)
        .post('/api/book')
        .send({
          name: 'Cancel Test',
          email: 'cancel@example.com',
          slotId: 2
        });

      const bookingId = bookingResponse.body.bookingId;

      // Then cancel it
      const response = await request(app)
        .post('/api/cancel')
        .send({ bookingId })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toMatch(/cancelled/i);
    });

    it('should return error for invalid booking ID', async () => {
      const response = await request(app)
        .post('/api/cancel')
        .send({ bookingId: 'nonexistent' })
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/reschedule', () => {
    it('should reschedule a booking to a new slot', async () => {
      // First create a booking
      const bookingResponse = await request(app)
        .post('/api/book')
        .send({
          name: 'Reschedule Test',
          email: 'reschedule@example.com',
          slotId: 3
        });

      const bookingId = bookingResponse.body.bookingId;

      // Then reschedule it
      const response = await request(app)
        .post('/api/reschedule')
        .send({ 
          bookingId,
          newSlotId: 4
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toMatch(/rescheduled/i);
      expect(response.body.booking.slotId).toBe(4);
    });

    it('should reject rescheduling with missing fields', async () => {
      const response = await request(app)
        .post('/api/reschedule')
        .send({ bookingId: '123' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
