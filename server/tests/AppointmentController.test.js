require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Import the controller and create a mock app for testing
const appointmentController = require('../controller/AppointmentController');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

// Create a mock Express app
const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/appointments', appointmentController.createAppointment);
app.get('/appointments', appointmentController.getAppointments);
app.delete('/appointments/:id', appointmentController.deleteAppointment);

jest.mock('../models/Appointment');
jest.mock('../models/User');
jest.mock('../models/Hospital');

describe('Appointment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /appointments', () => {
    it('should create a new appointment', async () => {
      const reqBody = {
        doctorName: 'Dr. Smith',
        hospitalName: 'City Hospital',
        appointmentTimeSlot: '10:00 AM - 11:00 AM',
        appointmentDate: '2024-10-15',
        maxPatients: 5,
      };

      const mockDoctor = { _id: '12345', fullName: 'Dr. Smith', userType: 'doctor' };
      const mockHospital = { _id: '67890', name: 'City Hospital' };

      User.findOne.mockResolvedValue(mockDoctor);
      Hospital.findOne.mockResolvedValue(mockHospital);
      Appointment.prototype.save.mockResolvedValue({ ...reqBody, user: mockDoctor._id, hospital: mockHospital._id });

      const response = await request(app).post('/appointments').send(reqBody);

    //   expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user', mockDoctor._id);
      expect(response.body).toHaveProperty('hospital', mockHospital._id);
    });

    it('should return 404 if doctor is not found', async () => {
      const reqBody = {
        doctorName: 'Dr. NonExistent',
        hospitalName: 'City Hospital',
        appointmentTimeSlot: '10:00 AM - 11:00 AM',
        appointmentDate: '2024-10-15',
        maxPatients: 5,
      };

      User.findOne.mockResolvedValue(null); // Doctor not found

      const response = await request(app).post('/appointments').send(reqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Doctor not found');
    });

    it('should return 404 if hospital is not found', async () => {
      const reqBody = {
        doctorName: 'Dr. Smith',
        hospitalName: 'NonExistent Hospital',
        appointmentTimeSlot: '10:00 AM - 11:00 AM',
        appointmentDate: '2024-10-15',
        maxPatients: 5,
      };

      const mockDoctor = { _id: '12345', fullName: 'Dr. Smith', userType: 'doctor' };

      User.findOne.mockResolvedValue(mockDoctor);
      Hospital.findOne.mockResolvedValue(null); // Hospital not found

      const response = await request(app).post('/appointments').send(reqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Hospital not found');
    });
  });

  describe('GET /appointments', () => {
    it('should retrieve all appointments', async () => {
      const mockAppointments = [
        { _id: 'abc123', doctorName: 'Dr. Smith', hospitalName: 'City Hospital' },
        { _id: 'def456', doctorName: 'Dr. Doe', hospitalName: 'Town Hospital' },
      ];

      Appointment.find.mockResolvedValue(mockAppointments); // Mock find method

      const response = await request(app).get('/appointments');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAppointments);
    });
  });

  describe('DELETE /appointments/:id', () => {
    it('should delete an appointment', async () => {
      const mockId = 'abc123';
      Appointment.findByIdAndDelete.mockResolvedValue({}); // Mock delete method

      const response = await request(app).delete(`/appointments/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Appointment deleted');
    });

    it('should return 404 if appointment not found', async () => {
      const mockId = 'abc123';
      Appointment.findByIdAndDelete.mockResolvedValue(null); // No appointment found

      const response = await request(app).delete(`/appointments/${mockId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Appointment not found');
    });
  });
});
