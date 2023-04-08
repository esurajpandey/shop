import { faker } from '@faker-js/faker';

import fs from 'fs';
import brand from './data/brand.json' assert {type: 'json'};
import color from './data/color.json' assert {type: 'json'};
import product from './data/product.json' assert {type: 'json'};
import category from './data/category.json' assert {type: 'json'};


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


// brandgenerator();
// productGenrator();
// colorGenerator();
// attributeGenerator();
// categoryGenerator();
// productCategoriesGenerator();

