export default {
    SUCCESS: 'The operation has been successful',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    NOT_FOUND: (entity) => `${entity} not found`,
    TOO_MANY_REQUESTS: 'Too many requests! Please try again after some time',
    VALIDATION_ERROR: "Invalid data! Please check your request and try again",
    CREATE_DATA: "Data created successfully",
    NOT_CREATE_DATA: "Error creating data",
    ALREADY_EXIST: (entity) => `${entity} already exist`,
};
