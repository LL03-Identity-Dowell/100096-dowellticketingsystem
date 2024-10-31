import Joi from "joi";

export const ticketValidationSchema = Joi.object({
    email: Joi.string().required(),
    link_id: Joi.string().required(),
    workspace_id: Joi.string().required(),
    department: Joi.string().required(),
    user_id: Joi.string().required(),
    public_id: Joi.string().required(),
    product: Joi.string().required(),
    display_name: Joi.string().required(),
    line_manager: Joi.string().required(),
    is_closed: Joi.boolean().required(),
    waiting_time: Joi.number().required(),
    document_id: Joi.string().required()
})