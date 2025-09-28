const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');

// Bring in Models & Utils
const auth = require('../../middleware/auth');
const productCount = require('../../models/productCount');
const Product = require('../../models/product');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');


router.get('/', auth, role.check(ROLES.Admin), async(req, res) => {
    try{
        const products = await productCount.find();

        return res.status(200).json({
            success: true,
            products
        })
    } catch(error) {
        return res.status(400).json({
            error: 'Error fetching product count'
        });
    }
})

/**
 * - return products id, product count and productBought for first 10 record
 * by the most count in decending order
 */

router.get('/best_selling', async(req, res) => {
    try{
        const products = await productCount.find();

        // Group products and sum up count and boughtCount
        const productMap = new Map();
        products.forEach(product => {
            const productId = product.product.toString();
            if (!productMap.has(productId)) {
                productMap.set(productId, {
                    product: product.product,
                    count: product.count,
                    boughtCount: product.boughtCount
                });
            } else {
                const existingProduct = productMap.get(productId);
                existingProduct.count += product.count;
                existingProduct.boughtCount += product.boughtCount;
            }
        });
        const groupedProducts = Array.from(productMap.values());

        // Sort by count in descending order
        let newProduct = groupedProducts.sort((a, b) => b.count - a.count);
        newProduct = newProduct.slice(0, 10); // only use 10 products

        // Fetch product details
        let fetchedProducts = [];
        for (let item of newProduct) {
            const tempProduct = await Product.findById(item.product);
            if (tempProduct && tempProduct.isActive) {
               fetchedProducts.push({
                    ...tempProduct.toObject(),
                    count: item.count,
                    boughtCount: item.boughtCount
                });
            }
        }

        return res.status(200).json({
            success: true,
            fetchedProducts
        });
    } catch(error) {
        return res.status(400).json({
            error: 'Error fetching product count'
        });
    }
})


/**
 * - return a count for products that were mostly bought or almost paid for
 */

router.get('/count', async(req, res) => {
    try{
        const productsCount = await productCount.find();
        let count = 0

        productsCount.map((item) => {
            count += item.count
        })

        return res.status(200).json({
            success: true,
            totalCount: count
        })
    } catch(error) {
        return res.status(400).json({
            error: 'Error fetching product count'
        });
    }
})


/**
 *  - returns a count for products that were bought
 */

router.get('/count/bought', auth, async(req, res) => {
    try{
        const productsCount = await productCount.find();
        let count = 0

        productsCount.map((item) => {
            count += item.boughtCount
        })

        return res.status(200).json({
            success: true,
            totalBoughtCount: count
        })
    } catch(error) {
        return res.status(400).json({
            error: 'Error fetching product count'
        });
    }
})

module.exports = router;
