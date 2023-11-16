const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const checkJWTToken = require('../middleware/tokenAuth')
const jwtUtil = require('../JWT')
const uuid = require('uuid')
const { errors } = require('jose')
require('dotenv').config()


/**
 * Register a new user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
router.post('/register', async (req, res) => {
    try {
        // Extract data from request body
        const { lastname, surname, email, password, county, city, street, specialty, phone } = req.body
        const user_type = 'nurse'
        const nurse_id = uuid.v4()

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        // Sanitize email and hash password
        const sanitizedEmail = validator.normalizeEmail(email)
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert user data into nurse_users table
        const userQuery = `INSERT INTO nurse_users (email, password, user_type, nurse_id) VALUES ($1, $2, $3, $4)`
        await process.postgresql.query(userQuery, [sanitizedEmail, hashedPassword, user_type, nurse_id])

        // Insert user info into nurse_info table
        const infoQuery = `INSERT INTO nurse_info (lastname, surname, county, city, street, specialty, phone, nurse_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
        await process.postgresql.query(infoQuery, [lastname, surname, county, city, street, specialty, phone, nurse_id])

        // Return success response
        res.status(200).json({ success: true })
    }
    catch (error) {
        // Return error response if an error occurred
        res.status(500).json({ error: error.message })
        // res.status(500).json({ error: 'An error occurred while registering' })
    }
})
/**
 * Handles the login request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        // Sanitize email
        const sanitizedEmail = validator.normalizeEmail(email)

        // Execute the SQL query
        const query = `SELECT * FROM nurse_users WHERE email = $1`
        const user = await process.postgresql.query(query, [sanitizedEmail])

        // Check if the user exists
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        } else {
            // Check if the password does not match the hashed password stored in the user object
            if (!bcrypt.compareSync(password, user[0].password)) {
                return res.status(401).json({ error: 'Invalid email or password' })
            } else {
                try {
                    // Define the SQL query to fetch nurse information
                    const query = `
                      SELECT
                        nurse_info.id,
                        nurse_users.email,
                        lastname,
                        surname,
                        county,
                        city,
                        street,
                        specialty,
                        phone,
                        nurse_info.nurse_id
                      FROM
                        nurse_info
                      INNER JOIN
                        nurse_users ON nurse_info.nurse_id = nurse_users.nurse_id
                    `

                    // Execute the SQL query using the PostgreSQL client
                    const nurseResult = await process.postgresql.query(query)

                    // Initialize the secretKey variable by decoding the JWT_SECRET_KEY256 environment variable from hex
                    const secretKey = Buffer.from(process.env.SECRET_KEY256, 'hex');

                    // Create an encrypted JWT token for the user
                    const token = await jwtUtil.createEncryptedJWT(user.email, { user: user.email, user_type: 'nurse' }, secretKey)

                    // Set options for the token cookie
                    const options = { httpOnly: true }
                    res.cookie('token', token, options)

                    // Return a JSON response with the user type and nurse information
                    res.status(200).json({ user_type: 'nurse', userInfo: nurseResult[0] })

                } catch (error) {
                    res.status(500).json({ error: error.message })
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' })
    }
})


/**
 * Update user info endpoint
 * 
 * @route PUT /updateInfo/:id
 * @param {string} id - The user ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} The success response or error response
 */
router.put('/updateInfo/:id', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { id: userId } = req.params
        const { lastname, surname, county, city, street, specialty } = req.body

        // Update nurse_info table
        const infoQuery = `UPDATE nurse_info SET lastname = $1, surname = $2, county = $3, city = $4, street = $5, bio = $6 WHERE id = $7`
        await process.postgresql.query(infoQuery, [lastname, surname, county, city, street, specialty, userId])

        // Return success response
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user info' })
    }
})

/**
 * Update the password of a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - JSON response
 */
router.put('/updatePassword/:id', checkJWTToken, async (req, res) => {
    try {
        // Extract data from request body
        const { email, newPassword, oldPassword } = req.body

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        // Sanitize email
        const sanitizedEmail = validator.normalizeEmail(email)

        // Retrieve user data from nurse_users table
        const userQuery = `SELECT * FROM nurse_users WHERE email = $1`
        const user = await process.postgresql.query(userQuery, [sanitizedEmail])

        // Check if the user exists
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        } else {
            // Check if the old password matches the hashed password stored in the user object
            if (!bcrypt.compareSync(oldPassword, user[0].password)) {
                return res.status(401).json({ error: 'Invalid email or password' })
            } else {
                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, 10)

                // Update nurse_users table
                const userQuery = `UPDATE nurse_users SET password = $1 WHERE email = $2`
                await process.postgresql.query(userQuery, [hashedPassword, sanitizedEmail])

                // Return success response
                res.status(200).json({ success: true })
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the user password' })
    }
})

// Retrieve all patient requests that have not been accepted
router.get('/patientRequests', async (req, res) => {
    // SQL query to select all patient requests that have not been accepted
    const selectRequestsQuery = `SELECT * FROM patient_requests WHERE has_been_accepted = false`
    const requests = await process.postgresql.query(selectRequestsQuery)

    const response = []
    for (const userRequest of requests) {
        const { lastname, surname, request_details } = userRequest

        // SQL query to select user information based on the last name and surname
        const selectUserInfoQuery = `SELECT * FROM patient_info WHERE lastname = $1 AND surname = $2`
        const userInfo = await process.postgresql.query(selectUserInfoQuery, [lastname, surname])

        // Add request details to the user information object
        userInfo[0]["requestDetails"] = request_details
        response.push(userInfo[0])
    }

    // Send the response as JSON
    res.status(200).json(response)
})

router.put("/acceptRequest", checkJWTToken, async (req, res) => {
    try {
        // Extract the requestId from the request parameters
        const { requestId, nurse_id, county, city } = req.body;

        // Update the patient_requests table to set has_been_accepted to true and nurse_id to the specified nurse_id
        const query = `UPDATE patient_requests SET has_been_accepted = true, nurse_id = $2 WHERE patient_id = $1`;
        await process.postgresql.query(query, [requestId, nurse_id]);

        /// SQL query to fetch requests with matching county and city
        const selectRequestsQuery = `SELECT * FROM patient_requests`;

        // Execute the query using the PostgreSQL client
        const requests = await process.postgresql.query(selectRequestsQuery);

        const selectPatientsQuery = `SELECT * FROM patient_info WHERE county = $1 AND city = $2`;

        // Execute the query using the PostgreSQL client
        const patients = await process.postgresql.query(selectPatientsQuery, [county, city]);

        // Add patient information to each request
        for (const request of requests) {
            for (const patient of patients) {
                if (request.patient_id === patient.patient_id) {
                    request.patientInfo = patient;
                }
            }
        }

        // Remove requests that do not have the patient_info object
        const allRequests = requests.filter(request => request.patientInfo !== undefined);

        // Emit the "acceptRequest" event with the specified requestId
        req.io.emit("acceptRequest", allRequests);

        // Send a success response
        res.status(200).json({ success: true });
    } catch {
        // Send an error response if an error occurs
        // res.status(500).json({ error: 'An error occurred while accepting the request' });
        res.status(500).json({ error: errors.message });
    }
});

/**
 * Endpoint to retrieve patient requests based on county and city.
 * @route POST /myRequests
 */
router.post("/myRequests", checkJWTToken, async (req, res) => {
    try {
        // Extract county and city from request body
        const { county, city, nurse_id } = req.body;

        // SQL query to fetch requests with matching county and city
        const selectRequestsQuery = `SELECT * FROM patient_requests`;

        // Execute the query using the PostgreSQL client
        const requests = await process.postgresql.query(selectRequestsQuery);

        const selectPatientsQuery = `SELECT * FROM patient_info WHERE county = $1 AND city = $2`;

        // Execute the query using the PostgreSQL client
        const patients = await process.postgresql.query(selectPatientsQuery, [county, city]);


        // Add patient information to each request
        for (const request of requests) {
            for (const patient of patients) {
                if (request.patient_id === patient.patient_id) {
                    request.patientInfo = patient;
                }
            }
        }

        // Remove requests that do not have the patient_info object
        const allRequests = requests.filter(request => request.patientInfo !== undefined);

        // Filter out requests that do not match nurse_id
        const filteredRequests = requests.filter(request => request.has_been_accepted === true);

        // Return the fetched requests as a JSON response
        res.status(200).json({ allRequests: allRequests, acceptedRequests: filteredRequests });
    } catch (error) {
        // Handle any errors that occur during processing
        res.status(500).json({ error: error.message });
        // res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
})
// Update personal information
/**
 * Update the personal information of a nurse.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.firstName - The first name of the nurse.
 * @param {string} req.body.lastName - The last name of the nurse.
 * @param {string} req.body.county - The county of the nurse.
 * @param {string} req.body.address - The address of the nurse.
 * @param {string} req.body.phone - The phone number of the nurse.
 * @param {string} req.body.city - The city of the nurse.
 * @param {string} req.body.nurse_id - The ID of the nurse.
 * @param {Object} res - The response object.
 */
router.put("/updatePersonalInfo", checkJWTToken, async (req, res) => {
    try {
        const { firstName, lastName, county, address, phone, city, nurse_id } = req.body;

        const query = `UPDATE nurse_info SET firstname = $1, lastname = $2, county = $3, address = $4, phone = $5, city = $6 WHERE nurse_id = $7`;
        await process.postgresql.query(query, [firstName, lastName, county, address, phone, city, nurse_id]);

        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the personal information' });
    }
})

// Update login information
/**
 * Update the login information of a nurse.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The email of the nurse.
 * @param {string} req.body.oldPassword - The old password of the nurse.
 * @param {string} req.body.newPassword - The new password of the nurse.
 * @param {Object} res - The response object.
 */
router.post("/updateLoginInfo", checkJWTToken, async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Sanitize email
        const sanitizedEmail = validator.normalizeEmail(email);

        const query = `SELECT * FROM nurse_info WHERE email = $1`;

        const result = await process.postgresql.query(query, [sanitizedEmail]);

        // Check if the user exists
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!bcrypt.compareSync(oldPassword, result[0].password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateQuery = `UPDATE nurse_info SET password = $1 WHERE email = $2`;

        await process.postgresql.query(updateQuery, [hashedPassword, email]);

        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the login information' });
    }
})

module.exports = router