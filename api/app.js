const express = require('express')
const app = express();
const nurseRoutes = require('./routes/nurse');
const patientRoutes = require('./routes/patient');
const cors = require('cors')
const connection = require('./connection')
const cron = require('node-cron');
const cookieParser = require('cookie-parser')
const jwt_util = require('./JWT')
require('dotenv').config()

connection();
app.use(express.json())
app.use(cookieParser())
//TODO set proper cors (cors())
// app.use(cors())
app.use(cors({
  "Access-Control-Allow-Origin": "localhost:5173",
  "Access-Control-Allow-Credentials": true
}))
app.use(express.static('public'))
app.use(express.static('dashboard'))

app.disable('x-powered-by');

app.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

cron.schedule('0 0 * * *', async () => {
  try {
    // Define the SQL query to delete entries with hasBeenAccepted as true
    const deleteQuery = `DELETE FROM patient_requests WHERE hasBeenAccepted = true`;

    // Execute the SQL query
    await process.postgresql.query(deleteQuery);

    console.log('Table cleared successfully');
  } catch (error) {
    console.error('An error occurred while clearing the table:', error);
  }
});

app.use(function (req, res, next) {
  req.io = app.get('io');
  next();
})

app.use('/nurse', nurseRoutes)
app.use('/patient', patientRoutes)

module.exports = app