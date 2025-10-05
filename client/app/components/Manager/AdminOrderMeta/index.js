/**
 *
 * OrderMeta
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';
import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { ArrowBackIcon, CheckIcon } from '../../Common/Icon';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useNavigate } from 'react-router-dom';

/**
   * - generates receipt
   * @param {*} order
   * @param {*} all_currency
   */
const generateReceipt = async (order) => {
  // Create a new PDF Document
  const doc = await PDFDocument.create();
  let page = doc.addPage([600, 700]);
  const { width, height } = page.getSize();
  let yPosition = height - 50; // Starting position for content
  const SUBTOTAL = order.products.reduce((sum, product) => {
    const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
    return sum + discountedPrice;
  }, 0);
  // const total = (SUBTOTAL + Math.round(order.paymentFees / 100)).toLocaleString()
  const total = SUBTOTAL;

  const fontSize = 10
  const boldSize = 13
  const currency = order.currency && order.currency.toUpperCase();
  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

  const addNewPage = () => {
    page = doc.addPage([600, 700]);
    yPosition = height - 50;
  };

  const checkSpaceAndAddPage = (spaceNeeded) => {
    if (yPosition - spaceNeeded < 50) addNewPage();
  };

  // Header
  const img = '/images/tohan.jpeg';
  try {
    const imageBytes = await fetch(img).then((res) => res.arrayBuffer());
    const image = await doc.embedJpg(imageBytes);
    page.drawImage(image, { x: 50, y: yPosition - 50, width: 100, height: 100 });
    yPosition -= 10;
  } catch (error) {
    console.log('Image error:', error);
  }
  page.drawText('Property of Tohanniees Skincare', { x: width - 150, y: yPosition, size: 8, font: boldFont });
  yPosition -= 30;

  page.drawText('ORDER RECEIPT', { x: 240, y: yPosition, size: 18, font: boldFont });
  yPosition -= 45

  page.drawText(`Order ID: `, { x: 50, y: yPosition, size: boldSize, font: boldFont });
  page.drawText(order._id, { x: 110, y: yPosition, size: fontSize });

  page.drawText(`Date: `, { x: 50, y: yPosition - 20, size: boldSize, font: boldFont });
  page.drawText(formatDate(order.created), { x: 85, y: yPosition - 20, size: fontSize });

  page.drawText(`Status: `, { x: 50, y: yPosition - 40, size: boldSize, font: boldFont });
  page.drawText(order.products[0].status, { x: 95, y: yPosition - 40, size: fontSize });
  yPosition -= 80;

  // Customer Information
  page.drawText('• Customer Information', { x: 50, y: yPosition, size: 14, font: boldFont });
  yPosition -= 30;

  page.drawText(`Name: `, { x: 60, y: yPosition, size: boldSize, font: boldFont });
  page.drawText(order.user, { x: 105, y: yPosition, size: fontSize });

  page.drawText(`Address: `, { x: 60, y: yPosition - 20, size: boldSize, font: boldFont });
  page.drawText(`${order.selectedAddress.address} ${order.selectedAddress.city} ${order.selectedAddress.state} ${order.selectedAddress.country}`, { x: 120, y: yPosition - 20, size: fontSize });

  page.drawText(`Dispatch type: `, { x: 60, y: yPosition - 40, size: boldSize, font: boldFont});
  page.drawText(order.deliveryType, { x: 151, y: yPosition - 40, size: fontSize });

  page.drawText(`Phone: `, { x: 60, y: yPosition - 60, size: boldSize, font: boldFont });
  page.drawText(order.phoneNumber, { x: 110, y: yPosition - 60, size: fontSize });

  page.drawText(`Email: `, { x: 60, y: yPosition - 80, size: boldSize, font: boldFont });
  page.drawText(order.userEmail, { x: 100, y: yPosition - 80, size: fontSize });

  yPosition -= 120;

  // Order Items
  checkSpaceAndAddPage(40);
  page.drawText('• Products:', { x: 50, y: yPosition, size: 14, font: boldFont });
  yPosition -= 60;
  let count = 0;

for (const item of order.products) {
  count += 1;

  // Check space for each product (image + text block height ~ 150px)
  checkSpaceAndAddPage(150);

  let tempY = yPosition;

  // Embed Product Image
  try {
    const imageBytes = await fetch(item.product?.imageUrl || '/images/placeholder-image.png')
      .then((res) => res.arrayBuffer());
    const image = await doc.embedJpg(imageBytes);
    page.drawImage(image, { x: 50, y: tempY - 100, width: 100, height: 100 }); // 100x100 image
  } catch (error) {
    console.log('Image error:', error);
  }

  // Move Y-position after image
  tempY -= 10;

  // Draw Product Information next to the image
  const infoX = 170; // Position text to the right of the image

  page.drawText(`Product Name: ${item.product.name}`, { x: infoX, y: tempY, size: boldSize, font: boldFont });
  page.drawText(`Price: ${currency}${item.product.price.toLocaleString()}`, { x: infoX, y: tempY - 20, size: fontSize });
  page.drawText(`Quantity: ${item.quantity}`, { x: infoX, y: tempY - 40, size: fontSize });

  if (item.discountPrice > 0) {
    const discountedPrice = (item.product.price * (1 - item.discountPrice / 100)).toLocaleString();
    page.drawText(`Discounted Price: ${currency}${discountedPrice}`, { x: infoX, y: tempY - 60, size: fontSize });
    page.drawText(`Discount: -${(item.discountPrice).toFixed(2)}%`, { x: infoX, y: tempY - 80, size: fontSize });
  } else {
    page.drawText(`Total: ${currency}${(item.purchasePrice || item.product.price).toLocaleString()}`, { x: infoX, y: tempY - 60, size: fontSize });
  }

  // Move yPosition after the entire product block
  yPosition -= 120;
}

// Ensure enough space for the summary
checkSpaceAndAddPage(100);

// Order Summary - Append at the end
yPosition -= 40;
page.drawText('• Order Summary:', { x: 240, y: yPosition, size: 14, font: boldFont });
yPosition -= 30;
page.drawText(`Subtotal: ${currency}${(SUBTOTAL).toLocaleString()}`, { x: 60, y: yPosition, size: boldSize, font: boldFont });
// page.drawText(`Service Charge: ${currency}${(Math.round(order.paymentFees / 100)).toLocaleString()}`, { x: 60, y: yPosition - 20, size: boldSize, font: boldFont });
page.drawText(`Shipping: ${currency}0`, { x: 60, y: yPosition - 40, size: boldSize, font: boldFont });
page.drawText(`Total: ${currency}${(total).toLocaleString()}`, { x: 60, y: yPosition - 60, size: boldSize, font: boldFont });

// Footer
page.drawText('Property of Tohanniees Skincare', { x: width - 150, y: yPosition - 70, size: 8, font: boldFont });


  // Save PDF
  const pdfBytes = await doc.save();

  // Trigger download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `receipt_${order._id}.pdf`;
  link.click();
};


/**
 * 
 * @param {*} props 
 * @returns 
 */

const AdminOrderMeta = props => {
  const { order, cancelOrder, onBack, all_currency } = props;

  const renderMetaAction = () => {
    const isNotDelivered =
      order.products.filter(i => i.status === CART_ITEM_STATUS.Delivered)
        .length < 1;
  };

  const navigate = useNavigate()

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h2 className='mb-0 text-2xl font-extrabold'>Order Details</h2>
        <Button
          variant='link'
          icon={<ArrowBackIcon />}
          size='sm'
          text='Back to orders'
          onClick={() => navigate('/dashboard/orders/customers')}
        />
      </div>

      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'right' }}>
        <Button
          icon={<CheckIcon />}
          variant='secondary'
          text='Generate Receipt'
          size='sm'
          onClick={() => generateReceipt(order)}
        />
      </div>

      <Row>
        <Col xs='12' md='8'>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order ID</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${order._id}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Date</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${formatDate(
                order.created
              )}`}
              </span>
            </Col>
          </Row>

          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Status</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{`${order.products[0].status}`}</span>
            </Col>
          </Row>

        </Col>
        <Col xs='12' md='4' className='text-left text-md-right'>
          {renderMetaAction()}
        </Col>
      </Row>
    </div>
  );
};

export default AdminOrderMeta;
