const server = require('../../index.js');
const supertest = require('supertest');
const expect = require('chai').expect;
const requestWithSupertest = supertest(server);
let id = null

if (process.env.NODE_ENV !== 'test') {
  console.log("Please set your NODE_ENV = test")
  return
}
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

    id = response.body.result._id
  })

  it('GET /movies should show all movies', async () => {
    const response = await requestWithSupertest.get('/movies');
    expect(response.status).to.eql(200);
  });

  it('DELETE /movies should remove record', async () => {
    const response = await requestWithSupertest.delete(`/movies/${id}`);
    expect(response.status).to.eql(200);
  });
});