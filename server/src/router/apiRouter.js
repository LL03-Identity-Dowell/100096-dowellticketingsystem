import { Router } from 'express'
import apiController from '../controller/apiController.js'
import ticketController from '../controller/ticketController.js'
import masterlinkController from '../controller/masterlinkController.js'
import metaRoutes from './metaRoutes.js'; // Import the Meta routes
import roomRoutes from './roomRouter.js';
import topicRoutes from './topicRouter.js';
import workspaceRoutes from './workspaceRouter.js';
const router = Router()

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// Ticket CRUD routes
router.route('/create-ticket').post(ticketController.createTicket)

// Masterlink creation routes
router.route('/generate-masterlink').post(masterlinkController.generateLink)

// Meta CRUD routes
router.use('/', metaRoutes);
// Room CRUD routes
router.use('/', roomRoutes);

// Topic CRUD routes
router.use('/', topicRoutes);

// Workspace CRUD routes
router.use('/', workspaceRoutes); 
export default router

