/**
 *
 * AddProduct
 *
 */

import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import { campaignTemplate } from './template';

import 'react-quill/dist/quill.snow.css';

/**
 *
 * @param {*} props
 */
const ShowCampaignTemplate = (props) => {
  const { campaign } = props;
  const templateContent = campaignTemplate(campaign);

  return (
    <iframe
      title="Campaign Template Preview"
      style={{
        width: '100%',
        height: '500px',
        border: 'none'
      }}
      srcDoc={templateContent}
    />
  );
};

const CampaignPreview = (props) => {
  const {
    user,
    campaign,
    deleteCampaign,
    sendCampaign
  } = props;

  const [userSelected, setUserSelected] = useState(false);
  const [newsletterSelected, setNewsletterSelected] = useState(false);

  const handleSubmit = (id, userSelected, newsletterSelected) => {
    sendCampaign(id, { userSelected }, { newsletterSelected });
  };

  const handleUserSelection = (event) => {
    setUserSelected(event.target.checked);
  };

  const handleNewsletterSelection = (event) => {
    setNewsletterSelected(event.target.checked);
  };

  return (
    <div className="preview-campaign">
      <ShowCampaignTemplate campaign={campaign} />

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', margin: '25px 0px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label htmlFor="send_to_users">Send to users</label>
          <input
            id="send_to_users"
            className="input-checkbox"
            type="checkbox"
            checked={userSelected}
            onChange={handleUserSelection}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <label htmlFor="send_to_newsletter">Send to newsletter subscribers</label>
          <input
            id="send_to_newsletter"
            className="input-checkbox"
            type="checkbox"
            checked={newsletterSelected}
            onChange={handleNewsletterSelection}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <Button
            text="Send"
            onClick={() => handleSubmit(campaign._id, userSelected, newsletterSelected)}
          />
        </div>

        <div>
          <Button
            variant="danger"
            text="Delete Campaign"
            onClick={() => deleteCampaign(campaign._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
