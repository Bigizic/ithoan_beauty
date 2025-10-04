/*
 *
 * Add Services
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import AddServices from '../../components/Manager/AddServices';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    this.props.fetchServicesForSelect();
  }

  render() {
    const {
      servicesFormData,
      formErrors,
      servicesChange,
      addServices,
      services,
      isLoading
    } = this.props;

    return (
      <SubPage
        title='Add Services'
        actionTitle='Cancel'
      >
        <AddServices
          servicesFormData={servicesFormData}
          formErrors={formErrors}
          servicesChange={servicesChange}
          addServices={addServices}
          services={services}
          isLoading={isLoading}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    servicesFormData: state.services.servicesFormData,
    formErrors: state.services.formErrors,
    services: state.services.servicesSelect,
    isLoading: state.services.isLoading
  };
};

export default connect(mapStateToProps, actions)(Add);