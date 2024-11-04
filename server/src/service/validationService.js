import Joi from 'joi'

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

export const masterlinkValidationSchema = Joi.object({
    link_id: Joi.string().optional(),
    number_of_links: Joi.number().required(),
    product_distribution: Joi.object().required(),
    usernames: Joi.array().items(Joi.string()).required(),
    is_active: Joi.boolean().required(),
    link: Joi.string().optional(),
    master_link: Joi.string().optional(),
    workspace_id: Joi.string().required(),
    available_links: Joi.number().required(),
    api_key: Joi.string().required(),
})

export const topicControllerValidation = Joi.object({
    room_name: Joi.string().required(),
    workspace_id: Joi.string().required(),
    id: Joi.string().optional()
})