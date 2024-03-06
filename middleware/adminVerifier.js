import prisma from '../init/db.js';
import { errorResponse } from '../utils/helper/response.js';
import verifyToken from './verifyToken.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get('userId');
        const role = req.requestContext.get('type');

        if (role !== 'ADMIN') {
            throw { msg: "Admin access only!", status: 401 };
        }

        const isAdmin = await prisma.shop.findFirst({
            where: {
                owner: {
                    id: userId
                }
            },
            select: {
                id: true,
            }
        });

        if (!isAdmin) {
            throw { msg: "Admin access only!", status: 401 };
        }
        
        req.requestContext.set('shopId', isAdmin.id);
    } catch (err) {
        console.log(err);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}