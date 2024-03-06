import jwt from 'jsonwebtoken';
import prisma from '../init/db.js';
import { errorResponse } from '../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const ignorePaths = [/\/health/, /\/login(\/json|\/static|\/?$)/,/\/register(\/json|\/static|\/?$)/];
        if (ignorePaths.find(path => path.test(req.url))) return;

        const authHeader = req.headers['authorization'];
        if (typeof authHeader === 'undefined')
            throw { msg: "Unauthorized - No token", status: 401 }

        const token = authHeader.split(' ')[1];

        let id;
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.error('Invalid JWT token', err.message);
                throw { msg: `Unauthorized - ${err.message}`, status: 401 };
            }
            id = decode.id;
        });

        if (!id)
            throw { msg: "Something went wrong,token false", status: 422 };

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                type : true,
            }
        });

        if (!user) {
            throw { msg: "Login again", status: 422 };
        }

        req.requestContext.set('userId', user.id);
        req.requestContext.set('name', user.name);
        req.requestContext.set('email', user.email);
        req.requestContext.set('type', user.type);

    } catch (err) {
        console.log(err);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}