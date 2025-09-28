/*
 *
 * Add Service
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import AddService from '../../components/Manager/AddService';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    // No need to fetch services select for individual service creation
  }

  render() {
    const {
      serviceFormData,
      formErrors,
      serviceChange,
      addService,
      isLoading
    } = this.props;

    return (
      <SubPage
        title='Add Service'
        actionTitle='Cancel'
      >
        <AddService
          serviceFormData={serviceFormData}
          formErrors={formErrors}
          serviceChange={serviceChange}
          addService={addService}
          isLoading={isLoading}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    serviceFormData: state.service.serviceFormData,
    formErrors: state.service.formErrors,
    isLoading: state.service.isLoading
  };
};

export default connect(mapStateToProps, actions)(Add);