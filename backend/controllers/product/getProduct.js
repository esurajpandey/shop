import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const productId = req.params.productId;

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                attributes: true,
                color: true,
                brand: true,
                Review: true,
            }
        });

        if (!product)
            throw { msg: "Product not found", status: 404 };

        if (product.isDeleted) {
            throw { msg: "Product not found", status: 404 };
        }

        const category = await prisma.productCategories.findMany({
            where: {
                productId
            },
            select: {
                category: true
            }
        })

        product.category = category.map(item => item.category);

        reply.code(200).send(successResponse(product, "Product details"));
    } catch (err) {
        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}