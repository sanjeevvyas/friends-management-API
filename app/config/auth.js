import jwt from 'jsonwebtoken'

  
const auth = {
    tokenVerified: async (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) return res.status(401).json('Unauthorize user')
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = decoded
            next()
        } catch (e) {
            res.status(400).json('Token not valid')
        }

    }
}

export default auth