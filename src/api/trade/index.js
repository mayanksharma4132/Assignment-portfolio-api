import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export Trade, { schema } from './model'

const router = new Router()

/**
 * @api {post} /trade Create trade
 * @apiName CreateTrade
 * @apiGroup Trade
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /trade Retrieve trades
 * @apiName RetrieveTrades
 * @apiGroup Trade
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} trades List of trades.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /trade/:id Retrieve trade
 * @apiName RetrieveTrade
 * @apiGroup Trade
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /trade/:id Update trade
 * @apiName UpdateTrade
 * @apiGroup Trade
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /trade/:id Delete trade
 * @apiName DeleteTrade
 * @apiGroup Trade
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Trade not found.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
