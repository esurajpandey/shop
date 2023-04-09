import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import fs from 'fs';
import brand from './data/brand.json' assert {type: 'json'};
import color from './data/color.json' assert {type: 'json'};
import product from './data/product.json' assert {type: 'json'};
import category from './data/category.json' assert {type: 'json'};
import address from './data/address.json' assert {type: 'json'};
import user from './data/user.json' assert {type: 'json'};
import worker from './data/workers.json' assert {type: 'json'};
import orders from './data/orders.json' assert {type: 'json'};
import workerAddress from './data/workerAddress.json' assert {type: 'json'};

const productGenrator = () => {
    const products = []

    for (let i = 0; i < 30; i++) {
        const product = {
            id: faker.datatype.uuid(),
            name: faker.commerce.product(),
            pictures: [
                faker.image.imageUrl(500, 500, 'mobiles'),
                faker.image.imageUrl(500, 500, 'electonics'),
                faker.image.imageUrl(500, 500, 'electrics'),
            ],
            description: faker.commerce.productDescription(),
            quantityInStock: +faker.random.numeric(2),
            unitPrice: +(faker.commerce.price()),
            weight: +faker.random.numeric(2),
            colorId: color[i].id,
            brandId: brand[i].id,
            shopId: "dd597cdc-d939-4829-a78a-66197bc40e5f",
        };
        products.push(product);
    }
    fs.writeFileSync('./data/product.json', JSON.stringify(products, null, 2));
}

const brandgenerator = () => {

    const brands = [];

    for (let i = 0; i < 30; i++) {
        const brand = {
            id: faker.datatype.uuid(),
            name: faker.company.bsAdjective() + ' ' + faker.company.bsNoun() + ' ' + faker.company.bsBuzz(),
        }
        brands.push(brand);
    }

    // console.log(brands);
    fs.writeFileSync('./data/brand.json', JSON.stringify(brands, null, 2));
}

const colorGenerator = () => {
    const colors = [];

    for (let i = 0; i < 30; i++) {
        const color = {
            id: faker.datatype.uuid(),
            name: faker.internet.color(),
        }

        colors.push(color);
    }

    fs.writeFileSync('./data/color.json', JSON.stringify(colors, null, 2));
}

const attributeGenerator = () => {
    const attributes = [];
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 5; j++) {
            const attribute = {
                id: faker.datatype.uuid(),
                name: faker.word.adjective(),
                value: faker.commerce.productAdjective(),
                productId: product[i].id
            }
            attributes.push(attribute);
        }
    }
    // console.log(attributes);
    fs.writeFileSync('./data/attributes.json', JSON.stringify(attributes, null, 2));
}

const categoryGenerator = () => {
    const categories = [];

    for (let i = 0; i < 30; i++) {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.fake('{{commerce.department}}')
        }
        categories.push(category);
    }
    // console.log(categories);
    fs.writeFileSync('./data/category.json', JSON.stringify(categories, null, 2));
}

const productCategoriesGenerator = () => {
    const productCategories = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 30; j++) {
            const cate = {
                productId: product[j].id,
                categoryId: category[i].id
            }
            productCategories.push(cate);
        }
    }
    // console.log(productCategories);
    fs.writeFileSync('./data/productCategories.json', JSON.stringify(productCategories, null, 2));
}

const addressGenerator = () => {
    const addresses = [];
    for (let i = 0; i < 10; i++) {
        const address = {
            id: faker.datatype.uuid(),
            address_line1: `${faker.address.streetAddress()} ${faker.address.direction()}  ${faker.address.street()} `,
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode('######'),
            country: faker.address.country(),
        }
        addresses.push(address);
    }
    fs.writeFileSync('./data/workerAddress.json', JSON.stringify(addresses, null, 2));
}

const generateUsers = () => {
    const users = [];
    for (let i = 0; i < 30; i++) {
        const user = {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            type: "CUSTOMER",
            gender: faker.name.sexType(),
            profile: faker.internet.avatar(400, 400),
            mobile: faker.phone.number('+91 ##########'),
            password: faker.internet.password(10),
            isEmailVerified: true,
            addressId: address[i].id
        }
        users.push(user);
    }
    fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2));
    // console.log(users);
}

const generateWorkers = () => {
    const workers = [];
    for (let i = 0; i < 10; i++) {
        const user = {
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            type: "WORKER",
            gender: faker.name.sexType(),
            profile: faker.internet.avatar(400, 400),
            mobile: faker.phone.number('+91 ##########'),
            password: faker.internet.password(10),
            isEmailVerified: true,
            addressId: workerAddress[i].id
        }
        workers.push(user);
    }
    fs.writeFileSync('./data/workers.json', JSON.stringify(workers, null, 2));
    // console.log(users);
}

const cartItemsGenerator = () => {
    const carts = [];
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 5; j++) {
            const cart = {
                userId: user[i].id,
                productId: product[j].id,
                quantity: 2,
                unitPrice: product[j].unitPrice,
            }
            carts.push(cart);
        }
    }
    // console.log(carts)
    fs.writeFileSync('./data/cartItems.json', JSON.stringify(carts, null, 2));
}

const deliveryStatus = ["PACKED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];

const generateOrders = () => {
    const orders = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
            const order = {
                id: faker.datatype.uuid(),
                status: faker.helpers.arrayElement(deliveryStatus),
                userId: user[i].id,
                addressId: user[i].addressId,
                workerId: worker[i].id,
                shopId: "dd597cdc-d939-4829-a78a-66197bc40e5f",
            }
            orders.push(order);
        }
    }
    fs.writeFileSync('./data/orders.json', JSON.stringify(orders, null, 2));
}

const generateOrderItems = () => {
    const orderItems = [];
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 3; j++) {
            const orderItem = {
                orderId: orders[i].id,
                productId: product[j].id,
                quantity: +faker.random.numeric(1),
                unitPrice: product[j].unitPrice
            }
            orderItems.push(orderItem);
        }
    }
    // console.log(orderItems);
    fs.writeFileSync('./data/orderItem.json', JSON.stringify(orderItems, null, 2));
}

// brandgenerator();
// productGenrator();
// colorGenerator();
// attributeGenerator();
// categoryGenerator();
// productCategoriesGenerator();
// addressGenerator();
// generateUsers();

// generateWorkers();
// cartItemsGenerator();

// generateOrders();
// generateOrderItems();
console.log(orders.length);


