import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Button from "../../components/Common/Button";
import { Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import actions from '../../actions';
import { XIcon } from "lucide-react";
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
  const navigate = useNavigate();
  if (!isOrderOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center py-4">
      {orderIsLoading &&
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <LoadingIndicator />
        </div>
      }
      {/* Payment Details Modal */}
      <div className="relative bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0px_4px_4px_#00000040]">
        <div className="sticky top-0 bg-white border-b border-[#1c1c1c1a] p-6 flex items-center justify-between rounded-t-[20px]">
          <h2 className="text-2xl font-bold text-[#1c1c1c] [font-family:'Bricolage_Grotesque',Helvetica]">
            Pay with Transfer
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'self-end' }}>
            <button
              onClick={() => closeModal(navigate)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6 text-[#1c1c1c]" />
            </button>
            <p>{user.firstName} {user.lastName}</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="text-xl font-medium text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
              <h3>Transfer {all_currency[selectCurrency]}{(amount).toLocaleString()} to Any of the Bank Below</h3>
            </div>
          </div>

          <div className="space-y-4">
            {banks.map((bank, index) => (
              <div key={index} className="border border-[#1c1c1c1a] rounded-[10px] p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-[#1c1c1c]/60 [font-family:'Poppins',Helvetica]">BANK NAME</p>
                    <p className="text-base font-bold text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                      {getBankNameByCode(bank.bank_name).toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#1c1c1c]/60 [font-family:'Poppins',Helvetica]">ACCOUNT NAME</p>
                    <p className="text-base font-bold text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                      {bank.name.toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#1c1c1c]/60 [font-family:'Poppins',Helvetica]">ACCOUNT NUMBER</p>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
                        {bank.number}
                      </p>
                      <button
                        onClick={() => handleBankCopy(bank.number)}
                        className="bg-black text-white text-sm px-4 py-[2px]"
                      >
                        {copiedBank === bank.number ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-[#1c1c1c] [font-family:'Bricolage_Grotesque',Helvetica] text-center">
              Upload Payment Receipt
            </h3>
            <AdvancedImageUpload
              maxFiles={1}
              onInputChange={(e, v) => handleImageUpload(v)}
            />
            {formErrors && (
              <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica]">{formErrors}</p>
            )}
            <div className="flex flex-row justify-center">
              <input
                placeholder="Leave a note (optional)"
                onChange={(e) => setOrderNote(e.target.value)}
                className="h-[42px] w-full rounded-[5px] border border-solid border-[#1c1c1c6b] [font-family:'Poppins',Helvetica] pl-2"
              />
            </div>
          </div>

        </div>
        <div className="sticky bottom-0 bg-white border-t border-[#1c1c1c1a] p-6 rounded-b-[20px]">
          <button
            onClick={() => handleOrderCheckout(navigate)}
            disabled={orderIsLoading || orderReceipts.length === 0}
            className="w-full bg-black text-white py-3 text-base font-medium [font-family:'Poppins',Helvetica] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I have paid
          </button>
        </div>
      </div>
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
