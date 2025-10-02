/**
 *
 * ServiceList
 *
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ServiceList = (props) => {
  const navigate = useNavigate();
  const { services } = props;

  return (
    <div className="service-list overflow-x-scroll">
      <p className='text-lg'>{services.length} Service</p>
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
          {services.map((service, index) => (
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
    </div>
  );
};

export default ServiceList;