const request = require('supertest');
const server = require('../index.js'); // Import the server instance

describe('POST /login', () => {
  test('It should respond with a token on successful login', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ email: 'user@example.com', password: 'password' });

    expect(response.statusCode).toBe(200); // Expecting status 200 for successful login
    expect(response.body.token).toBeTruthy();
  });

  test('It should respond with an error message on invalid login', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ email: 'example@example.com', password: 'wrongpassword' });

    expect(response.statusCode).toBe(401); // Expecting status 401 for invalid login
    expect(response.body.message).toBe('Invalid email or password');
  });
});

afterAll((done) => {
  server.close(done); // Close the server after all tests are done
});
