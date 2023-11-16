const postgresql = require('pg');
const os = require('os');

const { Pool } = postgresql;

/**
 * Creates a connection to a PostgreSQL database and returns the connection object.
 *
 * @param {Function} [callback=null] - An optional callback function to be called with the connection object.
 * @returns {Object} - The connection object.
 */
module.exports = (callback = null) => {
    // Create a new connection pool with the given configuration
    const pool = new Pool({
        user:  process.env.PORT ? process.env.PG_USER : "local_admin", // PostgreSQL username
        password:  process.env.PORT ? process.env.PG_PASSWORD : "local_admin", // PostgreSQL password
        database:  process.env.PORT ? process.env.PG_DATABASE : "med_demo", // PostgreSQL database name
        port: 5432, // PostgreSQL server port
        host:  process.env.PORT ? process.env.PG_HOST : "localhost", // PostgreSQL server host
        //TODO remove in production
        ssl: {
            rejectUnauthorized: false
        }
    });

    // Define the connection object
    const connection = {
        pool, // Connection pool object
        query: (...args) => {
            // Connect to the pool, execute the query, and release the client
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    client.release();
                    return res.rows;
                });
            });
        },
    };

    // Store the connection object in the process object
    process.postgresql = connection;

    // Call the optional callback function with the connection object
    if (callback) {
        callback(connection);
    }

    // Return the connection object
    return connection;
};
