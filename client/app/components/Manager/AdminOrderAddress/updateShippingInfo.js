import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import LoadingIndicator from "../../Common/LoadingIndicator";
import DropdownConfirm from "../../Common/DropdownConfirm";

const shippingInfo = ['lagos delivery', 'Inter state', 'International(abroad)']

const PhoneNumberInput = ({ onPhoneChange, val }) => {
  const [value, setValue] = useState(val);

  const handleChange = (phoneNumber) => {
    setValue(phoneNumber);
    if (onPhoneChange) {
      onPhoneChange(phoneNumber);
    }
  };

  return (
    <div>
      <label htmlFor="phone-input" style={{ marginBottom: '10px', display: 'block' }}>
        Phone Number:
      </label>
      <PhoneInput
        id="phone-input"
        placeholder="Enter phone number"
        defaultCountry="NG"
        value={value}
        onChange={handleChange}
        international
        countryCallingCodeEditable={true}
        className="phone-input"
      />
    </div>
  );
};

const LoadShippingInformationModal = (props) => {
    const { address, city, state, country, deliveryType, phoneNumber, updateOrderShippingInformation, isLoading } = props;
    return (
        <div className="edit_order_shipping_address_container">
            { isLoading &&  <LoadingIndicator />}
            <Input
              label="Address"
              value={address}
              type="text"
              onInputChange={(name, value) => updateOrderShippingInformation('address', value)}
            />
            <Input
              label="City"
              type="text"
              value={city}
              onInputChange={(name, value) => updateOrderShippingInformation('city', value)}
            />
            <Input
              label="State"
              type="text"
              value={state}
              onInputChange={(name, value) => updateOrderShippingInformation('state', value)}
            />
            <Input
              label="Country"
              type="text"
              value={country}
              onInputChange={(name, value) => updateOrderShippingInformation('country', value)}
            />
            <label>Delivery Type</label>
            <DropdownConfirm label={deliveryType}>
              {shippingInfo.map((item, index) => (
                <div key={index}>
                  {item !== deliveryType && 
                    <Button
                      variant='primary'
                      size='sm'
                      text={`${item}`}
                      className={"order_update_delivery_type_button"}
                      onClick={() => updateOrderShippingInformation('deliveryType', item)}
                    />
                  }
                </div>
              ))}
            </DropdownConfirm>
            <br></br>
            <PhoneNumberInput
              val={phoneNumber}
              onPhoneChange={(value) => updateOrderShippingInformation('phoneNumber', value)}
            />
        </div>
    )
};

const UpdateShippingInfo = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { order, updateOrderShippingInformation, isLoading, updateShippingInformation } = props;
    return (
        <div className="edit_order_shipping_address">
            <Button size={"sm"} round={0} text={"Edit shipping information"} onClick={() => setModalVisible(true)}/>
            <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)}>
              <ModalBody>
                <LoadShippingInformationModal
                  address={order?.address}
                  city={order?.city}
                  state={order?.state}
                  country={order?.country}
                  deliveryType={order?.deliveryType}
                  phoneNumber={order?.phoneNumber}
                  updateOrderShippingInformation={updateOrderShippingInformation}
                  isLoading={isLoading}
                />
              </ModalBody>
              <ModalFooter>
                <div className="edit_order_shipping_address_buttons_container">
                    <Button onClick={() => updateShippingInformation()} className="cough_cough" text="Save" />
                    <Button text="Cancel" onClick={() => setModalVisible(false)} />
                </div>
              </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdateShippingInfo;