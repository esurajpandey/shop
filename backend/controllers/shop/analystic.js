import prisma from '../../init/db.js';
import { successResponse, errorResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        //total order
        //total product in stock
        //total active supplier
        //total users
        //total income

        const { from, to } = req.query;

        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        console.log(from, to);
        const shopId = req.requestContext.get("shopId");

        const shopWhere = {
            shopId: shopId
        }

        if (from && to) {
            shopWhere.AND = [{ orderAt: { gte: new Date(from) } }, { orderAt: { lt: new Date(to) } }]
        }

        const order = await prisma.order.count({
            where: shopWhere,
        });

        const thisMonthOrder = await prisma.order.count({
            where: {
                AND: [{ orderAt: { gte: startDate } }, { orderAt: { lt: endDate } }]
            }
        })
        const product = await prisma.product.aggregate({
            where: {
                shopId
            },
            _sum: {
                quantityInStock: true
            }
        });

        const supply = await prisma.supplies.aggregate({
            _sum: {
                quantity: true,
                unitPrice: true
            }
        });

        const totalSell = await prisma.$queryRaw`
            SELECT SUM("quantity" * "unitPrice") as totalSell
            FROM "OrderItem"`;

        const newUsers = await prisma.user.count({
            where: {
                type: "CUSTOMER",
                AND: [{ createdAt: { gte: startDate } }, { createdAt: { lt: endDate } }]
            }
        })

        const totalUser = await prisma.user.count();

        reply.code(200).send(successResponse({ thisMonthOrder, totalUser, totalSell, newUsers, supply, product, order }, "Analytics details"))
    } catch (err) {
        console.log(err);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}