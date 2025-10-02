/**
 *
 * UserRole
 *
 */

import React from 'react';

import { ROLES } from '../../../constants';
import Badge from '../../Common/Badge';

const UserRole = props => {
  const { className = '', user } = props;

  return (
    <>
      {user.role === ROLES.Admin ? (
        <Badge variant='primary' className={className}>
          Admin
        </Badge>
      ) : user.role === ROLES.Merchant ? (
        <Badge variant='dark' className={className}>
          Merchant
        </Badge>
      ) : (
        <Badge variant='dark' className={className}>
          User
      </Badge>
      )}
    </>
  );
};

export default UserRole;
