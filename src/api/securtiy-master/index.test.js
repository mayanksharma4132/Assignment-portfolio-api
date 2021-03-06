import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { SecurtiyMaster } from '.'

const app = () => express(apiRoot, routes)

let securtiyMaster

beforeEach(async () => {
  securtiyMaster = await SecurtiyMaster.create({})
})

test('POST /securtiy-masters 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('GET /securtiy-masters 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /securtiy-masters/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${securtiyMaster.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(securtiyMaster.id)
})

test('GET /securtiy-masters/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /securtiy-masters/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${securtiyMaster.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(securtiyMaster.id)
})

test('PUT /securtiy-masters/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /securtiy-masters/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${securtiyMaster.id}`)
  expect(status).toBe(204)
})

test('DELETE /securtiy-masters/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
