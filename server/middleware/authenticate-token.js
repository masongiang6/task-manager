const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(" ")[1]

    if(!token) {
        return res.status(401).send("Unauthorized. Login.")
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.status(403).send("Your session has expired. Login again.")
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken