import { topicControllerValidation } from '../service/validationService.js'
import responseMessage from '../constant/responseMessage.js'
import Topic from '../models/topicModel.js'
import httpError from '../util/httpError.js'
import httpResponse from '../util/httpResponse.js'
import { v4 as uuidv4 } from 'uuid'

const createTopic = async (req, res) => {
    try {
        //Validating req body
        const { error } = topicControllerValidation.validate(req.body)
        if (error) {
            return httpError(req, res, 422, responseMessage.VALIDATION_ERROR, error.details[0].message)
        }
        const { room_name, workspace_id, } = req.body
        //check for similar rooms
        const checkforpreviousrooms = await Topic.findOne({ room_name, workspace_id })
        console.log(checkforpreviousrooms)
        if (checkforpreviousrooms) {
            return httpError(req, res, 409, responseMessage.ALREADY_EXIST("Topic"))
        }
        //create new topic
        const topicData = new Topic(req.body)
        const newTopic = await topicData.save()
        return httpResponse(req, res, 200, responseMessage.CREATE_DATA, newTopic)
    } catch (error) {
        console.log("Error creating topic", error)
        return httpError(req, res, 404, responseMessage.NOT_FOUND("Topic"))
    }
}

const deleteTopic = async (req, res) => {
    const id = uuidv4()
    try {
        const { id } = req.body;
        // gett and delete topic by id
        const topic = await Topic.findByIdAndDelete(id)
        if (!topic) {
            return httpError(req, res, 404, responseMessage.NOT_FOUND("Topic"))
        }
        return httpResponse(req, res, 200, responseMessage.SUCCESS, `Topic id ${id} has been deleted`)
    } catch (error) {
        console.error(`Error deleting topic `, error)
        return httpError(req, res, 500, responseMessage.SOMETHING_WENT_WRONG, error.message)
    }
}

export default {
    createTopic,
    deleteTopic
}