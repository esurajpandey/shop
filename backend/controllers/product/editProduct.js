import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';
export default async (req, reply) => {
    try {
        const productId = req.params.productId;

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw { msg: "Product not found", status: 404 };
        }

        const name = req.body?.name ?? product.name;
        const weight = req.body?.weight ?? product.weight;
        const quantityInStock = req.body?.quantity ?? product.quantityInStock;
        const description = req.body?.description ?? product.description;
        const unitPrice = req.body?.unitPrice ?? product.unitPrice;

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                weight,
                quantityInStock,
                description,
                unitPrice,
            }
        });

        if (updatedProduct)
            throw { msg: "Unable to update product details", status: 422 };

        reply.code(200).send(successResponse(updatedProduct, "Product details is updated"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}