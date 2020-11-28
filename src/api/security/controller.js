import { success, notFound } from '../../services/response/'
import { Security } from '.'


export const addToPortfolio = ({ body }, res, next) => {
  
}

export const create = ({ body }, res, next) =>
  Security.create(body)
    .then((security) => security.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Security.find(query, select, cursor)
    .then((securities) => securities.map((security) => security.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Security.findById(params.id)
    .then(notFound(res))
    .then((security) => security ? security.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Security.findById(params.id)
    .then(notFound(res))
    .then((security) => security ? Object.assign(security, body).save() : null)
    .then((security) => security ? security.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Security.findById(params.id)
    .then(notFound(res))
    .then((security) => security ? security.remove() : null)
    .then(success(res, 204))
    .catch(next)
