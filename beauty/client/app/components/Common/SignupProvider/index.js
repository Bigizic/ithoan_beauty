import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const PhoneNumberInput = ({ onPhoneChange, val }) => {
  const [value, setValue] = useState(val || ''); // Set initial value from prop

  const handleChange = (phoneNumber) => {
    setValue(phoneNumber); // Update local state
    if (onPhoneChange) {
      onPhoneChange(phoneNumber); // Notify parent of the change
    }
  };

  return (
    <div>
      <label htmlFor="phone-input" style={{ marginBottom: '10px', display: 'block' }}>
        Enter your phone number to complete sign up:
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
      <p className='phoneNumberError' style={{ color: 'red' }}></p>
    </div>
  );
};


const SignupProvider = (props) => {
  const { googleSignup } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [googleResponse, setGoogleResponse] = useState(null);
  useEffect(() => {
    window.handleToken = (response) => {
      // acts like the sign up then forward request to sever to save into the db
      // but instead we'd render a component that'd ask for the user phone number
      // then send the response to the server and await the server response
      // if successfuly then we handle the rest by setting AUth and rest

      // render phone number component
      setGoogleResponse(response);
      setModalVisible(true);
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);

  const handlePhoneSubmit = () => {
    if (!phoneNumber) {
      document.querySelector('.phoneNumberError').innerHTML = 'Please enter a valid phone number!'
      return;
    }

    // Combine Google response with phone number and invoke googleSignup
    const signupData = { ...googleResponse, phoneNumber };
    googleSignup(signupData);

    // Close modal
    setModalVisible(false);
  };

  return (
    <div className='signup-provider'>
      <div
        id='g_id_onload'
        data-client_id='1068865622807-ltrik6mlcj32tncv303v950r8jmrt3ct.apps.googleusercontent.com'
	      // data-login_uri={`${API_URL}/auth/register`}
        data-callback='handleToken'
      />
      <div
        className='g_id_signin'
        data-type='standard'
        data-theme='outline'
        data-text='signup_with'
        data-shape='pill'
        data-size='large'
        data-logo_alignment='left'
      />


      {/* Modal for phone number */}
      <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)}>
        <ModalBody>
          <PhoneNumberInput onPhoneChange={setPhoneNumber} val={phoneNumber} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePhoneSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SignupProvider;
