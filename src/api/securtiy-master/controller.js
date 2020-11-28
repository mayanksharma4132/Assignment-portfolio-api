import { success, notFound } from '../../services/response/'
import { SecurtiyMaster } from '.'

export const create = ({ body }, res, next) =>
  SecurtiyMaster.create(body)
    .then((securtiyMaster) => securtiyMaster.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  SecurtiyMaster.find(query, select, cursor)
    .then((securtiyMasters) => securtiyMasters.map((securtiyMaster) => securtiyMaster.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  SecurtiyMaster.findById(params.id)
    .then(notFound(res))
    .then((securtiyMaster) => securtiyMaster ? securtiyMaster.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  SecurtiyMaster.findById(params.id)
    .then(notFound(res))
    .then((securtiyMaster) => securtiyMaster ? Object.assign(securtiyMaster, body).save() : null)
    .then((securtiyMaster) => securtiyMaster ? securtiyMaster.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  SecurtiyMaster.findById(params.id)
    .then(notFound(res))
    .then((securtiyMaster) => securtiyMaster ? securtiyMaster.remove() : null)
    .then(success(res, 204))
    .catch(next)
