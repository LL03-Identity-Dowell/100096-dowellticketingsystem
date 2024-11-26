import LineManager from '../models/lineManagerModel.js';

// This is to keep track of the last assigned manager
let lastAssignedIndex = 0;


export async function assignLineManager(department) {
    // Fetch all active line managers for the department
    const managers = await LineManager.find({ department, is_active: true });
    if (managers.length === 0) {
        throw new Error("No active line managers available");
    }

    // Assign the next manager in the list based on the last assigned index
    const nextManager = managers[lastAssignedIndex];
    lastAssignedIndex = (lastAssignedIndex + 1) % managers.length; 

    return [nextManager._id]; // Return an array with a single line manager ID
} 