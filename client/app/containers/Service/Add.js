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
    this.props.fetchServicesSelect();
  }

  render() {
    const {
      serviceFormData,
      formErrors,
      serviceChange,
      addService,
      servicesSelect,
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
          servicesSelect={servicesSelect}
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
    servicesSelect: state.services.servicesSelect,
    isLoading: state.service.isLoading
  };
};

export default connect(mapStateToProps, actions)(Add);