import Meta from "../models/metaModel"; // Import the Meta model

// Create a new Meta record
export const createMeta = async (req, res) => {
    try {
        const { workspace_id, api_key, waiting_time, operation_time } = req.body;

        // Create new Meta document
        const meta = new Meta({
            workspace_id,
            api_key,
            waiting_time,
            operation_time,
        });

        await meta.save();  // Save the new record to the database

        return res.status(201).json({
            success: true,
            message: 'Meta record created successfully!',
            data: meta,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating Meta record',
            error: error.message,
        });
    }
};

// Get all Meta records
export const getAllMeta = async (req, res) => {
    try {
        const metaRecords = await Meta.find();  // Find all Meta records

        return res.status(200).json({
            success: true,
            data: metaRecords,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching Meta records',
            error: error.message,
        });
    }
};

// Get a single Meta record by ID
export const getMetaById = async (req, res) => {
    try {
        const { id } = req.params;

        const meta = await Meta.findById(id);  // Find Meta record by ID

        if (!meta) {
            return res.status(404).json({
                success: false,
                message: 'Meta record not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: meta,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching Meta record',
            error: error.message,
        });
    }
};

// Update a Meta record by ID
export const updateMeta = async (req, res) => {
    try {
        const { id } = req.params;
        const { workspace_id, api_key, waiting_time, operation_time } = req.body;

        const meta = await Meta.findByIdAndUpdate(
            id,
            {
                workspace_id,
                api_key,
                waiting_time,
                operation_time,
            },
            { new: true } // Return the updated document
        );

        if (!meta) {
            return res.status(404).json({
                success: false,
                message: 'Meta record not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Meta record updated successfully!',
            data: meta,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating Meta record',
            error: error.message,
        });
    }
};

// Delete a Meta record by ID
export const deleteMeta = async (req, res) => {
    try {
        const { id } = req.params;

        const meta = await Meta.findByIdAndDelete(id);  // Delete the Meta record by ID

        if (!meta) {
            return res.status(404).json({
                success: false,
                message: 'Meta record not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Meta record deleted successfully!',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting Meta record',
            error: error.message,
        });
    }
};
