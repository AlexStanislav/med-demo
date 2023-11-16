const jose = require('jose');

const jwt_util = {
    /**
     * Creates a signed JWT token.
     * 
     * @param {string} subject - The subject of the token.
     * @param {object} payload - The payload of the token.
     * @param {string} key - The key to sign the token.
     * @returns {string} The signed JWT token.
     */
    createSignedJWT: async (subject, payload, key) => {
        // Create a new instance of SignJWT
        const jwt = new jose.SignJWT(payload);

        // Set the protected header of the JWT token
        jwt.setProtectedHeader({ alg: 'HS256' });

        // Set the subject of the JWT token
        jwt.setSubject(subject);

        // Set the issued at time of the JWT token
        jwt.setIssuedAt();

        // Set the issuer of the JWT token
        // jwt.setIssuer('http://localhost:3000');

        // Set the audience of the JWT token
        // jwt.setAudience('http://localhost:3000/test');

        // Set the expiration time of the JWT token
        jwt.setExpirationTime('1h');

        // Sign the JWT token using the provided key
        return jwt.sign(key);
    },

    /**
     * Creates an encrypted JWT with the provided subject, payload, and key.
     * @param {string} subject - The subject of the JWT.
     * @param {object} payload - The payload of the JWT.
     * @param {string} key - The encryption key.
     * @returns {Promise<string>} - The encrypted JWT.
     */
    createEncryptedJWT: (subject, payload, key) => {
        // Create a new EncryptJWT instance
        const jwt = new jose.EncryptJWT(payload);

        // Set the protected header of the JWT
        jwt.setProtectedHeader({ alg: 'dir' , enc: 'A256GCM' });

        // Set the issued at time of the JWT
        jwt.setIssuedAt();

        // Set the subject of the JWT
        jwt.setSubject(subject);

        // Set the expiration time of the JWT to 1 hour
        jwt.setExpirationTime('1h');

        // Encrypt and return the JWT using the provided key
        return jwt.encrypt(key);
    },

    verifySignedJWT: async (token, key, options) => {
        const jwtOptions = options || {}; // Set default options if not provided
        const verifiedToken = await jose.jwtVerify(token, key, jwtOptions); // Verify the JWT token using the provided key
        return verifiedToken;
    },

    decryptJWT: async (token, key) => {
        const options = {
            contentEncryptionAlgorithms: ['A256GCM'],
            keyManagementAlgorithms: ['dir'],
        }
        const decryptedToken = await jose.jwtDecrypt(token, key, options);
        return decryptedToken;
    }

}

module.exports = jwt_util