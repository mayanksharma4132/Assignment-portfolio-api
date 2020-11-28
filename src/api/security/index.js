import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy,addToPortfolio } from './controller'
export Security, { schema } from './model'

const router = new Router()


/**
 * @api {post} /security Create security
 * @apiName CreateSecurity
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} security Security's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Security not found.

 */

router.post('/addToPortfolio',
  token({required: true}),
  addToPortfolio)


/**
 * @api {post} /security Create security
 * @apiName CreateSecurity
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} security Security's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Security not found.

 */
router.post('/',
  token({ required: true}),
  create)

/**
 * @api {get} /security Retrieve securities
 * @apiName RetrieveSecurities
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} securities List of securities.
 * @apiError {Object} 400 Some parameters may contain invalid values.

 */
router.get('/',
  token({ required: true}),
  query(),
  index)

/**
 * @api {get} /security/:id Retrieve security
 * @apiName RetrieveSecurity
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} security Security's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Security not found.

 */
router.get('/:id',
  token({ required: true}),
  show)

/**
 * @api {put} /security/:id Update security
 * @apiName UpdateSecurity
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess {Object} security Security's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Security not found.

 */
router.put('/:id',
  token({ required: true}),
  update)

/**
 * @api {delete} /security/:id Delete security
 * @apiName DeleteSecurity
 * @apiGroup Security
 * @apiPermission User
 * @apiParam {String} access_token User access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Security not found.

 */
router.delete('/:id',
  token({ required: true}),
  destroy)

export default router
