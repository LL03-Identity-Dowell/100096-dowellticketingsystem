import Ticket from '../models/Ticket.js';

const create = async (req, res) => {
    try {
        const { email, department, product } = req.body;

        // Check if a similar active ticket already exists
        const existingTicket = await Ticket.findOne({ email, department, product, is_closed: false });
        
        if (existingTicket) {
            return res.status(400).json({
                message: 'Ticket already exists',
            });
        }

        // Create and save the new ticket             
        const ticketData = new Ticket(req.body);
        const newTicket = await ticketData.save();

        // Return success response with status code 201 (Created)
        res.status(201).json({
            message: 'Ticket created successfully',
            data: newTicket,
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        // Send error response
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


export default {
    create,
}