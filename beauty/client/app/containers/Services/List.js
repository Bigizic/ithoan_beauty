/*
 *
 * Services List
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ServicesList from '../../components/Manager/ServicesList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchServicesList();
  }

  render() {
    const { servicesList, isLoading } = this.props;

    return (
      <>
        <SubPage
          title='Services'
          actionTitle='Add'
          handleAction={'/dashboard/services/add'}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : servicesList.length > 0 ? (
            <ServicesList servicesList={servicesList} />
          ) : (
            <NotFound message='No services groups found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    servicesList: state.services.servicesList,
    isLoading: state.services.isLoading
  };
};

export default connect(mapStateToProps, actions)(List);