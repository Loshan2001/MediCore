require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Import the controller and create a mock app for testing
const bookingController = require('../controller/bookingController');
const Booking = require('../models/Booking');

// Create a mock Express app
const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/bookings', bookingController.createBooking);
app.get('/bookings', bookingController.getBookings);
app.get('/bookings/user/:userId', bookingController.getBookingsByUserId);
app.delete('/bookings/:id', bookingController.deleteBooking);
app.get('/bookings/past/:id', bookingController.getPastBookingsByUserId);
app.get('/bookings/history/:id', bookingController.getAppointmentHistoryByUserId);

// Mock the Booking model
jest.mock('../models/Booking');

describe('Booking Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /bookings', () => {
    it('should create a new booking', async () => {
      const reqBody = {
        userId: 'user123',
        doctorId: 'doctor123',
        appointmentId: 'appointment123',
        date: '2024-10-15',
        time: '10:00 AM',
        doctorName: 'Dr. Smith',
        hospitalName: 'City Hospital',
        hospitalAddress: '123 Street',
        city: 'Metropolis',
        hospitalNumber: '123456789'
      };

      Booking.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(reqBody) // Mock save method
      }));

      const response = await request(app).post('/bookings').send(reqBody);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(reqBody);
    });

    it('should return 500 if there is an error creating the booking', async () => {
      Booking.mockImplementation(() => {
        return {
          save: jest.fn().mockRejectedValue(new Error('Error creating booking'))
        };
      });

      const response = await request(app).post('/bookings').send({});

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error creating booking');
    });
  });

  describe('GET /bookings', () => {
    it('should fetch all bookings', async () => {
      const bookings = [
        { _id: 'booking123', userId: 'user123', doctorId: 'doctor123' },
        { _id: 'booking124', userId: 'user124', doctorId: 'doctor124' }
      ];

      Booking.find.mockResolvedValue(bookings); // Mock the return value of find

      const response = await request(app).get('/bookings');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(bookings);
    });

    it('should return 500 if there is an error fetching bookings', async () => {
      Booking.find.mockRejectedValue(new Error('Error fetching bookings'));

      const response = await request(app).get('/bookings');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error fetching bookings');
    });
  });

  describe('GET /bookings/user/:userId', () => {
    it('should fetch bookings by user ID', async () => {
      const userId = 'user123';
      const bookings = [
        { _id: 'booking123', userId: 'user123', doctorId: 'doctor123' },
        { _id: 'booking124', userId: 'user123', doctorId: 'doctor124' }
      ];

      Booking.find.mockResolvedValue(bookings);

      const response = await request(app).get(`/bookings/user/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(bookings);
    });

    it('should return 500 if there is an error fetching bookings by user ID', async () => {
      const userId = 'user123';
      Booking.find.mockRejectedValue(new Error('Error fetching bookings'));

      const response = await request(app).get(`/bookings/user/${userId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error fetching bookings');
    });
  });

  describe('DELETE /bookings/:id', () => {
    it('should delete a booking', async () => {
      const bookingId = 'booking123';

      Booking.findByIdAndDelete.mockResolvedValue({ _id: bookingId });

      const response = await request(app).delete(`/bookings/${bookingId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Booking deleted');
    });

    it('should return 500 if there is an error deleting the booking', async () => {
      const bookingId = 'booking123';
      Booking.findByIdAndDelete.mockRejectedValue(new Error('Error deleting booking'));

      const response = await request(app).delete(`/bookings/${bookingId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error deleting booking');
    });
  });

  describe('GET /bookings/past/:id', () => {
    it('should fetch past bookings by doctor ID', async () => {
      const doctorId = 'doctor123';
      const pastBookings = [
        { _id: 'booking123', doctorId, date: '2024-10-14' },
        { _id: 'booking124', doctorId, date: '2024-10-10' }
      ];

      Booking.find.mockResolvedValue(pastBookings);

      const response = await request(app).get(`/bookings/past/${doctorId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(pastBookings);
    });

    it('should return 500 if there is an error fetching past bookings', async () => {
      const doctorId = 'doctor123';
      Booking.find.mockRejectedValue(new Error('Error fetching past bookings'));

      const response = await request(app).get(`/bookings/past/${doctorId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error fetching past bookings');
    });
  });

  describe('GET /bookings/history/:id', () => {
    it('should fetch appointment history by user ID', async () => {
      const userId = 'user123';
      const pastBookings = [
        { _id: 'booking123', userId, date: '2024-10-14' },
        { _id: 'booking124', userId, date: '2024-10-10' }
      ];

      Booking.find.mockResolvedValue(pastBookings);

      const response = await request(app).get(`/bookings/history/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(pastBookings);
    });

    it('should return 500 if there is an error fetching appointment history', async () => {
      const userId = 'user123';
      Booking.find.mockRejectedValue(new Error('Error fetching appointment history'));

      const response = await request(app).get(`/bookings/history/${userId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error fetching past bookings');
    });
  });
});
