import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../Server.js';

// 1. Ensuring JWT_SECRET is defined for the tests
process.env.JWT_SECRET = 'test_jwt_secret_key';

// Mock userModel using a standard ES6 Class
vi.mock('../models/userModel.js', () => {
    // 1. Created the mock save function
    const mockSave = vi.fn().mockResolvedValue({
        _id: 'mocked_user_id',
        name: 'Jane Doe',
        email: 'jane@example.com'
    });

    // 2. Created a standard class that can be constructed with new keyword
    class MockUserModel {
        constructor(data) {
            // Copy the user data  to the instance
            Object.assign(this, data);
        }

        // Attach the save method to the instance
        save = mockSave;

        // Attach static methods to the class itself
        static findOne = vi.fn();
    }

    return {
        default: MockUserModel
    };
});

describe('POST /api/user/register', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fail if name, email, or password is missing', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({ name: '', email: '', password: '' });

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Missing Details');
    });

    it('should fail if email is invalid', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({ name: 'Jane Doe', email: 'not-an-email', password: 'password123' });

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Please enter a valid email');
    });

    it('should fail if password is less than 8 characters', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({ name: 'Jane Doe', email: 'jane@example.com', password: '123' });

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Please enter a strong password');
    });
   
     it('should successfully register a user with correct details', async () => {
    const response = await request(app)
        .post('/api/user/register')
        .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'strongpassword123' });

    // debuggging
    //console.log("RESPONSE BODY:", response.body); 

    expect(response.body.success).toBe(true);
});

});