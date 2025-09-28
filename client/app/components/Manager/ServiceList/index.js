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
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
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
              <td>{index + 1}</td>
              <td>{service?.name}</td>
              <td>
                <DescriptionComponent content={service?.description} />
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