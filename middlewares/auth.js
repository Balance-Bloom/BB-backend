import jwt from "jsonwebtoken"


export const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // Extract token from headers
            const token = authHeader.split(' ')[1];
            // Verify the token to get user and append to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Call next function
            next();
        }
        else {
            res.status(403).json('User not authenticated');
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

export function generateOTP() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    let randomNumber;

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
}