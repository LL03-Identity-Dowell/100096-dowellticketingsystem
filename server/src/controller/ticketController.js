import responseMessage from '../constant/responseMessage.js';
import Ticket from '../models/ticketModel.js';
import PublicIds from '../models/publicIdsModel.js';
import LineManager from '../models/lineManagerModel.js'; 
import httpError from '../util/httpError.js';
import httpResponse from '../util/httpResponse.js';
import { ticketValidationSchema } from '../service/validationService.js';
import { assignLineManager } from '../helpers/lineManagerHelpers.js';
import { getWorkspaceIdFromLink, getLinkIdFromMasterlink } from '../helpers/idHelpers.js';

const createTicket = async (req, res) => {
    try {
        const { error } = ticketValidationSchema.validate(req.body);
        if (error) {
            return httpError(req, res, 422, responseMessage.VALIDATION_ERROR, error.details[0].message);
        }

        const { email, department, product, display_name } = req.body;

        const workspace_id = await getWorkspaceIdFromLink(req); 
        const link_id = await getLinkIdFromMasterlink(req); 
        const line_manager = await assignLineManager(department);

        let public_id = req.body.public_id;
        if (!public_id) {
            const publicIdRecord = await PublicIds.findOne({ type: 'master', available_ids: { $exists: true, $ne: [] } });

            if (!publicIdRecord || publicIdRecord.available_ids.length === 0) {
                return httpError(req, res, 404, responseMessage.NO_AVAILABLE_PUBLIC_IDS);
            }

            public_id = publicIdRecord.available_ids.pop();
            await PublicIds.findByIdAndUpdate(
                publicIdRecord._id,
                {
                    $pull: { available_ids: public_id },
                    $push: { used_ids: { public_id, availability_status: false } }
                }
            );
        }

        const openTickets = await Ticket.countDocuments({
            line_manager: line_manager[0],
            is_closed: false
        });
        const waiting_time = openTickets * 5; 

        await LineManager.findByIdAndUpdate(
            line_manager[0],
            { $inc: { ticket_count: 1 } }
        );

        const newTicket = new Ticket({
            email,
            department,
            product,
            display_name,
            workspace_id,
            link_id,
            line_manager,
            public_id,
            waiting_time
        });
        await newTicket.save();

        return httpResponse(req, res, 201, responseMessage.CREATE_DATA, newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        return httpError(req, res, 500, responseMessage.NOT_CREATE_DATA, error.message);
    }
};

const closeTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return httpError(req, res, 404, responseMessage.NOT_FOUND('Ticket'));
        }

        if (ticket.is_closed) {
            return httpError(req, res, 400, 'Ticket is already closed');
        }

        ticket.is_closed = true;
        await ticket.save();

        await PublicIds.findOneAndUpdate(
            { "used_ids.public_id": ticket.public_id },
            {
                $pull: { used_ids: { public_id: ticket.public_id } },
                $push: { available_ids: ticket.public_id }
            }
        );

        return httpResponse(req, res, 200, 'Ticket closed and public_id returned to available', ticket);
    } catch (error) {
        console.error('Error closing ticket:', error);
        return httpError(req, res, 500, 'Failed to close ticket', error.message);
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        return httpResponse(req, res, 200, 'Tickets retrieved successfully', tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        return httpError(req, res, 500, 'Failed to retrieve tickets', error.message);
    }
};

// Get a ticket by its ID
const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return httpError(req, res, 404, responseMessage.NOT_FOUND('Ticket'));
        }
        return httpResponse(req, res, 200, 'Ticket retrieved successfully', ticket);
    } catch (error) {
        console.error('Error retrieving ticket:', error);
        return httpError(req, res, 500, 'Failed to retrieve ticket', error.message);
    }
};

export default {
    createTicket,
    closeTicket,
    getAllTickets,
    getTicketById
};
