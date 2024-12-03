import Joi from 'joi';
import LineManager from '../models/lineManagerModel.js';
import { lineManagerValidationSchema } from '../service/validationService.js'
import createProducer from './kafka-producer.cjs';
// Initialize the producer outside the controller functions
const producer = await createProducer();
const create = async (req, res) => {

    const { error } = lineManagerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Invalid request payload',
            error: error.details[0].message,
        });
    }

    try {
        const { user_id, user_name } = req.body;
        const existingLineManager = await LineManager.findOne({ user_id });
        if (existingLineManager) {
            return res.status(400).json({
                message: 'Linemanager already exists',
            });
        }

        const lineManagerData = new LineManager(req.body);
        const newLineManager = await lineManagerData.save();
        // Send Kafka message as a callback after creating a new line manager
        await producer.send({
            topic: 'test-topic',
            messages: [
                {
                    value: JSON.stringify({
                        action: 'insert',
                        dbName: 'db1_workspace_id',
                        collName: 'line_manager',
                        data: req.body
                    })
                },
            ]
        });

        res.status(201).json({
            message: 'Linemanager created successfully',
            data: newLineManager,
        });
        // success: true,
        //     2024 - 11 - 11 23: 46: 37   message: 'Data inserted successfully!',
        //         2024 - 11 - 11 23: 46: 37   data: { inserted_id: '67326d2df8348a1e7f3c98b9' }
    } catch (error) {
        console.error('Error creating linemanager:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const update = async (req, res) => {
    const { error } = lineManagerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Invalid request payload',
            error: error.details[0].message,
        });
    }

    try {
        const { user_id } = req.body;
        const updatedLineManager = await LineManager.findOneAndUpdate({ user_id }, req.body, { new: true });
        if (!updatedLineManager) {
            return res.status(404).json({
                message: 'Linemanager not found',
            });
        }
        await producer.send({
            topic: 'test-topic',
            messages: [
                {
                    value: JSON.stringify({
                        action: 'update',
                        dbName: 'db1_workspace_id',
                        collName: 'line_manager',
                        data: req.body
                    })
                },
            ]
        });

        res.status(200).json({
            message: 'Linemanager updated successfully',
            data: updatedLineManager,
        });
    } catch (error) {
        console.error('Error updating linemanager:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const read = async (req, res) => {
    console.log("Getting in the read already");
    try {
        const producer = await createProducer();
        const mess = {
            action: "VeryUnknown",
            dbName: "example_db",
            collName: "example_collection",
            data: {
                field1: "value1",
                field2: "value2"
            }
        }
        // Send a test message to Kafka
        await producer.send({
            topic: 'test-topic',
            messages: [
                {
                    value: JSON.stringify(mess)
                },
            ]


        });
        console.log('Message sent from server to Kafka');
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            message: 'Error sending message:',
            error: error.message,
        });
    }
    const schema = Joi.object({ user_id: Joi.string().required() });
    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({
            message: 'Invalid request parameters',
            error: error.details[0].message,
        });
    }

    try {
        // const { user_id } = req.params;
        const lineManager = await LineManager.find(req.params);
        if (!lineManager) {
            return res.status(404).json({
                message: 'Linemanager not found',
            });
        }
        res.status(200).json({
            message: 'Linemanager retrieved successfully',
            data: lineManager,
        });
    } catch (error) {
        console.error('Error retrieving linemanager:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const readAll = async (req, res) => {
    try {
        const lineManagers = await LineManager.find({});
        res.status(200).json({
            message: 'Linemanagers retrieved successfully',
            data: lineManagers,
        });
    } catch (error) {
        console.error('Error retrieving linemanagers:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const remove = async (req, res) => {
    const schema = Joi.object({ user_id: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Invalid request payload',
            error: error.details[0].message,
        });
    }

    try {
        const { user_id } = req.body;
        const deletedLineManager = await LineManager.findOneAndDelete({ user_id });
        if (!deletedLineManager) {
            return res.status(404).json({
                message: 'Linemanager not found',
            });
        }
        res.status(200).json({
            message: 'Linemanager deleted successfully',
            data: deletedLineManager,
        });
    } catch (error) {
        console.error('Error deleting linemanager:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export default {
    create,
    update,
    read,
    readAll,
    remove,
};
