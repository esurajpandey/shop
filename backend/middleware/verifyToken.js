import jwt from 'jsonwebtoken';
import prisma from '../init/db.js';
import { errorResponse } from '../utils/helper/response.js';
export default async (req, resp, next) => {
    try {
        const authHeader = req.headers['authorization'];


        if (typeof authHeader === 'undefined')
            throw { msg: "Unauthorized - No token", status: 401 }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                console.error('Invalid JWT token', err.message);
                throw { msg: `Unauthorized - ${err.message}`, status: 401 };
            }

            const user = await prisma.user.findUnique(decode.id);
            req.user = user;
            next();
        });
    } catch (err) {
        resp.status(err?.status ?? 500).send(errorResponse(err));
    }
}