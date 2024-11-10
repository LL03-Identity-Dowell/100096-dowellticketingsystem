import errorObject from './errorObject.js';

// export default (req, res, errorStatusCode = 500, message = null, errorDetails = null) => {
export default (next, req, errorStatusCode = 500, message = null, errorDetails = null) => {
    const error = new Error(message || 'An unexpected error occurred');
    const errorObj = errorObject(error, req, errorStatusCode);

    // Override default message with custom message if provided
    if (message) {
        errorObj.message = message;
    }
    if (errorDetails) {
        errorObj.trace = { error: errorDetails };
    }

    // res.status(errorStatusCode).json(errorObj);
    next(errorObj);
};
