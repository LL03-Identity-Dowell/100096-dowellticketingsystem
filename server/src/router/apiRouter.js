import { Router } from 'express'
import apiController from '../controller/apiController.js'
import ticketController from '../controller/ticketController.js'

const router = Router()

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// Ticket CRUD routes
router.route('/create-ticket').post(ticketController.createTicket)
router.route('/delete-ticket/:id').delete(ticketController.deleteTicket)

export default router 