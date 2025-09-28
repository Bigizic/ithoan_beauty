const express = require('express');
const router = express.Router();

// Bring in Models & Utils
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const store = require('../../utils/store');
const Order = require('../../models/order');
const { ROLES } = require('../../constants');
const role = require('../../middleware/role');


router.get('/get_total_product', auth, role.check(ROLES.Admin), async(req, res) => {
  try{
      const carts = await Cart.find();
      let productCount = 0;

      for (const cart of carts) {
        if (cart.paymentStatus) { productCount += cart.products.length }
      }

      return res.status(200).json({
          success: true,
          productCount
      })
  } catch(error) {
    return res.status(400).json({
        error: 'Error fetching carts'
    });
  }
});


router.get('/get_all_cart', auth, role.check(ROLES.Admin), async(req, res) => {
  try{
      const c = await Cart.find();

      let carts = []
      for (const cart of c) {
        if (cart.paymentStatus) {
          carts.push(cart)
        }
      }
      return res.status(200).json({
          success: true,
          carts
      })
  } catch(error) {
    return res.status(400).json({
        error: 'Error fetching carts'
    });
  }
});


router.get('/:cartId', auth, async (req, res) => {
  try {
    const cart = req.params.cartId

    const cs = await Cart.findOne({_id: cart});

    if (cs) {
      return res.status(200).json({
        success: true,
        cart: cs
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
})

router.post('/add', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const items = req.body.products;
    const currency = req.body.currency;

    const products = store.caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      products,
      currency
    });

    const cartDoc = await cart.save();

    // decreaseQuantity(products);

    return res.status(200).json({
      success: true,
      cartId: cartDoc.id
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// delete cart
router.delete('/delete/:cartId', auth, async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.cartId });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// update cart
router.post('/add/:cartId', auth, async (req, res) => {
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };
    const cartId = req.params.cartId;

    decreaseQuantity(product);  // decrease quantity of product after a product has been added to edited cart

    await Cart.updateOne(query, { $push: { products: product } });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:cartId/:productId', auth, async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };

    const cs = await Cart.updateOne(query, { $pull: { products: product } });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.delete('/delete_product_from_cart/:cartId/:productId', auth, async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };
    const cartId = req.params.cartId;
    const cart = await Cart.findById(query)
    // fetch teh particular product from the cart using the productId
    let foundProduct = null;
    for (const product of cart.products) {
      if (String(product._id) === String(req.params.productId)) {
        foundProduct = product
      }
    }
    // after deleting product, update order total price and increase quantity of product
    const cs = await Cart.updateOne(query, { $pull: { products: foundProduct } });
    const newOrderTotal = await updateOrderProductsTotal(cartId)
    await Order.findOneAndUpdate({cart: cartId}, { total: newOrderTotal });
    increaseQuantity([foundProduct])  // increase Quantity of produc;

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

/**
 * once a product gets added ore removed to/from a cart by an admin, the cart gets edited, and the order shows the new cart
 * now we need to update the order total as it contains the total amount of products price in the cart
 * then this function is invoke after order has been edited by admin
 * this function calculates the total from totalPrice of each product in the cart of that order
 * then return the total, the new total would be send to the order total field
 * @param {*} cartId 
 * @returns new subTotal
 */
const updateOrderProductsTotal = async(cartId) => {
  const cart = await Cart.findById(cartId);
  const subTotal = cart.products.reduce((sum, product) => {
    const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
    return sum + discountedPrice;
  }, 0);
  return subTotal
}

const increaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

const decreaseQuantity = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

module.exports = router;
