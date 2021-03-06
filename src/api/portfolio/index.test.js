import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Portfolio } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, portfolio

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  portfolio = await Portfolio.create({})
})

test('POST /portfolio 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /portfolio 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /portfolio 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /portfolio 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /portfolio 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /portfolio 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /portfolio/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${portfolio.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(portfolio.id)
})

test('GET /portfolio/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${portfolio.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /portfolio/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${portfolio.id}`)
  expect(status).toBe(401)
})

test('GET /portfolio/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /portfolio/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${portfolio.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(portfolio.id)
})

test('PUT /portfolio/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${portfolio.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /portfolio/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${portfolio.id}`)
  expect(status).toBe(401)
})

test('PUT /portfolio/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession })
  expect(status).toBe(404)
})

test('DELETE /portfolio/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${portfolio.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /portfolio/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${portfolio.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /portfolio/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${portfolio.id}`)
  expect(status).toBe(401)
})

test('DELETE /portfolio/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
