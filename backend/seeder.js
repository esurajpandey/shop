import prisma from './init/db.js';
import shop from './data/shop.json' assert {type: 'json'};
import brand from './data/brand.json' assert {type: 'json'};
import color from './data/color.json' assert {type: 'json'};
import product from './data/product.json' assert {type: 'json'};
import category from './data/category.json' assert {type: 'json'};
import productCategories from './data/productCategories.json' assert {type: 'json'};
import attributes from './data/attributes.json' assert {type: 'json'};

const shopSeeder = async () => {
    return await prisma.shop.create({
        data: shop
    })
}

const brandSeeder = async () => {
    return await prisma.brand.createMany({
        data: brand
    })
}

const colorSeeder = async () => {
    return await prisma.color.createMany({
        data: color
    })
}

const productSeeder = async () => {
    return await prisma.product.createMany({
        data: product
    })
}
const categorySeeder = async () => {
    return await prisma.category.createMany({
        data: category
    })
}
const productCategoriesSeeder = async () => {
    return await prisma.productCategories.createMany({
        data: productCategories
    })
}
const attributesSeeder = async () => {
    return await prisma.attributes.createMany({
        data: attributes
    })
}


async function main() {
    await shopSeeder();
    await brandSeeder();
    await colorSeeder();
    await productSeeder();
    await categorySeeder();
    await productCategoriesSeeder();
    await attributesSeeder();
}

await main();