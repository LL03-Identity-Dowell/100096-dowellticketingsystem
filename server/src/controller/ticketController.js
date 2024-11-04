import responseMessage from '../constant/responseMessage.js';
import Ticket from '../models/ticketModel.js';
import PublicIds from '../models/publicIdsModel.js';
import LineManager from '../models/lineManagerModel.js';  // Import LineManager model
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
                return httpError(req, res, 400, responseMessage.NO_AVAILABLE_PUBLIC_IDS);
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

<<<<<<< HEAD
export default { 
    createTicket,
    deleteTicket,  
}
=======
export default {
    createTicket
};
>>>>>>> 0fa2cf305d438dc5d340b6d35cd0e64ff1b36df0
