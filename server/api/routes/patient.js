const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwtUtil = require('../JWT')
const uuid = require('uuid')
const checkJWTToken = require('../middleware/tokenAuth')
require('dotenv').config()

/**
 * Handle POST request for retrieving requests for a specific patient
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/myRequests', checkJWTToken, async (req, res) => {
    try {
        // Extract the patient_id from the request body
        const { patient_id } = req.body;

        // Prepare the SQL query
        const query = `SELECT * FROM patient_requests WHERE patient_id = $1`;

        // Execute the query and retrieve the requests
        const requests = await process.postgresql.query(query, [patient_id]);

        const patientQuery = `SELECT * FROM patient_info WHERE patient_id = $1`;

        // Execute the query using the PostgreSQL client
        const patients = await process.postgresql.query(patientQuery, [patient_id]);

        // Add patient information to each request
        for (const request of requests) {
            for (const patient of patients) {
                if (request.patient_id === patient.patient_id) {
                    request.patientInfo = patient;
                }
            }
        }

        // Send the requests as a JSON response
        res.status(200).json(requests);
    } catch (error) {
        // Handle any errors and send an error response
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Handles the registration route.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.post('/register', async (req, res) => {
    // Extract data from the request body
    const { lastname, surname, email, phone, password, age, sex, county, city, street, illness, illnessDescription } = req.body;
    const userId = uuid.v4();
    const userType = 'patient';

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Normalize email and hash password
    const sanitizedEmail = validator.normalizeEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into 'patient_users' table
    const userQuery = `INSERT INTO patient_users (email, password, user_type, patient_id) VALUES ($1, $2, $3, $4)`;
    await process.postgresql.query(userQuery, [sanitizedEmail, hashedPassword, userType, userId]);

    // Insert info data into 'patient_info' table
    const infoQuery = `INSERT INTO patient_info (lastname, surname, phone, age, sex, county, city, street, illness, illness_description, patient_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    await process.postgresql.query(infoQuery, [lastname, surname, phone, age, sex, county, city, street, illness, illnessDescription, userId]);

    // Send success response
    res.status(200).json({ success: true });
});

// Handle POST request to /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Normalize email
        const normalizedEmail = validator.normalizeEmail(email);

        // Retrieve user data from 'patient_users' table
        const userQuery = `SELECT * FROM patient_users WHERE email = $1`;
        const userResult = await process.postgresql.query(userQuery, [normalizedEmail]);

        // Check if the user exists
        if (userResult.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const user = userResult[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        } else {

            try {

                const infoQuery = `SELECT patient_info.id, patient_users.email, lastname, surname, phone, age, sex, county, city, street, illness, illness_description, patient_info.patient_id  FROM patient_info INNER JOIN patient_users ON patient_info.patient_id = patient_users.patient_id`;
                const infoResult = await process.postgresql.query(infoQuery);

                // Convert the secret key from base64 encoding to a Buffer
                const secretKey = Buffer.from(process.env.SECRET_KEY256, 'hex');

                // Create a signed JWT using the user's email, user object, and secret key
                const token = await jwtUtil.createEncryptedJWT(user.email, { "user": user.email, "user_type": "patient" }, secretKey);

                //TODO Add secure cookie { secure: true }
                // Set the 'token' cookie with the JWT
                res.cookie('token', token, { httpOnly: true });

                // Send a 200 status code and a JSON response indicating success
                res.status(200).json({ user_type: 'patient', userInfo: infoResult[0] });

            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * Updates user info
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/updateInfo', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { userId } = req.body
        const { lastname, surname, phone, age, sex, county, city, street, illness, illnessDescription } = req.body

        // Update patient_info table
        const infoQuery = `UPDATE patient_info SET lastname = $1, surname = $2, phone = $3, age = $4, sex = $5, county = $6, city = $7, street = $8, illness = $9, illness_description = $10 WHERE id = $11`
        await process.postgresql.query(infoQuery, [lastname, surname, phone, age, sex, county, city, street, illness, illnessDescription, userId])

        // Return success response
        res.status(200).json({ success: true })

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user info' })
    }
})

/**
 * Updates user password
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/updatePassword', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { email, newPassword, oldPassword } = req.body

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        // Normalize email
        const normalizedEmail = validator.normalizeEmail(email);

        // Retrieve user data from 'patient_users' table
        const userQuery = `SELECT * FROM patient_users WHERE email = $1`;
        const userResult = await process.postgresql.query(userQuery, [normalizedEmail]);

        // Check if the user exists
        if (userResult.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        } else {
            // Check if the old password matches the hashed password stored in the user object
            if (!bcrypt.compareSync(oldPassword, userResult[0].password)) {
                return res.status(401).json({ error: 'Invalid email or password' })
            } else {
                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, 10)

                // Update patient_users table
                const userQuery = `UPDATE patient_users SET password = $1 WHERE email = $2`;
                await process.postgresql.query(userQuery, [hashedPassword, normalizedEmail])

                // Return success response
                res.status(200).json({ success: true })
            }

        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Handle a POST request to create a new request
router.post('/newRequest', checkJWTToken, async (req, res) => {
    try {
        // Extract email, lastName, surname, and requestDetails from the request body
        const { email, lastname, firstname, requestDetails, patient_id } = req.body;

        // Sanitize the email using a validator library
        const sanitizedEmail = validator.normalizeEmail(email);

        // Define the SQL query to insert the request into the patient_request table
        const requestQuery = `INSERT INTO patient_requests (email, lastname, surname, request_details, patient_id) VALUES ($1, $2, $3, $4, $5)`;

        // Execute the SQL query with the sanitized values
        await process.postgresql.query(requestQuery, [sanitizedEmail, lastname, firstname, requestDetails, patient_id]);

        const userQuery = `SELECT * FROM patient_info WHERE patient_id = $1`;
        const userResult = await process.postgresql.query(userQuery, [patient_id]);

        const newRequest = {
            ...req.body,
            patientInfo: userResult[0],
        }

        req.io.sockets.emit('newRequest', newRequest);

        // Respond with a success status and message
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        // If an error occurs, respond with a 500 status and an error message
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});


// Update personal info
router.post('/updatePersonalInfo', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { lastName, firstName, phone, age, sex, county, city, address, illness, illnessDescription, patient_id } = req.body;

        // Update patient_info table
        const updateQuery = `UPDATE patient_info SET lastname = $1, surname = $2, phone = $3, age = $4, sex = $5, county = $6, city = $7, street = $8, illness = $9, illness_description = $10 WHERE patient_id = $11`;

        await process.postgresql.query(updateQuery, [lastName, firstName, phone, age, sex, county, city, address, illness, illnessDescription, patient_id]);

        // Return success response
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Update login info
router.post('/updateLoginInfo', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { email, oldPassword, newPassword } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Sanitize email
        const sanitizedEmail = validator.normalizeEmail(email);

        // Retrieve user data from patient_users table
        const userQuery = `SELECT * FROM patient_users WHERE email = $1`;
        const userResult = await process.postgresql.query(userQuery, [sanitizedEmail]);

        // Check if the user exists
        if (userResult.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the old password matches the hashed password stored in the user object
        if (!bcrypt.compareSync(oldPassword, userResult[0].password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update patient_users table
        const updateQuery = `UPDATE patient_users SET password = $1 WHERE email = $2`;

        await process.postgresql.query(updateQuery, [hashedPassword, sanitizedEmail]);

        // Return success response
        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router