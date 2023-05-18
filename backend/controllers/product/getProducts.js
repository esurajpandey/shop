import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';
import { } from '@prisma/client'
export default async (req, reply) => {
    try {

        const { category, name, attrName, attrValue, lessThan, moreThan, brand } = req.query;

        let page = 1;
        let limit = 9;
        if (req.query.page) {
            page = +req.query.page
        }

        let where = {
            isDeleted: false
        }

        console.log(category)
        if (category) {
            const searchLike = `%${category}%`
            where.ProductCategories = {
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
                where = {}
                limit = 40;
            }
        }


        if (attrName && attrValue) {
            const attrLike = `%${attrName.toLowerCase()}%`
            const attrValueLike = `%${attrValue.toLowerCase()}%`
            where.attributes = {
                some: {
                    name: { contains: attrLike, mode: 'insensitive' },
                    value: { contains: attrValueLike, mode: 'insensitive' }
                }
            }
        }

        if (name) {
            const searchLike = `%${name}%`
            where.name = {
                contains: searchLike,
                mode: 'insensitive'
            }

        }

        if (moreThan) {
            where.unitPrice = {
                gt: parseFloat(moreThan)
            }
        }

        if (lessThan) {
            where.unitPrice = {
                lt: parseFloat(lessThan)
            }
        }

        if (brand) {
            const searchLike = `%${brand}%`
            where.brand = {
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
            where,
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
        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}