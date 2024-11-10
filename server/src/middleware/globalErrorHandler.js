// export default (err, _, res, __) => {
//     res.status(err.statusCode).json(err);
// };
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500; // Default to 500 if no status code is provided
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: err.stack, // Avoid sending stack in production
    });
};

export default globalErrorHandler;