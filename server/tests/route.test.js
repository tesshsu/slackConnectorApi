const request = require('supertest');
const app = require('../src/api');

describe('Integration logs API', () => {
    test('GET /integration-logs should return 200 OK', async () => {
        const response = await request(app).get('/integration-logs');
        expect(response.statusCode).toBe(200);
    });

    test('GET /integration-logs should return JSON data', async () => {
        const response = await request(app).get('/integration-logs');
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('GET /integration-logs should return an array of logs', async () => {
        const response = await request(app).get('/integration-logs');
        expect(response.body).toBeInstanceOf(Array);
    });
});
