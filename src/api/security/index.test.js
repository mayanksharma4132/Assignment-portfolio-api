import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Security } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, security

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  security = await Security.create({})
})

test('POST /security 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /security 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /security 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /security 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /security 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /security 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /security/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${security.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(security.id)
})

test('GET /security/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${security.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /security/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${security.id}`)
  expect(status).toBe(401)
})

test('GET /security/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /security/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${security.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(security.id)
})

test('PUT /security/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${security.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /security/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${security.id}`)
  expect(status).toBe(401)
})

test('PUT /security/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession })
  expect(status).toBe(404)
})

test('DELETE /security/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${security.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /security/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${security.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /security/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${security.id}`)
  expect(status).toBe(401)
})

test('DELETE /security/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
