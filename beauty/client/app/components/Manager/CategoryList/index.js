/**
 *
 * categorylist
 *
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const CategoryList = (props) => {
  const navigate = useNavigate();
  const { categories } = props;

  return (
    <div className="c-list overflow-x-scroll">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>description</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category?._id || index} className='cursor-pointer' onClick={() => navigate(`/dashboard/category/edit/${category._id}`)}>
              <td>{index + 1}</td>
              <td>{category?.name}</td>
              <td>
                <DescriptionComponent content={category?.description} />
              </td>
              <td>
                <Link
                  to={`/dashboard/category/edit/${category._id}`}
                  className="btn btn-sm btn-secondary"
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
