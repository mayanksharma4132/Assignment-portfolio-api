import { success, notFound } from '../../services/response/'
import { Portfolio } from '.'
import { getPortfolio,getReturnsOnPortfolio } from './service';

export const create = ({ body }, res, next) =>
  Portfolio.create(body)
    .then((portfolio) => portfolio.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Portfolio.find(query, select, cursor)
    .then((portfolios) => portfolios.map((portfolio) => portfolio.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  getPortfolio(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Portfolio.findById(params.id)
    .then(notFound(res))
    .then((portfolio) => portfolio ? Object.assign(portfolio, body).save() : null)
    .then((portfolio) => portfolio ? portfolio.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Portfolio.findById(params.id)
    .then(notFound(res))
    .then((portfolio) => portfolio ? portfolio.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const returns = ({ params }, res, next) =>
  getReturnsOnPortfolio(params.id)
  .then(success(res))
  .catch(next)
