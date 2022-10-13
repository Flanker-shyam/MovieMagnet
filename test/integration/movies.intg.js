const server = require('../../index.js');
const supertest = require('supertest');
const expect = require('chai').expect;
const requestWithSupertest = supertest(server);

describe('Movie Endpoints', () => {
  it('POST /movies should add a movie', async () => {
    const response = await requestWithSupertest
    .post('/movies')
    .send('name=test movie')
    .send('tags=test')
    .send('tags=test2')
    .send('genre=test')
    .send('category=test2')
    .set('Accept', 'application/json')
    expect(response.status).to.eql(200)
  })

  it('GET /movies should show all movies', async () => {
    const response = await requestWithSupertest.get('/movies');
    expect(response.status).to.eql(200);
  });
});