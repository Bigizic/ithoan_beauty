/**
 *
 * ServiceList
 *
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ServiceList = (props) => {
  const navigate = useNavigate();
  const { services } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return services;
    }

    const query = searchQuery.toLowerCase();
    return services.filter(service => {
      const name = service?.name?.toLowerCase() || '';
      const description = service?.description?.toLowerCase() || '';
      const price = service?.price?.toString() || '';

      return name.includes(query) || description.includes(query) || price.includes(query);
    });
  }, [services, searchQuery]);

  return (
    <div className="service-list overflow-x-scroll">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <p className='text-lg' style={{ margin: 0 }}>
          {filteredServices.length} Service{filteredServices.length !== 1 ? 's' : ''}
        </p>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search services by name, description, or price..."
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
      {filteredServices.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration (min)</th>
              <th>Discount (%)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service, index) => (
              <tr key={service?._id || index} className='cursor-pointer' onClick={() => navigate(`/dashboard/service/edit/${service._id}`)}>
                <td>{service?.name}</td>
                <td>
                  <p style={{ height: '50px', overflowY: 'hidden' }}>
                    <DescriptionComponent content={service?.description} />
                  </p>
                </td>
                <td>₦{service?.price?.toLocaleString()}</td>
                <td>{service?.duration}</td>
                <td>{service?.discount || 0}%</td>
                <td>
                  <span className={`badge ${service?.isActive ? 'badge-success' : 'badge-secondary'}`}>
                    {service?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/dashboard/service/edit/${service._id}`}
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

export default ServiceList;