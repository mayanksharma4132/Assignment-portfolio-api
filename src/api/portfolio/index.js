import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, returns } from './controller'
export Portfolio, { schema } from './model'

const router = new Router()

/**
 * @api {post} /portfolio Create portfolio
 * @apiName CreatePortfolio
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiParam {String} user_id user ID of the user
 * @apiSuccess {Object} portfolio Portfolio's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Portfolio not found.
 */
router.post('/',
  token({ required: true }),
  create)

/**
 * @api {get} /portfolio Retrieve portfolios
 * @apiName RetrievePortfolios
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} portfolios List of portfolios.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /portfolio/:id Retrieve portfolio
 * @apiName RetrievePortfolio
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} portfolio Portfolio's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Portfolio not found.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /portfolio/:id Update portfolio
 * @apiName UpdatePortfolio
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiParam {String} user_id user ID of the user
 * @apiSuccess {Object} portfolio Portfolio's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Portfolio not found.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /portfolio/:id Delete portfolio
 * @apiName DeletePortfolio
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Portfolio not found..
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

/**
 * @api {get} /portfolio/returns/:id RetrieveReturnsOnPortfolio
 * @apiName RetrieveReturnsOnPortfolio
 * @apiGroup Portfolio
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} Returns Returns on the portfolio.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Portfolio not found.
 */
router.get('/returns/:id',
  token({ required: true }),
  returns)

export default router
