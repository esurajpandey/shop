import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const shopId = req.requestContext.get('shopId');

        const product = await addProduct(req.body, shopId);
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


const addProduct = async (body, shopId) => {
    return prisma.$transaction(async tx => {
        const { name, pictures, quantity,
            unitPrice, description, weight,
            colorId, brandId, attributes,
            supplierId, categoryId } = body;

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
                ProductCategories: {
                    create: {
                        categoryId,
                    }
                }
            },
            include: {
                attributes: true,
                ProductCategories: {
                    include: {
                        category: true
                    }
                }
            }
        });


        if (supplierId) {
            await tx.supplies.create({
                data: {
                    supplierId,
                    quantity,
                    productId: product.id,
                    unitPrice,
                }
            });
        }

        return product;
    })
}