const app = require('../fileServer');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

describe("API Tests", () => {
  test("GET /files should return list of files", async () => {
    const response = await request(app).get('/files');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /file/:filename should return file content", async () => {
    const response = await request(app).get('/file/a.txt');
    if (response.statusCode === 200) {
      expect(response.text).toBeDefined();
    } else {
      expect(response.statusCode).toBe(404);
    }
  });
});