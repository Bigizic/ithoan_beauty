import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Button from "../../components/Common/Button";
import { Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import actions from '../../actions';
import { CloseIcon } from "../../components/Common/Icon";
import { getBankNameByCode } from "../../components/Common/BankCodes";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import Input from "../../components/Common/Input";
import { useNavigate } from "react-router-dom";
import AdvancedImageUpload from "@/components/Common/AdvancedImageUpload";


const PaymentGateway = (props) => {
  const {
    user,
    orderIsLoading, isOrderOpen, closeModal,
    all_currency, selectCurrency, amount,
    banks, copiedBank, orderReceipts,
    handleImageUpload, formErrors, handleOrderCheckout,
    handleBankCopy, setOrderNote,
  } = props;
  const navigate = useNavigate()
  return (
    <div className="easy-checkout">
      {orderIsLoading && <LoadingIndicator />}
      {/* Payment Details Modal */}
      <Modal className="easy-checkout" isOpen={isOrderOpen} toggle={closeModal} centered>
        <div className="modal-header">
          {orderIsLoading && <LoadingIndicator />}
          <h5 className="modal-title">Pay with Transfer</h5>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'self-end' }}>
            <Button
              type="button"
              extraIconClassName='close_icon_container'
              icon={<CloseIcon />}
              className="close_payment_gateway"
              onClick={() => closeModal(navigate)}
              aria-label="Close"
            />
            <p>{user.firstName} {user.lastName}</p>
          </div>
        </div>
        <ModalBody className="modal-body">

          <div style={{ textAlign: 'center' }}>
            <h3>Transfer {all_currency[selectCurrency]}{(amount).toLocaleString()} to Any of the Bank Below</h3>
          </div>

          <div className="bank_container">
            {banks.map((bank, index) => (
              <Row key={index}>
                <Col>
                  <div>
                    <h6>BANK NAME</h6>
                    <h6 style={{ fontWeight: '900' }}>{(getBankNameByCode(bank.bank_name).toUpperCase())}</h6>
                  </div>

                  <div>
                    <h6>ACCOUNT NAME</h6>
                    <h6 style={{ fontWeight: '900' }}>{(bank.name).toUpperCase()}</h6>
                  </div>

                  <div>
                    <h6>ACCOUNT NUMBER</h6>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h6 style={{ fontWeight: '900' }}>{bank.number}</h6>

                      <Button
                        className="account_number_copy"
                        text={copiedBank === bank.number ? "Copied" : "Copy"}
                        color="info"
                        onClick={() => handleBankCopy(bank.number)}
                      />
                    </div>
                  </div>

                  <hr></hr>
                </Col>
              </Row>
            ))}
          </div>

          <div>
            <h3 style={{ textAlign: 'center', marginTop: '10px' }}>Upload Payment Receipt</h3>
            <div className="uploaded_images">
              <AdvancedImageUpload
                maxFiles={1}
                onInputChange={(e, v) => handleImageUpload(v)}
              />
              {/*orderReceipts && orderReceipts.map((imgSrc, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img src={URL.createObjectURL(imgSrc)} alt={`Receipt ${index + 1}`} style={{ width: "90px", marginRight: "10px" }} />
                </div>
              ))*/}
            </div>
            {/*orderReceipts && orderReceipts.length < 1 && (
              <Col xs='12' md='12'>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />
              </Col>
            )*/}
            {formErrors && <p style={{ color: "red", marginLeft: '15px' }}>{formErrors}</p>}
            <Input className="leave_a_note" placeholder={"Leave a note"} onInputChange={(n, v) => setOrderNote(v)} />
          </div>

        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button text="I have paid" type="success" className="i_have_paid" onClick={() => handleOrderCheckout(navigate)}> </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

const mapStateToProps = state => {
  const sL = state.currency.select_currency.length;
  return {
    user: state.account.user,
    banks: state.account.banks,
    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,
    amount: state.cart.cartTotal && state.cart.cartTotal || 0,
    copiedBank: state.payment.copiedBank,
    formErrors: state.payment.formErrors,

    isOrderOpen: state.payment.isOrderOpen,
    orderReceipts: state.payment.orderReceipts,
    orderIsLoading: state.payment.orderIsLoading,
  };
};

export default connect(mapStateToProps, actions)(PaymentGateway);
