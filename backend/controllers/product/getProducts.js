import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';
export default async (req, reply) => {
    try {

        const { category, name, attrName, attrValue, lessThan, moreThan, brand } = req.query;

        let page = 1;
        let limit = 9;
        if (req.query.page) {
            page = +req.query.page
        }

        let whereCondition = {
            isDeleted: false
        }

        if (category) {
            const searchLike = `%${category}%`
            whereCondition.ProductCategories = {
                some: {
                    category: {
                        name: {
                            contains: searchLike,
                            mode: 'insensitive'
                        },
                    }
                }
            }

            if (category === 'all') {
                whereCondition = {
                    isDeleted: false
                }
                limit = 50;
            }
        }


        if (attrName && attrValue) {
            const attrLike = `%${attrName.toLowerCase()}%`
            const attrValueLike = `%${attrValue.toLowerCase()}%`
            whereCondition.attributes = {
                some: {
                    name: { contains: attrLike, mode: 'insensitive' },
                    value: { contains: attrValueLike, mode: 'insensitive' }
                }
            }
        }

        if (name) {
            const searchLike = `%${name}%`
            whereCondition.name = {
                contains: searchLike,
                mode: 'insensitive'
            }

        }

        if (moreThan) {
            whereCondition.unitPrice = {
                gt: parseFloat(moreThan)
            }
        }

        if (lessThan) {
            whereCondition.unitPrice = {
                lt: parseFloat(lessThan)
            }
        }

        if (brand) {
            const searchLike = `%${brand}%`
            whereCondition.brand = {
                name: {
                    contains: searchLike,
                    mode: 'insensitive'
                }
            }
        }

        const count = await prisma.product.aggregate({
            _count: {
                id: true
            }
        });

        const products = await prisma.product.findMany({
            where: whereCondition,
            take: limit,
            skip: limit * (page - 1),
            select: {
                id: true,
                name: true,
                brand: true,
                unitPrice: true,
                color: true,
                attributes: true,
                pictures: true,
                quantityInStock: true,
                description: true,
                weight: true,
                ProductCategories: {
                    select: {
                        category: true
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        });

        if (products.length === 0)
            throw { msg: "No product found", status: 404 };

        reply.code(200).send(successResponse({ products, total: count._count.id }, "Product lists"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}