import { success, notFound } from '../../services/response/'
import { createTrade, updateTrade, removeTrade, showAllTrades} from './service';
import { Trade } from '.'

export const create = ({ body }, res, next) =>
  createTrade(body)
    .then((trade) => trade.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  showAllTrades()
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Trade.findById(params.id)
    .then(notFound(res))
    .then((trade) => trade ? trade.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body,params }, res, next) =>
  updateTrade(body,params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
removeTrade(params.id)
    .then(notFound(res))
    .then(success(res, 204))
    .catch(next)
