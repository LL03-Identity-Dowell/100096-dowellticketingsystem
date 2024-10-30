import { Router } from 'express'
import apiController from '../controller/apiController.js'
import ticketController from '../controller/ticketController.js'

const router = Router()

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// For creating Tickets
router.route('/create-ticket').post(ticketController.create)

export default router