const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('access denied')
    try {
        const decoded = "jwt.verify(token, config.get('jwtPrivateKey'))"
        req.user = decoded
        next();
    } catch (err) {
        res.status(400).send('invalid token')
    }
}