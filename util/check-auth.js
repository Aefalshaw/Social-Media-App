const { AuthenticationError } = require('apollo-server');
const checkAuth = require('../../util/check-auth');

const jwt = require('josnwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }
        throw new Error('Authentication Token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
};