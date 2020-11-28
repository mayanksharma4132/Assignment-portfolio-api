import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
export SecurtiyMaster, { schema } from './model'

const router = new Router()

/**
 * @api {post} /securtiy-masters Create securtiy master
 * @apiName CreateSecurtiyMaster
 * @apiGroup SecurtiyMaster
 * @apiSuccess {Object} securtiyMaster Securtiy master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Securtiy master not found.
 */
router.post('/',
  token({required: true}),
  create)

/**
 * @api {get} /securtiy-masters Retrieve securtiy masters
 * @apiName RetrieveSecurtiyMasters
 * @apiGroup SecurtiyMaster
 * @apiUse listParams
 * @apiSuccess {Object[]} securtiyMasters List of securtiy masters.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({required: true}),
  query(),
  index)

/**
 * @api {get} /securtiy-masters/:id Retrieve securtiy master
 * @apiName RetrieveSecurtiyMaster
 * @apiGroup SecurtiyMaster
 * @apiSuccess {Object} securtiyMaster Securtiy master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Securtiy master not found.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {put} /securtiy-masters/:id Update securtiy master
 * @apiName UpdateSecurtiyMaster
 * @apiGroup SecurtiyMaster
 * @apiSuccess {Object} securtiyMaster Securtiy master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Securtiy master not found.
 */
router.put('/:id',
  token({required: true}),
  update)

/**
 * @api {delete} /securtiy-masters/:id Delete securtiy master
 * @apiName DeleteSecurtiyMaster
 * @apiGroup SecurtiyMaster
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Securtiy master not found.
 */
router.delete('/:id',
  token({required: true}),
  destroy)

export default router
