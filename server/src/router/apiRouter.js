import { Router } from 'express'
import apiController from '../controller/apiController.js'
import ticketController from '../controller/ticketController.js'
import masterlinkController from '../controller/masterlinkController.js'
import metaRoutes from './metaRouter.js';  // Import the Meta routes
import roomRoutes from './roomRouter.js';  // Import the Room routes
import topicRoutes from './topicRouter.js';  // Import the Topic routes
import workspaceRoutes from './workspaceRouter.js';  // Import the Workspace routes
import lineRouters from './lineManagerRouter.js';
const router = Router();

// General API Routes
router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);

// Ticket CRUD routes
router.route('/create-ticket').post(ticketController.createTicket)
router.route('/tickets').get(ticketController.getAllTickets)           
router.route('/tickets/:id').get(ticketController.getTicketById)     
router.route('/tickets/:id/close').put(ticketController.closeTicket)   

// Masterlink creation routes
router.route('/generate-masterlink').post(masterlinkController.generateLink);
// Meta CRUD routes
router.use('/meta', metaRoutes); 
// Meta CRUD routes
router.use('/meta', metaRoutes); 
// Room CRUD routes
router.use('/rooms', roomRoutes);  // Prefix '/rooms' for room routes

// Topic CRUD routes
router.use('/topics', topicRoutes);  // Prefix '/topics' for topic routes

// Workspace CRUD routes
router.use('/workspaces', workspaceRoutes);  // Prefix '/workspaces' for workspace routes
// LineManager CRUD routes
router.use('/lineManagers', lineRouters);  // Prefix '/workspaces' for workspace routes

export default router;
