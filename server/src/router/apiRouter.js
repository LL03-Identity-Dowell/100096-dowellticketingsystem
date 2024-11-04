import { Router } from 'express'
import apiController from '../controller/apiController.js'
import ticketController from '../controller/ticketController.js'
import masterlinkController from '../controller/masterlinkController.js'
import topicController from '../controller/topicController.js'

const router = Router()

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// Ticket CRUD routes
router.route('/create-ticket').post(ticketController.createTicket)
router.route('/delete-ticket/:id').delete(ticketController.deleteTicket)

// Masterlink creation routes
router.route('/generate-masterlink').post(masterlinkController.generateLink)
// Topic CRUD routes
router.route('/create-topic').post(topicController.createTopic)
router.route('/delete-topic/:id').delete(topicController.deleteTopic)

export default router
