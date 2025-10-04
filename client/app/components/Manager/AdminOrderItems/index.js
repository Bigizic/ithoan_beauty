/**
 *
 * OrderItems
 *
 */

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, DropdownItem, Modal, ModalBody } from 'reactstrap';

import { ROLES, CART_ITEM_STATUS } from '../../../constants';
import DropdownConfirm from '../../Common/DropdownConfirm';
import Button from '../../Common/Button';
import { TrashIcon } from '../../Common/Icon';


/**
 * 
 */
const RenderProductDeleteFromCart = (props) => {
  const { cartId, productId, deleteOrderCartItems } = props;
  return (
    <DropdownConfirm
      label={<TrashIcon />}
    >
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <Button
          variant='danget'
          text='Confirm Delete'
          size='sm'
          onClick={() => deleteOrderCartItems(cartId, productId)}
        />
      </div>

    </DropdownConfirm>
  );
}


/**
 * 
 * @param {*} props 
 */
const AddMoreProduct = ({ products, onConfirm, orderId, cartId, all_currency, selectCurrency }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSelectProduct = (id) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(prodId => prodId !== id)
        : [...prevSelected, id]
    );
  };

  const handleConfirm = () => {
    toggleModal();
    onConfirm(selectedProducts, orderId, cartId);
  };

  return (
    <>
      <Button className='Add_more_products' text={'Edit Products'} onClick={toggleModal}></Button>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Select Products to Add </h3>
            <div className='Add_more_products_cancel' text={'X'} onClick={toggleModal}>X</div>
          </div>
          {selectedProducts.length > 0 &&
            <div className='selected_and_confirm_selection'>
              <Button className='Add_more_products mt-3' onClick={handleConfirm} text={'Confirm Selection'}></Button>
              <p className='selected_add_more_products'>{selectedProducts.length} selected</p>
            </div>
          }
          <div className="order-product-list">
            {products && Object.values(products).map((product, index) => (
              <div key={index} onClick={() => handleSelectProduct(product._id)} className="product-item d-flex align-items-center">
                <div style={{ display: 'flex' }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <span>{product.name}</span>
                    <span><b>Price: </b>{all_currency[selectCurrency]}{(product.price).toLocaleString()}</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span><b>Discount Price: </b>{all_currency[selectCurrency]}{(product.price - (product.price * (product.discountPrice / 100))).toLocaleString()}</span>
                      <span><b>Discount: </b>-{(product.discountPrice).toFixed(2)}%</span>
                    </div>
                  </div>

                </div>
                <input
                  className={'input-checkbox'}
                  type={"checkbox"}
                  checked={selectedProducts.includes(product._id)}
                  readOnly
                />
              </div>
            ))}
          </div>
          {selectedProducts.length > 0 &&
            <Button className='Add_more_products mt-3' onClick={handleConfirm} text={'Confirm Selection'}></Button>
          }
        </ModalBody>
      </Modal>
    </>
  );
};

/**
 * 
 * @param {*} props 
 * @returns 
 */

const AdminOrderItems = props => {
  const { order, user, updateOrderItemStatus, all_currency, products, onAddProducts, deleteOrderCartItems } = props;
  let deliveredOrderStatus = null;
  const isOrderEdited = order.edited;

  const renderPopoverContent = item => {
    const statuses = Object.values(CART_ITEM_STATUS);

    return (
      <div className='d-flex flex-column align-items-center justify-content-center'>
        {statuses.map((s, i) => (
          <DropdownItem
            key={`${s}-${i}`}
            className={s === item?.status ? 'active' : ''}
            onClick={() => updateOrderItemStatus(item._id, s)}
          >
            {s}
          </DropdownItem>
        ))}
      </div>
    );
  };

  const renderItemsAction = item => {
    const isAdmin = user.role === ROLES.Admin;
    if (item.status === 'Delivered') {
      deliveredOrderStatus = item.status
    }

    if (item.status === CART_ITEM_STATUS.Delivered) {
      return (
        <Link
          to={`/product/${item.product.slug}`}
          className='btn-link text-center py-2 fs-12'
          style={{ minWidth: 120 }}
        >
          Reivew Product
        </Link>
      );
    } else {
      return (
        <DropdownConfirm
          label={item.product && item.status}
          className={isAdmin ? 'admin' : ''}
        >
          {renderPopoverContent(item)}
        </DropdownConfirm>
      );
    }
  }

  return (
    <div className='order-items pt-3'>
      <h2 className='text-2xl font-extrabold'>Order Items</h2>
      <Row>
        {order.products.map((item, index) => (
          <Col xs='12' key={index} className='item'>
            <div className='order-item-box'>
              <div className='d-flex justify-content-between flex-column flex-md-row'>
                <div className='d-flex align-items-center box'>
                  <img
                    className='item-image'
                    src={`${item.product && item.product.imageUrl
                      ? item.product.imageUrl
                      : '/images/placeholder-image.png'
                      }`}
                  />
                  <div className='d-md-flex flex-1 align-items-start ml-4 item-box'>
                    <div className='item-details'>
                      {item.product ? (
                        <>
                          <Link
                            to={`/product/${item.product?.slug}`}
                            className='item-link'
                          >
                            <h4 className='d-block item-name one-line-ellipsis'>
                              {item.product?.name}
                            </h4>
                          </Link>
                          <div className='d-flex align-items-center justify-content-between'>
                            <span className='price'>
                              {
                                item.product.discountPrice > 0 ?
                                  (
                                    <div>
                                      <div style={{ display: 'flex' }}>
                                        <p style={{ textDecoration: 'line-through', textDecorationColor: '#da3e8e' }} className='price mb-0'>
                                          {all_currency[order.currency]}{item.product.price}
                                        </p>
                                        <span style={{
                                          color: '#fff',
                                          background: 'black',
                                          marginLeft: '10px',
                                          height: 'fit-content',
                                          padding: '0px 3px'
                                        }}>-{(item.discountPrice).toFixed(2)}%</span>
                                      </div>
                                      <p className='price mb-0'>{all_currency[order.currency]} {(item.product.price - (item.product.price * (item.discountPrice / 100))).toLocaleString()}
                                      </p>
                                    </div>
                                  )
                                  :
                                  (
                                    <span className='price order-label'>{all_currency[order.currency]}{(item.purchasePrice).toLocaleString() || item.product.price.toLocaleString()}</span>
                                  )
                              }
                            </span>
                          </div>
                        </>
                      ) : (
                        <h4>Not Available</h4>
                      )}
                    </div>
                    <div className='d-flex justify-content-between flex-wrap d-md-none mt-1'>
                      <p className='mb-1 mr-4'>
                        Status
                        <span className='order-label order-status'>{` ${item.status}`}</span>
                      </p>
                      <p className='mb-1 mr-4'>
                        Quantity
                        <span className='order-label'>{` ${item.quantity}`}</span>
                      </p>
                      <div>
                        Total Price:
                        {
                          item.product && item.product.discountPrice > 0 ?
                            (
                              <div>
                                <div style={{ display: 'flex' }}>
                                  <p style={{ textDecoration: 'line-through', textDecorationColor: '#da3e8e' }} className='price mb-0'>
                                    {(item.totalPrice).toLocaleString()}
                                  </p>
                                  <span style={{
                                    color: '#fff',
                                    background: 'black',
                                    marginLeft: '10px',
                                    height: 'fit-content',
                                    padding: '0px 3px'
                                  }}>-{(item.discountPrice).toFixed(2)}%</span>
                                </div>
                                <p className='price mb-0'> {item.totalPrice - (item.totalPrice * (item.discountPrice / 100))}
                                </p>
                              </div>
                            )
                            :
                            (
                              <span className='order-label'> {all_currency[order.currency]} {item.totalPrice.toLocaleString()}</span>
                            )
                        }
                      </div>

                      {order.products.length > 1 && isOrderEdited &&
                        <div className='delete_product_from_cart'>
                          <RenderProductDeleteFromCart
                            cartId={order.cartId}
                            productId={item._id}
                            deleteOrderCartItems={(cartId, productId) => deleteOrderCartItems(cartId, productId)}
                          />
                        </div>
                      }

                    </div>
                  </div>
                </div>

                <div className='d-none d-md-flex justify-content-between align-items-center box'>
                  <div className='text-center'>
                    <p className='order-label order-status'>{`${item.status}`}</p>
                    <p className='font-extrabold'>Status</p>
                  </div>

                  <div className='text-center'>
                    <p className='order-label'>{` ${item.quantity}`}</p>
                    <p className='font-extrabold'>Quantity</p>
                  </div>

                  <div className='text-center'>
                    {
                      item.product && item.product.discountPrice > 0 ?
                        (
                          <div>
                            <div style={{ display: 'flex' }}>
                              <p style={{ textDecoration: 'line-through', textDecorationColor: '#da3e8e' }} className='price mb-0'>
                                {all_currency[order.currency]}{item.totalPrice.toLocaleString()}
                              </p>
                              <span style={{
                                color: '#fff',
                                background: 'black',
                                marginLeft: '10px',
                                height: 'fit-content',
                                padding: '0px 3px'
                              }}>-{(item.discountPrice).toFixed(2)}%</span>
                            </div>
                            <p className='price mb-0'>{all_currency[order.currency]} {(item.totalPrice - (item.totalPrice * (item.discountPrice / 100))).toLocaleString()}
                            </p>
                          </div>
                        )
                        :
                        (
                          <span className='order-label'>{all_currency[order.currency]} {(item.totalPrice).toLocaleString()}</span>
                        )
                    }
                    <p className='font-extrabold'>Total Price</p>
                  </div>

                  {order.products.length > 1 && isOrderEdited &&
                    <div className='delete_product_from_cart'>
                      <RenderProductDeleteFromCart
                        cartId={order.cartId}
                        productId={item._id}
                        deleteOrderCartItems={(cartId, productId) => deleteOrderCartItems(cartId, productId)}
                      />
                    </div>
                  }

                </div>
              </div>

              {item.product && (
                <div className='text-right mt-2 mt-md-0'>
                  {renderItemsAction(item)}
                </div>
              )}

            </div>
          </Col>
        ))}
      </Row>


      <Row className='mt-4'>
        {!deliveredOrderStatus &&
          <AddMoreProduct
            products={products}
            onConfirm={onAddProducts}
            orderId={order._id}
            cartId={order.cartId}
            all_currency={all_currency}
            selectCurrency={order.currency}
          />
        }
      </Row>
    </div>
  );
};

export default AdminOrderItems;
