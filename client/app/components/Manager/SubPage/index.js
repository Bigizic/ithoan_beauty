/**
 *
 * SubPage
 *
 */

import React from 'react';

import Button from '../../Common/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@/components/Common/Icon';

const SubPage = props => {
  let {
    title, actionTitle,
    handleAction = -1, children,
    icon = '',
  } = props;
  const navigate = useNavigate();

  return (
    <div className='sub-page'>
      <div className='subpage-header'>
        <h3 className='mb-0 text-3xl'>{title}</h3>
        {actionTitle && (
          <div className='action'>
            <Button
              variant='none'
              icon={icon}
              size='sm'
              text={actionTitle}
              onClick={() => navigate(handleAction)}
            />
          </div>
        )}
      </div>
      <div className='subpage-body'>{children}</div>
    </div>
  );
};

export default SubPage;
