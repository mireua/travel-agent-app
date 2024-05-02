const request = require('supertest');
const server = require('../index.js'); // Import the server instance

describe('POST /register', () => {
  test('It should register a new user successfully', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const response = await request(server)
      .post('/api/register')
      .send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Registration successful.');
  });

  test('It should return an error if the email is already registered', async () => {
    const existingUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123'
    };

    // Register the existing user first
    await request(server)
      .post('/api/register')
      .send(existingUser);

    // Attempt to register the same user again
    const response = await request(server)
      .post('/api/register')
      .send(existingUser);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe('Email already registered.');
  });
});

afterAll((done) => {
  server.close(done);
});