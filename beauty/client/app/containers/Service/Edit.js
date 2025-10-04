/*
 *
 * Edit Service
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import EditService from '../../components/Manager/EditService';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { withRouter } from '@/withRouter';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetService();
    const serviceId = this.props.match.params.id;
    this.props.fetchAService(serviceId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetService();
      const serviceId = this.props.match.params.id;
      this.props.fetchAService(serviceId);
    }
  }

  render() {
    const {
      service,
      formErrors,
      serviceEditChange,
      updateService,
      deleteService,
      servicesSelect,
      isLoading
    } = this.props;

    return (
      <SubPage
        title='Edit Service'
        actionTitle='Cancel'
      >
        {service?._id ? (
          <EditService
            service={service}
            formErrors={formErrors}
            serviceChange={serviceEditChange}
            updateService={updateService}
            deleteService={deleteService}
            isLoading={isLoading}
          />
        ) : (
          <NotFound message='No service found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    service: state.service.service,
    formErrors: state.service.editFormErrors,
    isLoading: state.service.isLoading
  };
};

export default connect(mapStateToProps, actions)(withRouter(Edit));