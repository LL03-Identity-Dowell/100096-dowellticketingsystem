import responseMessage from '../constant/responseMessage.js'
import Ticket from '../models/ticketModel.js'
import httpError from '../util/httpError.js'
import httpResponse from '../util/httpResponse.js'
import { ticketValidationSchema } from '../service/validationService.js'

const createTicket = async (req, res) => {
    try {
        // Validate request body
        const { error } = ticketValidationSchema.validate(req.body)
        if (error) {
            return httpError(req, res, 422, responseMessage.VALIDATION_ERROR, error.details[0].message)
        }

        const { email, department, product } = req.body

        // Check if a similar active ticket already exists
        const existingTicket = await Ticket.findOne({ email, department, product, is_closed: false })
        if (existingTicket) {
            return httpError(req, res, 409, responseMessage.ALREADY_EXIST('Ticket')) // 409 Conflict
        }

        // Create and save the new ticket
        const ticketData = new Ticket(req.body)
        const newTicket = await ticketData.save()

        // Return success response with status code 201 (Created)
        return httpResponse(req, res, 200, responseMessage.CREATE_DATA, newTicket)
    } catch (error) {
        console.error('Error creating ticket:', error)
        // Send error response for server error
        return httpError(req, res, 500, responseMessage.NOT_CREATE_DATA, error.message)
    }
}

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log('Request params:', req.params);
        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) {
            return httpError(req, res, 404, responseMessage.NOT_FOUND('Ticket'));
        }

        return httpResponse(req, res, 200, responseMessage.SUCCESS, `Ticket with ID ${id} has been deleted.`);
    } catch (error) {
        console.error('Error deleting ticket:', error);
        return httpError(req, res, 500, responseMessage.SOMETHING_WENT_WRONG, error.message);
    }
}; 

export default { 
    createTicket,
    deleteTicket,  
}
