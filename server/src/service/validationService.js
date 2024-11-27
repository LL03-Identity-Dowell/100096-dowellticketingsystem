import Joi from 'joi'
import mongoose from 'mongoose'

export const ticketValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    link_id: Joi.string().optional(),
    workspace_id: Joi.string().optional(),
    department: Joi.string().required(),
    user_id: Joi.string().optional(),
    public_id: Joi.string().optional(),
    product: Joi.string().required(),
    display_name: Joi.string().optional(),
    line_manager: Joi.array().items(Joi.string()).optional(),
    is_closed: Joi.boolean().default(false),
    waiting_time: Joi.number().default(0),
    document_id: Joi.string().optional()
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
    api_key: Joi.string().required()
})

export const topicControllerValidation = Joi.object({
    room_name: Joi.string().required(),
    workspace_id: Joi.string().required(),
    id: Joi.string().optional()
})

export const lineManagerValidationSchema = Joi.object({

    user_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),  // Validates as a MongoDB ObjectId
    ticket_ids: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),  // Array of ObjectId strings
    // department: Joi.string().required(),
    positions_in_a_line: Joi.number().integer(),  // Assuming it should be an integer
    average_serving_time: Joi.number(),  // Allows float or integer
    ticket_count: Joi.number().integer().default(0),
    is_active: Joi.boolean().default(true),
    workspace: Joi.string().required()
})
