import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
    if (!token)
        throw { msg: "Unable to generate token", status: 422 };

    return token;
}

export const getDataFromJWT = (token) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            console.error('Invalid JWT token', err.message);
            throw err;
        }
        return decode;
    })
}