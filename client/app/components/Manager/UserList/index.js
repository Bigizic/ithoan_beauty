/**
 *
 * userlist
 *
 */

import React from 'react';
import { formatDate } from '../../../utils/date';
import UserRole from '../UserRole';

const UserList = (props) => {
  const { users } = props;

  return (
    <div className="u-list overflow-scroll mt-3">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>provider</th>
            <th>account created</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user?._id || index}>
              <td>{index + 1}</td>
              <td>{user?.firstName ? `${user?.firstName} ${user?.lastName}` : 'n/a'}</td>
              <td>{user?.email ?? '-'}</td>
              <td>{user?.provider ?? '-'}</td>
              <td>{formatDate(user?.created)}</td>
              <td>
                <UserRole user={user} className="d-inline-block user_list_custom" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
