/**
 *
 * ServicesList
 *
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ServicesList = (props) => {
  const navigate = useNavigate();
  const { servicesList } = props;

  return (
    <div className="services-list overflow-x-scroll">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Services Count</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesList.map((services, index) => (
            <tr key={services?._id || index} className='cursor-pointer' onClick={() => navigate(`/dashboard/services/edit/${services._id}`)}>
              <td>{index + 1}</td>
              <td>{services?.name}</td>
              <td>{services?.title}</td>
              <td>
                <DescriptionComponent content={services?.description} />
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
    </div>
  );
};

export default ServicesList;