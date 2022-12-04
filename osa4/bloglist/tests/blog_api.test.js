const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('bloglist returns correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})

afterAll(() => {
  mongoose.connection.close()
})