import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
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
 * @apiParam {String} Portfolio_id portfolio in which security is there.
 * @apiParam {String} Security_id security in which trade happened.
 * @apiParam {String} Type type of trade ['BUY','SELL'].
 * @apiParam {Number} Quantity quantity no of trades.
 * @apiParam {Number} Price price price of buy or sell.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.post('/',
  body({
    Portfolio_id: {
      type: String
    },
    Security_id: {
      type: String
    },
    Type: {
      type: String,
      enum: ['BUY','SELL']
    },
    Quantity: {
      type: Number,
      min: 0
    },
    Price: {
      type: Number,
      min: 0
    }
  }),
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
 * @apiParam {String} Portfolio_id portfolio in which security is there.
 * @apiParam {String} Security_id security in which trade happened.
 * @apiParam {String} Type type of trade ['BUY','SELL'].
 * @apiParam {Number} Quantity quantity no of trades.
 * @apiParam {Number} Price price price of buy or sell.
 * @apiSuccess {Object} trade Trade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trade not found.
 */
router.put('/:id',
  body({
    Portfolio_id: {
      type: String
    },
    Security_id: {
      type: String
    },
    Type: {
      type: String,
      enum: ['BUY','SELL']
    },
    Quantity: {
      type: Number,
      min: 0
    },
    Price: {
      type: Number,
      min: 0
    }
  }),
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
