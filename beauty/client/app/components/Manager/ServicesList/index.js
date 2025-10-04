/**
 *
 * ServicesList
 *
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ServicesList = (props) => {
  const navigate = useNavigate();
  const { servicesList } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServicesList = useMemo(() => {
    if (!searchQuery.trim()) {
      return servicesList;
    }

    const query = searchQuery.toLowerCase();
    return servicesList.filter(services => {
      const name = services?.name?.toLowerCase() || '';
      const title = services?.title?.toLowerCase() || '';
      const description = services?.description?.toLowerCase() || '';

      return name.includes(query) || title.includes(query) || description.includes(query);
    });
  }, [servicesList, searchQuery]);

  return (
    <div className="services-list overflow-x-scroll">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <p className='text-lg' style={{ margin: 0 }}>
          {filteredServicesList.length} Services
        </p>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search services by name, title, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
      {filteredServicesList.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Services Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServicesList.map((services, index) => (
              <tr key={services?._id || index} className='cursor-pointer' onClick={() => navigate(`/dashboard/services/edit/${services._id}`)}>
                <td>{services?.name}</td>
                <td>{services?.title}</td>
                <td>
                  <p style={{ height: '50px', overflowY: 'hidden' }}>
                    <DescriptionComponent content={services?.description} />
                  </p>
                </td>
                <td>{services?.serviceArray?.length || 0}</td>
                <td>
                  <span className={`badge ${services?.isActive ? 'badge-success' : 'badge-secondary'}`}>
                    {services?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/dashboard/services/edit/${services._id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
          No services found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default ServicesList;