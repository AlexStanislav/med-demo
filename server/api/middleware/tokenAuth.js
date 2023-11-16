
const jwt_util = require('../JWT')
require('dotenv').config()

/**
 * Middleware to check if the request has an HTTP-only cookie named "token" that contains an encrypted JWT
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const checkJWTToken = (req, res, next) => {
    // Check if the request has the "token" cookie
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;

        try {
            // Verify the JWT token
            const decodedToken = jwt_util.decryptJWT(token, Buffer.from(process.env.SECRET_KEY256, 'hex'));

            // Attach the decoded token to the request object for further processing
            req.decodedToken = decodedToken;

            // Call the next middleware function
            next();
        } catch (error) {
            // Handle any errors and send an error response
            console.error(error);
            res.status(401).json({ error: 'Something went wrong' });
        }
    } else {
        // Send an error response if the "token" cookie is missing
        res.status(401).json({ error: 'Something went wrong' });
    }
};


module.exports = checkJWTToken