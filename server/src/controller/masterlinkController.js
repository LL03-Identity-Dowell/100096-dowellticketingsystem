import jwt from 'jsonwebtoken'
import { masterlinkValidationSchema } from '../service/validationService.js'
import responseMessage from '../constant/responseMessage.js'
import httpError from '../util/httpError.js'
import { v4 as uuidv4 } from 'uuid'
import Masterlink from '../models/masterlinkModel.js'
import httpResponse from '../util/httpResponse.js'

const generateLink = async (req, res) => {
    const { error, value } = masterlinkValidationSchema.validate(req.body)
    if (error) {
        return httpError(req, res, 404, responseMessage.VALIDATION_ERROR, error.details[0].message)
    }
    const { workspace_id, api_key, number_of_links, product_distribution, usernames } = value;
    const existingLink = await Masterlink.findOne({ api_key, workspace_id });
    if (existingLink) {
        // return httpError(req, res, 409, responseMessage.DUPLICATED_ENTRY)
        return res.status(409).json({
            message: 'The link already exists',
        });
    }

    const link_id = uuidv4()

    const baseUrl = 'https://www.dowellchat.uxlivinglab.online/'
    const master_link = `${baseUrl}api/share/?link_id=${link_id}`
    const payload = {
        link_id,
        number_of_links,
        available_links: number_of_links,
        product_distribution,
        usernames,
        is_active: true,
        master_link,
        workspace_id,
        api_key
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'Michael_secret_key'
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: '2h' })
    const link = `${baseUrl}?token=${token}`

    try {
        const masterlink = new Masterlink({
            link_id,
            number_of_links,
            available_links: number_of_links,
            product_distribution,
            usernames,
            is_active: true,
            link,
            master_link,
            workspace_id,
            api_key
        })

        await masterlink.save()

        return httpResponse(req, res, 200, responseMessage.SUCCESS, {
            token,
            link_id,
            master_link,
            number_of_links,
            available_links: number_of_links,
            product_distribution,
            usernames,
            is_active: true,
            workspace_id,
            api_key,
            link
        })
    } catch (error) {
        return httpError(req, res, 500, responseMessage.SOMETHING_WENT_WRONG, error.message)
    }
}

export default {
    generateLink
}