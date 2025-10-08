/**
 *
 * AddProduct
 *
 */

import React, { useState, useEffect } from 'react';
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
    sendCampaign,
    subscribers,
    fetchSubscribers
  } = props;

  const [sendAllUsers, setSendAllUsers] = useState(false);
  const [sendAllSubscribers, setSendAllSubscribers] = useState(false);
  const [sendSpecificEmails, setSendSpecificEmails] = useState(false);
  const [emailList, setEmailList] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (sendSpecificEmails) {
      fetchSubscribers();
    }
  }, [sendSpecificEmails]);

  const handleSubmit = (id) => {
    const manualEmails = emailList.split(',').map(email => email.trim()).filter(email => email);
    const subscriberEmails = selectedSubscribers.map(sub => sub.email);
    const allSpecificEmails = [...new Set([...manualEmails, ...subscriberEmails])];

    const payload = {
      userSelected: sendAllUsers,
      newsletterSelected: sendAllSubscribers,
      specificEmails: sendSpecificEmails ? allSpecificEmails : []
    };
    sendCampaign(id, { userSelected: payload.userSelected }, { newsletterSelected: payload.newsletterSelected }, payload.specificEmails);
  };

  const handleAllUsersChange = (event) => {
    setSendAllUsers(event.target.checked);
  };

  const handleAllSubscribersChange = (event) => {
    setSendAllSubscribers(event.target.checked);
  };

  const handleSpecificEmailsChange = (event) => {
    setSendSpecificEmails(event.target.checked);
  };

  const handleEmailListChange = (event) => {
    setEmailList(event.target.value);
  };

  const handleSubscriberSelect = (subscriber) => {
    const isSelected = selectedSubscribers.some(s => s._id === subscriber._id);
    if (isSelected) {
      setSelectedSubscribers(selectedSubscribers.filter(s => s._id !== subscriber._id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, subscriber]);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sub.email.toLowerCase().includes(searchLower) ||
      (sub.name && sub.name.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="preview-campaign">
      <ShowCampaignTemplate campaign={campaign} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '25px 0px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            id="send_to_all_users"
            className="input-checkbox"
            type="checkbox"
            checked={sendAllUsers}
            onChange={handleAllUsersChange}
          />
          <label htmlFor="send_to_all_users">Send to all registered users</label>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            id="send_to_all_subscribers"
            className="input-checkbox"
            type="checkbox"
            checked={sendAllSubscribers}
            onChange={handleAllSubscribersChange}
          />
          <label htmlFor="send_to_all_subscribers">Send to all newsletter subscribers</label>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              id="send_to_specific"
              className="input-checkbox"
              type="checkbox"
              checked={sendSpecificEmails}
              onChange={handleSpecificEmailsChange}
            />
            <label htmlFor="send_to_specific">Send to specific email addresses</label>
          </div>

          {sendSpecificEmails && (
            <div style={{ width: '100%', marginLeft: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Select from Subscribers</h4>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredSubscribers.length > 0 ? (
                  <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                          <th style={{ padding: '8px', textAlign: 'left', width: '40px' }}></th>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                          <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubscribers.map((subscriber) => (
                          <tr key={subscriber._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px' }}>
                              <input
                                type="checkbox"
                                checked={selectedSubscribers.some(s => s._id === subscriber._id)}
                                onChange={() => handleSubscriberSelect(subscriber)}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>{subscriber.name || '-'}</td>
                            <td style={{ padding: '8px' }}>{subscriber.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: '#666', padding: '10px' }}>No subscribers found</p>
                )}
                {selectedSubscribers.length > 0 && (
                  <small style={{ color: '#666', display: 'block', marginTop: '10px' }}>
                    {selectedSubscribers.length} subscriber(s) selected
                  </small>
                )}
              </div>

              <div>
                <h4 style={{ marginBottom: '10px' }}>Or Enter Email Addresses Manually</h4>
                <textarea
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Enter email addresses separated by commas (e.g., email1@example.com, email2@example.com)"
                  value={emailList}
                  onChange={handleEmailListChange}
                />
                <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                  Separate multiple email addresses with commas
                </small>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <Button
            text="Send Campaign"
            onClick={() => handleSubmit(campaign._id)}
            disabled={!sendAllUsers && !sendAllSubscribers && !sendSpecificEmails}
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
