/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';
import LoadingIndicator from '../../Common/LoadingIndicator';

const CampaignList = props => {
  const { campaigns, data, users, isLoading } = props;
  const successFulCampaign = campaigns.filter((camp) => {
    return camp.sent === true
  })
  const campaignsLength = campaigns.length;

  return (
    <div className='p-list'>
      {isLoading && <LoadingIndicator />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '5em' }}>
        <p style={{ fontSize: '24px', fontWeight: '700' }}>Showing Skincare data</p>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{campaignsLength}</p>
            <p>Campaign created</p>
          </div>
          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{successFulCampaign.length}</p>
            <p>Campaign Sent</p>
          </div>
          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{users.length}</p>
            <p>Total Users</p>
          </div>

          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{data.opens}</p>
            <p>Email Opens </p>
          </div>

          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{data.members}</p>
            <p>Newsletter Members </p>
          </div>

          <div style={{ textAlign: 'left', background: 'lightgreen', padding: '10px 10px 0px 10px', borderRadius: '5px' }}>
            <p style={{ fontWeight: '900' }}>{data.subscribed}</p>
            <p>Newsletter Subscribers </p>
          </div>


        </div>
      </div>
      {campaigns.map((campaign, index) => (
        <Link
          to={`/dashboard/campaigns/preview/${campaign._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          <img
            className='item-image'
            src={`${campaign && campaign.imageUrl
              ? campaign.imageUrl
              : '/images/placeholder-image.png'
              }`}
          />
          <div style={{ maxHeight: '100px', marginLeft: '10px', overflow: 'hidden' }} className='d-flex flex-column px-3'>
            <div className='flex flex-row justify-between'>
              <h4 className='' style={{ fontWeight: '600', fontSize: '18px' }}>{campaign.heading}</h4>
              <p style={{ fontWeight: '600' }}>{campaign.type}</p>
            </div>
            <div className='mb-2'><DescriptionComponent content={campaign.sub_heading} /></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CampaignList;
