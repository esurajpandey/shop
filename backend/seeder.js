import prisma from './init/db.js';
import shop from './data/shop.json' assert {type: 'json'};
import brand from './data/brand.json' assert {type: 'json'};
import color from './data/color.json' assert {type: 'json'};
import product from './data/product1.json' assert {type: 'json'};
import category from './data/category.json' assert {type: 'json'};
import productCategories from './data/productCategories1.json' assert {type: 'json'};
import attributes from './data/attributes1.json' assert {type: 'json'};

import address from './data/address.json' assert {type: 'json'};
import users from './data/user.json' assert {type: 'json'};
import worker from './data/workers.json' assert {type: 'json'};
import cartItem from './data/cartItems.json' assert {type: 'json'};
import order from './data/orders.json' assert {type: 'json'};
import orderItem from './data/orderItem.json' assert {type: 'json'};
import workerAddress from './data/workerAddress.json' assert {type: 'json'};

import supplier from './data/supplier.json' assert {type: 'json'};
import reviews from './data/reviews.json' assert {type: 'json'};
import bcrypt from 'bcryptjs';

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

const addressSeeder = async () => {
    return await prisma.address.createMany({
        data: address
    })
}

const userSeeder = async () => {
    const usersDetails = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            type: "CUSTOMER",
            gender: user.gender,
            profile: user.profile,
            mobile: user.mobile,
            password: bcrypt.hashSync(user.password, 10),
            isEmailVerified: user.isEmailVerified,
            addressId: user.addressId
        }
    });

    return await prisma.user.createMany({
        data: usersDetails
    })
}

const workerAddressSeeder = async () => {
    return await prisma.address.createMany({
        data: workerAddress
    })
}
const workersSeeder = async () => {
    return await prisma.user.createMany({
        data: worker
    })
}


const cartItemSeeder = async () => {
    return await prisma.cartItem.createMany({
        data: cartItem
    })
}


const orderSeeder = async () => {
    return await prisma.order.createMany({
        data: order
    })
}


const orderItemSeeder = async () => {
    return await prisma.orderItem.createMany({
        data: orderItem
    })
}


const supplierSeeder = async () => {
    return await prisma.supplier.createMany({
        data: supplier
    })
}

const reviewSeeder = async () => {
    return await prisma.review.createMany({
        data: reviews
    })
}


async function main() {
    console.log("Seeding start...");
    await shopSeeder();
    await brandSeeder();
    await colorSeeder();
    await productSeeder();
    await categorySeeder();
    await productCategoriesSeeder();
    await attributesSeeder();
    await addressSeeder();
    await userSeeder();
    await workerAddressSeeder();
    await workersSeeder();

    await cartItemSeeder();
    await orderSeeder();
    await orderItemSeeder();
    await supplierSeeder()
    // await reviewSeeder();
    console.log("Seeding done");
}

await main();