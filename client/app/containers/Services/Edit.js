/*
 *
 * Edit Services
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import EditServices from '../../components/Manager/EditServices';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { withRouter } from '@/withRouter';

class Edit extends React.PureComponent {
  componentDidMount() {
    this.props.resetServices();
    const servicesId = this.props.match.params.id;
    this.props.fetchServicesItem(servicesId);
    this.props.fetchServices();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetServices();
      const servicesId = this.props.match.params.id;
      this.props.fetchServicesItem(servicesId);
    }
  }

  render() {
    const {
      servicesItem,
      formErrors,
      servicesEditChange,
      updateServices,
      deleteServices,
      services,
      isLoading
    } = this.props;

    return (
      <SubPage
        title='Edit Services'
        actionTitle='Cancel'
      >
        {servicesItem?._id ? (
          <EditServices
            servicesItem={servicesItem}
            formErrors={formErrors}
            servicesChange={servicesEditChange}
            updateServices={updateServices}
            deleteServices={deleteServices}
            services={services}
            isLoading={isLoading}
          />
        ) : (
          <NotFound message='No services found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    servicesItem: state.services.servicesItem,
    formErrors: state.services.editFormErrors,
    services: state.service.services,
    isLoading: state.services.isLoading
  };
};

export default connect(mapStateToProps, actions)(withRouter(Edit));