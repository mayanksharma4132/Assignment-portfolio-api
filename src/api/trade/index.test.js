import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Trade } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, trade

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  trade = await Trade.create({})
})

test('POST /trade 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /trade 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /trade 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trade 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /trade 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /trade 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trade/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${trade.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trade.id)
})

test('GET /trade/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${trade.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /trade/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${trade.id}`)
  expect(status).toBe(401)
})

test('GET /trade/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /trade/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${trade.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trade.id)
})

test('PUT /trade/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trade.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /trade/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trade.id}`)
  expect(status).toBe(401)
})

test('PUT /trade/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession })
  expect(status).toBe(404)
})

test('DELETE /trade/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trade.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /trade/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trade.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /trade/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trade.id}`)
  expect(status).toBe(401)
})

test('DELETE /trade/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
