/*
 *
 * Service List
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ServiceList from '../../components/Manager/ServiceList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAllService();
  }

  render() {
    const { services, isLoading } = this.props;
    return (
      <>
        <SubPage
          title='Service'
          actionTitle='Add'
          handleAction={'/dashboard/service/add'}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : services.length > 0 ? (
            <ServiceList services={services} />
          ) : (
            <NotFound message='No service found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    services: state.service.all_service,
    isLoading: state.service.isLoading
  };
};

export default connect(mapStateToProps, actions)(List);