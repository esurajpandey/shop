import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        // console.log(JSON.parse(req.body.pictures));

        const product = await addProduct(req.body);
        // const product = {};
        if (!product)
            throw { msg: "Unable to create product", status: 422 };

        reply
            .code(201)
            .send(successResponse(product, "Product is added"));

    } catch (err) {
        console.log(err.message);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}


const addProduct = async (body) => {
    return prisma.$transaction(async tx => {
        const { name, pictures, quantity, unitPrice, description, weight, colorId, shopId, brandId, attributes } = body;

        const product = await tx.product.create({
            data: {
                name,
                quantityInStock: quantity,
                unitPrice,
                description,
                weight,
                pictures: JSON.parse(pictures),
                attributes: {
                    createMany: {
                        data: JSON.parse(attributes)
                    }
                },
                brand: {
                    connect: {
                        id: brandId
                    }
                },
                color: {
                    connect: {
                        id: colorId,
                    }
                },
                shop: {
                    connect: {
                        id: shopId
                    }
                },
            },
            include: {
                attributes: true,
            }
        });
        return product;
    })
}