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
        const quantityInStock = req.body?.quantity ?? product.quantityInStock;
        const unitPrice = parseFloat(req.body?.unitPrice) ?? product.unitPrice;

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                quantityInStock,
                unitPrice,
            }
        });


        if (!updatedProduct)
            throw { msg: "Unable to update product details", status: 422 };

        reply.code(200).send(successResponse(updatedProduct, "Product details is updated"));

    } catch (err) {
        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}