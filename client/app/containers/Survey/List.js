import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    const { surveys, stats, isLoading, totalCount } = this.props;
    const beautySurveys = surveys.filter(i => i.type === 'beauty');
    const skincareSurveys = surveys.filter(i => i.type === 'skincare' || !i.type);

    return (
      <SubPage title='Survey Responses' actionTitle=''>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : (
          <>
            {stats && stats.length > 0 && (
              <div className='survey-stats mb-4'>
                <h3>Survey Statistics</h3>
                <div className='stats-grid' style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='stat-card'
                      style={{
                        padding: '16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        background: '#fafafa'
                      }}
                    >
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                        {stat._id}
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
                        {stat.count}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '12px',
                  background: '#f0f0f0',
                  borderRadius: '6px',
                  marginBottom: '24px'
                }}>
                  <strong>Total Responses:</strong> {totalCount}
                </div>
              </div>
            )}

            {beautySurveys.length > 0 && (
              <div className='survey-section mb-8'>
                <h3 className='text-xl font-semibold mb-4' style={{ color: '#e91e63', fontSize: '20px', marginBottom: '16px' }}>
                  Beauty Surveys ({beautySurveys.length})
                </h3>
                <div className='survey-table'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Date Submitted</th>
                        <th>IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beautySurveys.map((survey) => (
                        <tr key={survey._id}>
                          <td>{survey.source}</td>
                          <td>{new Date(survey.created).toLocaleString()}</td>
                          <td style={{ fontSize: '12px', color: '#666' }}>
                            {survey.ipAddress || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {skincareSurveys.length > 0 && (
              <div className='survey-section mb-8'>
                <h3 className='text-xl font-semibold mb-4' style={{ color: '#4caf50', fontSize: '20px', marginBottom: '16px' }}>
                  Skincare Surveys ({skincareSurveys.length})
                </h3>
                <div className='survey-table'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Date Submitted</th>
                        <th>IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skincareSurveys.map((survey) => (
                        <tr key={survey._id}>
                          <td>{survey.source}</td>
                          <td>{new Date(survey.created).toLocaleString()}</td>
                          <td style={{ fontSize: '12px', color: '#666' }}>
                            {survey.ipAddress || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {surveys.length === 0 && (
              <NotFound message='No survey responses yet.' />
            )}
          </>
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveys: state.survey.surveys,
    stats: state.survey.stats,
    isLoading: state.survey.isLoading,
    totalCount: state.survey.totalCount
  };
};

export default connect(mapStateToProps, actions)(List);
