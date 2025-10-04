import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../app/store'
import { actions, ACTIONSTYPE } from '../../actions'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { LoadingIndicator } from '../../components/Common/LoadingIndicator'
import { X as CloseIcon } from 'lucide-react'
import AdvancedImageUpload from '../../components/Common/AdvancedImageUpload'
import { useNavigate } from 'react-router-dom'

interface Bank {
  number: string
  name: string
  bank_name: string
}

interface PaymentGatewayProps {
  isPaymentOpen: boolean
  paymentIsLoading: boolean
  bookingId: string
  paymentReceipts: File[]
  copiedBank: string
  formErrors: string
  note: string
  banks: Bank[]
  totalAmount: number
}

const PaymentGateway = (props: PaymentGatewayProps & ACTIONSTYPE) => {
  const getBankNameByCode = (code: string): string => {
    const bankCodes: { [key: string]: string } = {
      '044': 'Access Bank',
      '063': 'Access Bank (Diamond)',
      '035A': 'ALAT by WEMA',
      '401': 'ASO Savings and Loans',
      '50931': 'Bowen Microfinance Bank',
      '50823': 'CEMCS Microfinance Bank',
      '023': 'Citibank Nigeria',
      '50910': 'Consumer Microfinance Bank',
      '50204': 'Ekondo Microfinance Bank',
      '562': 'Ekondo Microfinance Bank',
      '50263': 'Finca Microfinance Bank',
      '070': 'Fidelity Bank',
      '011': 'First Bank of Nigeria',
      '214': 'First City Monument Bank',
      '00103': 'Globus Bank',
      '058': 'Guaranty Trust Bank',
      '030': 'Heritage Bank',
      '50383': 'Hasal Microfinance Bank',
      '51251': 'Hackman Microfinance Bank',
      '50457': 'Infinity Microfinance Bank',
      '301': 'Jaiz Bank',
      '082': 'Keystone Bank',
      '50211': 'Kuda Bank',
      '50563': 'Lagos Building Investment Company Plc.',
      '50546': 'Meridian Microfinance Bank',
      '50515': 'Moniepoint Microfinance Bank',
      '076': 'Polaris Bank',
      '101': 'Providus Bank',
      '502': 'Rand Merchant Bank',
      '50767': 'Sparkle Microfinance Bank',
      '221': 'Stanbic IBTC Bank',
      '068': 'Standard Chartered Bank',
      '232': 'Sterling Bank',
      '100': 'Suntrust Bank',
      '032': 'Union Bank of Nigeria',
      '033': 'United Bank For Africa',
      '215': 'Unity Bank',
      '035': 'Wema Bank',
      '057': 'Zenith Bank'
    }
    return bankCodes[code] || code
  }

  const {
    isPaymentOpen,
    paymentIsLoading,
    paymentReceipts,
    copiedBank,
    formErrors,
    banks,
    totalAmount,
    togglePayment,
    handleBankCopy,
    handleImageUpload,
    setPaymentNote,
    handlePaymentCheckout,
    closePaymentModal
  } = props
  const navigate = useNavigate()

  if (!isPaymentOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {paymentIsLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <LoadingIndicator />
        </div>
      )}

      <div className="relative bg-white rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0px_4px_4px_#00000040]">
        <div className="sticky top-0 bg-white border-b border-[#1c1c1c1a] p-6 flex items-center justify-between rounded-t-[20px]">
          <h2 className="text-2xl font-bold text-[#1c1c1c] [font-family:'Bricolage_Grotesque',Helvetica]">
            Pay with Transfer
          </h2>
          <button
            onClick={() => closePaymentModal()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseIcon className="w-6 h-6 text-[#1c1c1c]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-[#1c1c1c] [font-family:'Poppins',Helvetica]">
              Transfer ₦{totalAmount?.toLocaleString()} to Any of the Bank Below
            </h3>
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
                      <Button
                        onClick={() => handleBankCopy(bank.number)}
                        className="bg-[#eabe30] hover:bg-[#d4a820] text-[#1c1c1c] text-sm px-4 py-2"
                      >
                        {copiedBank === bank.number ? 'Copied' : 'Copy'}
                      </Button>
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
              onInputChange={(e: any, v: any) => handleImageUpload(v)}
            />
            {formErrors && (
              <p className="text-sm text-red-600 [font-family:'Poppins',Helvetica]">{formErrors}</p>
            )}
            <Input
              placeholder="Leave a note (optional)"
              onChange={(e) => setPaymentNote(e.target.value)}
              className="h-[42px] rounded-[5px] border border-solid border-[#1c1c1c6b] [font-family:'Poppins',Helvetica]"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#1c1c1c1a] p-6 rounded-b-[20px]">
          <Button
            onClick={() => handlePaymentCheckout(navigate)}
            disabled={paymentIsLoading || paymentReceipts.length === 0}
            className="w-full bg-[#eabe30] hover:bg-[#d4a820] text-[#1c1c1c] py-3 text-base font-medium [font-family:'Poppins',Helvetica] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            I have paid
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isPaymentOpen: state.payment.isPaymentOpen,
    paymentIsLoading: state.payment.paymentIsLoading,
    bookingId: state.payment.bookingId,
    paymentReceipts: state.payment.paymentReceipts,
    copiedBank: state.payment.copiedBank,
    formErrors: state.payment.formErrors,
    note: state.payment.note,
    banks: state.booking.banks || [],
    totalAmount: state.booking.selectedSubService?.price || 0
  }
}

export default connect(mapStateToProps, actions)(PaymentGateway)
