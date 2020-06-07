const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) throw new Error('User not authenticated')

        const token = bearerToken.split(" ")[1]
        if (!token) throw new Error('Authentication failed')

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded.id) throw new Error('Authentication failed')

        req.user_id = decoded.id
        next();
    } catch (error) {
        console.log(`${error}`.red)
        res.status(500).json({
            success: false,
            errors: ['Authorization denied', error.message]
        })
    }
}

module.exports = auth