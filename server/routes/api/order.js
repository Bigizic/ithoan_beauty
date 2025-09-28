const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');
const keys = require('../../config/keys');

// Bring in Models & Utils
const Address = require('../../models/address')
const Order = require('../../models/order');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const emailService = require('../../services/emailService');
const store = require('../../utils/store');
const { ROLES, CART_ITEM_STATUS } = require('../../constants');
const PaymentHandler = require('../../utils/payment_handler');
const User = require('../../models/user');
const productCount = require('../../models/productCount');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadType = keys.upload.type;
const cloudinaryFileStorage  = require('../../utils/cloud_file_manager.js');

const all_currency = {
  usd: '$',
  ngn: '₦',
  gbp: '£',
}

const { adminEmail, secondAdminEmail } = keys.adminEmail;
const BASEIMAGE = 'https://res.cloudinary.com/dduai6ryd/image/upload/v1736088530/ithoan/images/logo/business_logo.png'


/**
 * generates unique code
 */
const generateUniqueCode = () => {
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = '0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code
}


/**
 * create new object id (_id)
 * @returns 
 */
const newObjectId = async() => {
  let uniqueCode = generateUniqueCode()
  let orderFound = await Order.exists({ _id: uniqueCode })

  while (orderFound) {
    uniqueCode = generateUniqueCode();
    orderFound = await Order.exists({ _id: uniqueCode })
  }
  return uniqueCode;
}


// admin edit order address
router.put('/edit/order_address/:id', auth, role.check(ROLES.Admin), async(req, res) => {
  try {
    const orderId = req.params.id;
    const {
      address, city, state, country, deliveryType, phoneNumber
    } = req.body;

    const updateOrder = await Order.findByIdAndUpdate(orderId,
      {
        $set: {
          "address.address": address,
          "address.city": city,
          "address.state": state,
          "address.country": country,
          "deliveryType": deliveryType,
          "phoneNumber": phoneNumber
        }
      },
      { new: true }
    )

    if (updateOrder) {
      const user = await User.findById({_id: updateOrder.user});
      const cs = await Cart.findOne({ _id: updateOrder.cart });
      if (user) {
      // send email to user
      const newOrder = {
        _id: updateOrder._id,
        created: updateOrder.created,
        user: user,
        total: updateOrder.total,
        products: cs.products,
        address: updateOrder.address,
        paymentChannel: `paid with transfer`,
        currency: all_currency[cs.currency],
        dispatch: updateOrder.deliveryType,
        paymentType: 'Transfer',
        phoneNumber: updateOrder.phoneNumber,
        image: BASEIMAGE
      };
      await emailService.sendEmail(user.email, 'order-address-change', newOrder);
      }
      return res.status(200).json({
        success: true,
        message: 'order has ben updated'
      })
    }
  } catch (error) {
    return res.status(400).json(
      { error: 'error editing order address' }
    )
  }
})


router.put('/edit/order', auth, upload.fields([
  { name: 'image_0', maxCount: 1 },
  { name: 'image_1', maxCount: 1 },
  { name: 'image_2', maxCount: 1 },
]), async (req, res) => {
  try {
    const images = req.files;
    const orderId = req.body.orderId;
    const status = true;
    const note = req.body.note || null;

    if (!images || !orderId) {
      return res.status(400).json({ message: 'please upload an image' });
    }
    let imagesList = []

    if (uploadType === 'cloud_storage' && images) {
      let imageUrl, imageKey = null;
      for (const key in images) {
        const image = images[key][0]
        const result = await cloudinaryFileStorage(image, 'order_receipts/');
        imageUrl = result.imageUrl;
        imageKey = result.imageKey;
        imagesList.push(imageUrl);
      }
    }
    const update = {
      $set: {
        status,
        paymentReceipt: imagesList,
        paymentType: 'Transfer',
        paymentStatus: 'Paid',
        note,
      }
    }
    const options = { new: true };
    const updateOrder = await Order.findOneAndUpdate(
      {_id: orderId},
      update,
      options
    )

    const cartDoc = await Cart.findById(updateOrder.cart);

    if (status) {
      const cs = await Cart.findOne({ _id: updateOrder.cart });
      await Cart.findByIdAndUpdate(updateOrder.cart, { paymentStatus: true })
      const user = await User.findById(updateOrder.user)

      // create product count to keep how many times a product is being bought
      for (const item of cs.products) {
        // find a product in the product count,
        // if it doesn't exist, create a new one else appenrd to the count of the product
          const fetchProductCount = await productCount.findOne({ cartId: updateOrder.cart, product: item.product })
          if (fetchProductCount) {
            await productCount.updateOne({ _id: fetchProductCount._id }, { $set: { boughtCount: fetchProductCount.boughtCount + item.quantity } })
          }
      }
      const newOrder = {
        _id: updateOrder._id,
        created: updateOrder.created,
        user: user,
        total: updateOrder.total,
        products: cs.products,
        address: updateOrder.address,
        paymentChannel: `paid with transfer`,
        currency: all_currency[cartDoc.currency],
        dispatch: updateOrder.deliveryType,
        paymentType: 'Transfer',
        image: BASEIMAGE
      };

      // decrease quantity if the order has been successful
      const products = store.caculateItemsSalesTax(cartDoc.products);
      decreaseQuantity(products);

      await emailService.sendEmail(user.email, 'order-confirmation', newOrder);

      // send email to admin
      if (secondAdminEmail) {
        await emailService.sendEmail(secondAdminEmail, 'admin-order-confirmation', newOrder);
      }
      if (adminEmail) {
        await emailService.sendEmail(adminEmail, 'admin-order-confirmation', newOrder);
      }

      return res.status(200).json({
        success: true,
        message: `Your order has been placed successfully!`,
        order: { _id: updateOrder._id },
        // paystack_access_code: paystackData.access_code,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }

})


router.post('/add', auth, async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user._id;
    const currency = req.body.currency;
    const address = req.body.selectedAddress;
    const phoneNumber = req.body.phoneNumber;
    const deliveryType = req.body.deliveryType;

    const fetchAddress = await Address.findOne({ _id: address })
    const cs = await Cart.findOne({ _id: cart });
    let productIds = [];

    // create product count to keep how many times a product is being bought
    for (const item of cs.products) {
      // find a product in the product count,
      // create a new one else
      productIds.push(item.product);
      const newProductCount = new productCount({
        product: item.product,
        count: item.quantity,
        cartId: cart,
      });
      await newProductCount.save();
    }
    const ID = await newObjectId();
    const order = new Order({
      _id: ID,
      cart,
      user,
      total,
      currency,
      address: {
        address: fetchAddress.address,
        city: fetchAddress.city,
        state: fetchAddress.state,
        country: fetchAddress.country,
      },
      phoneNumber,
      deliveryType,
      amount: total,
    });

    await order.save();
    return res.status(200).json({
      success: true,
      order
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// search orders api
router.get('/search', auth, async (req, res) => {
  try {
    const { search } = req.query;

    if (!Mongoose.Types.ObjectId.isValid(search)) {
      return res.status(200).json({
        orders: []
      });
    }

    let ordersDoc = null;

    if (req.user.role === ROLES.Admin) {
      ordersDoc = await Order.find({
        _id: Mongoose.Types.ObjectId(search)
      }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    } else {
      const user = req.user._id;
      ordersDoc = await Order.find({
        _id: Mongoose.Types.ObjectId(search),
        user
      }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    }

    ordersDoc = ordersDoc.filter(order => order.cart);

    if (ordersDoc.length > 0) {
      const newOrders = ordersDoc.map(o => {
        return {
          _id: o._id,
          total: parseFloat(Number(o.total.toFixed(2))),
          created: o.created,
          products: o.cart?.products,
          currency: o.cart.currency,
          status: o.status,
        };
      });

      let orders = newOrders.map(o => store.caculateTaxAmount(o));
      orders.sort((a, b) => b.created - a.created);
      return res.status(200).json({
        orders
      });
    } else {
      return res.status(200).json({
        orders: []
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch orders api
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const ordersDoc = await Order.find()
      .sort('-created')
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const count = await Order.countDocuments();
    const orders = await store.formatOrders(ordersDoc);

    const productsCount = await Order.find({ status: true });
    let paidCount = productsCount.length

    return res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count,
      paidCount,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// return all orders
router.get('/all_orders', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// fetch my orders api
router.get('/me', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const user = req.user._id;
    const query = { user };

    const ordersDoc = await Order.find(query)
      .sort('-created')
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const count = await Order.countDocuments(query);
    const orders = await store.formatOrders(ordersDoc);

    return res.status(200).json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      count
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    let orderDoc = null;

    if (req.user.role === ROLES.Admin) {
      orderDoc = await Order.findOne({ _id: orderId }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    } else {
      const user = req.user._id;
      orderDoc = await Order.findOne({ _id: orderId, user }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    }

    if (!orderDoc || !orderDoc.cart) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }
    // const selectedAddress = await Address.findOne({_id: orderDoc.address})
    const selectedAddress = orderDoc.address
    const { firstName, lastName, email } = await User.findOne({ _id: orderDoc.user });


    let order = {
      _id: orderDoc._id,
      total: orderDoc.total,
      created: orderDoc.created,
      totalTax: 0,
      products: orderDoc?.cart?.products,
      cartId: orderDoc.cart._id,
      currency: orderDoc.cart.currency,
      selectedAddress: selectedAddress,
      phoneNumber: orderDoc.phoneNumber,
      status: orderDoc.status,
      user: `${firstName} ${lastName}`,
      userEmail: email,

      amount: orderDoc.amount,
      paymentStatus: orderDoc.paymentStatus,
      paymentType: orderDoc.paymentType,
      deliveryType: orderDoc.deliveryType,

      edited: orderDoc.edited,
      receipts: orderDoc.paymentReceipt,
      note: orderDoc.note,
    };

    order = store.caculateTaxAmount(order);

    return res.status(200).json({
      order
    });
  } catch (error) {
    return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
  }
});

router.delete('/cancel/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    // increase the quantity of products as order being deleted
    increaseQuantity(foundCart.products);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/status/item/:itemId', auth, async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const orderId = req.body.orderId;
    const cartId = req.body.cartId;
    const status = req.body.status || CART_ITEM_STATUS.Cancelled;

    const foundCart = await Cart.findOne({ 'products._id': itemId });
    const user = await User.findOne({ _id: foundCart.user });
    const foundCartProduct = foundCart.products.find(p => p._id == itemId);
    const updateOrder = await Order.findOne({ _id: orderId });
    const cart = await Cart.findOne({ _id: cartId });


    const order = {
      _id: orderId,
      status: status,
      created: updateOrder.created,
      user: user,
      total: updateOrder.total,
      products: cart.products,
      address: updateOrder.address,
      paymentChannel: `paid with transfer`,
      currency: all_currency[cart.currency],
      dispatch: updateOrder.deliveryType,
      paymentType: 'Transfer',
      image: BASEIMAGE
    }

    await Cart.updateOne(
      { 'products._id': itemId },
      {
        'products.$.status': status
      }
    );

    if (status === CART_ITEM_STATUS.Cancelled) {
      await Product.updateOne(
        { _id: foundCartProduct.product },
        { $inc: { quantity: foundCartProduct.quantity } }
      );

      const items = cart.products.filter(
        item => item.status === CART_ITEM_STATUS.Cancelled
      );

      // All items are cancelled => Cancel order
      if (cart.products.length === items.length) {
        // don't delete orders from this view, only set
        // order status to cancel and user
        // would see order status to cancelled in the
        // cancelled section
        // await Order.deleteOne({ _id: orderId });
        // await Cart.deleteOne({ _id: cartId });

        await sendUpdateEmail(user.email, order);
        return res.status(200).json({
          success: true,
          orderCancelled: true,
          message: `${
            req.user.role === ROLES.Admin ? 'Order' : 'Your order'
          } has been cancelled successfully`
        });
      }

      await sendUpdateEmail(user.email, order);
      return res.status(200).json({
        success: true,
        message: 'Item has been cancelled successfully!'
      });
    }

    await sendUpdateEmail(user.email, order);
    return res.status(200).json({
      success: true,
      message: 'Item status has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.put('/update_order_products', auth, role.check(ROLES.Admin), async(req, res) => {
  try {
    const { orderId, edited, status, cartId, selectedProductsLength } = req.body;

    // sets unpaid order to paid
    if (orderId && status) {
      const order = await Order.findByIdAndUpdate(orderId, { status });
      await Cart.findByIdAndUpdate(order.cart, { paymentStatus: true })
      return res.status(200).json({
        success: true,
        message: 'Order has been mark as paid'
      })
    }

    if (orderId && edited) {
      // here it gets invoke when the cart has been updated so the total of the order should be calculated and update the order total
      const total = await updateOrderProductsTotal(cartId);
      const updateOrder = await Order.findByIdAndUpdate(orderId, { edited, total });
      const user = await User.findById(updateOrder.user);
      const cart = await Cart.findById(updateOrder.cart);

      const order = {
        _id: orderId,
        status: status,
        created: updateOrder.created,
        user: user,
        total: updateOrder.total,
        products: cart.products,
        address: updateOrder.address,
        paymentChannel: `paid with transfer`,
        currency: all_currency[cart.currency],
        dispatch: updateOrder.deliveryType,
        paymentType: 'Transfer',
        image: BASEIMAGE
      }
      await sendUpdateEmail(user.email, order, 'order-products-update', selectedProductsLength);
      return res.status(200).json({
        success: true,
        message: 'Order has been edited'
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: "There's been an error fetching products please wait"
    });
  }
})

/**
 * once a product gets added to a cart by an admin, the cart gets edited, and the order shows the new cart
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


/**
 * 
 * @param {*} products 
 */

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

const sendUpdateEmail = async(email, order, orderType=null, selectedProductsLength=null) => {
  if (selectedProductsLength) {
    await emailService.sendEmail(email, orderType, order, selectedProductsLength);
  } else {
    await emailService.sendEmail(email, 'update-order', order);    
  }
}




/*
router.post('/add', auth, async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.user._id;
    const currency = req.body.currency;
    const address = req.body.selectedAddress;
    const payStackReference = req.body.paystackReference;
    const payStackId = req.body.paystackId;
    const phoneNumber = req.body.phoneNumber;
    const deliveryType = req.body.deliveryType;

    const fetchAddress = await Address.findOne({ _id: address })
    const cs = await Cart.findOne({ _id: cart });
    let productIds = [];

    // create product count to keep how many times a product is being bought
    for (const item of cs.products) {
      // find a product in the product count,
      // create a new one else
      productIds.push(item.product);
      const newProductCount = new productCount({
        product: item.product,
        count: item.quantity,
        cartId: cart,
      });
      await newProductCount.save();
    }
    const ID = await newObjectId();
    const order = new Order({
      _id: ID,
      cart,
      user,
      total,
      currency,
      address: {
        address: fetchAddress.address,
        city: fetchAddress.city,
        state: fetchAddress.state,
        country: fetchAddress.country,
      },
      payStackReference,
      payStackId,
      phoneNumber,
      deliveryType,
      amount: total,
    });

    await order.save();
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});*/



/*
router.put('/edit/order/', auth, async (req, res) => {
  try {
    const payStackId = req.body.payStackId;
    const payStackReference = req.body.paystackReference;
    const email = req.user.email;

    // paystack action
    
    // confirm order via paystack
    const verifyPayment = await PaymentHandler(payStackId);
    const status = verifyPayment.data.status === 'success' ? true : false;
    const paymentType = verifyPayment.data.channel;
    const paymentFees = Math.round(verifyPayment.data.fees / 100);

    //if (!status) {
      //res.status(400).json({
        //error: 'Your request could not be processed. Please try again.'
      //});
    }//

      const update = {
        $set: {
          payStackReference,
          status,
          paymentType,
          paymentFees,
        }
      }
      const options = { new: true };
      const updateOrder = await Order.findOneAndUpdate(
        { payStackId: payStackId },
        update,
        options
      )
  
      const cartDoc = await Cart.findById(updateOrder.cart);
  
      if (status) {
        const cs = await Cart.findOne({ _id: updateOrder.cart });
        await Cart.findByIdAndUpdate(updateOrder.cart, { paymentStatus: true })
        const user = await User.findById(updateOrder.user)
  
        // create product count to keep how many times a product is being bought
        for (const item of cs.products) {
          // find a product in the product count,
          // if it doesn't exist, create a new one else appenrd to the count of the product
            const fetchProductCount = await productCount.findOne({ cartId: updateOrder.cart, product: item.product })
            if (fetchProductCount) {
              await productCount.updateOne({ _id: fetchProductCount._id }, { $set: { boughtCount: fetchProductCount.boughtCount + item.quantity } })
            }
        }
        const newOrder = {
          _id: updateOrder._id,
          created: updateOrder.created,
          user: user,
          total: updateOrder.total,
          serviceCharge: paymentFees,
          products: cs.products,
          address: updateOrder.address,
          paystackReference: payStackReference,
          paymentChannel: `paid with ${paymentType}`,
          currency: all_currency[cartDoc.currency],
          dispatch: updateOrder.deliveryType,
          paymentType: updateOrder.paymentType,
          image: 'https://res.cloudinary.com/dduai6ryd/image/upload/v1736088530/ithoan/images/logo/business_logo.png'
        };
  
        // decrease quantity if the order has been successful
        const products = store.caculateItemsSalesTax(cartDoc.products);
        decreaseQuantity(products);
  
        await mailgun.sendEmail(email, 'order-confirmation', newOrder);
  
        // send email to admin
        if (secondAdminEmail) {
          await mailgun.sendEmail(secondAdminEmail, 'admin-order-confirmation', newOrder);
        }
        if (adminEmail) {
          await mailgun.sendEmail(adminEmail, 'admin-order-confirmation', newOrder);
        }
  
        return res.status(200).json({
          success: true,
          message: `Your order has been placed successfully!`,
          order: { _id: updateOrder._id },
          // paystack_access_code: paystackData.access_code,
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  
})*/


/*
// fetch order api
router.get('/:orderId', auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    let orderDoc = null;

    if (req.user.role === ROLES.Admin) {
      orderDoc = await Order.findOne({ _id: orderId }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    } else {
      const user = req.user._id;
      orderDoc = await Order.findOne({ _id: orderId, user }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
        }
      });
    }

    if (!orderDoc || !orderDoc.cart) {
      return res.status(404).json({
        message: `Cannot find order with the id: ${orderId}.`
      });
    }
    // const selectedAddress = await Address.findOne({_id: orderDoc.address})
    const selectedAddress = orderDoc.address
    const { firstName, lastName, email } = await User.findOne({ _id: orderDoc.user });

    // send request to paystack to fetch order details
    const paymentDetails = await PaymentHandler(orderDoc.payStackId);

    let order = {
      _id: orderDoc._id,
      total: orderDoc.total,
      created: orderDoc.created,
      totalTax: 0,
      products: orderDoc?.cart?.products,
      cartId: orderDoc.cart._id,
      currency: orderDoc.cart.currency,
      selectedAddress: selectedAddress,
      phoneNumber: orderDoc.phoneNumber,
      status: orderDoc.status,
      payStackReference: orderDoc.payStackReference,
      payStackId: orderDoc.payStackId,
      paymentType: orderDoc.paymentType,
      user: `${firstName} ${lastName}`,
      userEmail: email,

      amount: paymentDetails.data.amount,
      paymentStatus: paymentDetails.data.gateway_response,
      paymentDate: paymentDetails.data.paid_at,
      paymentCurrency: paymentDetails.data.currency,
      paymentFees: paymentDetails.data.fees,
      deliveryType: orderDoc.deliveryType,

      edited: orderDoc.edited,
    };

    order = store.caculateTaxAmount(order);

    return res.status(200).json({
      order
    });
  } catch (error) {
    return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
  }
});*/

module.exports = router;
