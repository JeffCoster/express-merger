import {prods} from "./product-list-shoes.js"
import {globalContent} from "./product-list-shoes.js"

export const dataSources = {};

dataSources.globals = globalContent;
dataSources.productList = prods.products;

// min (start index) and max to show of source Products
// indexing starts at 0, and in example there are 5 products
// So min of 2 and max to show of 3 means show 3rd,4th, and 5th
dataSources.minProducts = 2;
dataSources.maxProducts = 3;