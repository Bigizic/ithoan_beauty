/*
 *
 * Campaign actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_ALL_CAMPAIGNS,
  FETCH_CAMPAIGN,
  CREATE_CAMPAIGN,
  RESET_CAMPAIGNS,
  SET_CAMPAIGN_LOADING,
  REMOVE_CAMPAIGN,
  SET_CAMPAIGN_FORM_ERRORS,
  ADD_CAMPAIGNS,
  CAMPAIGN_CHANGE,
  FETCH_MAILING_LIST_DETAILS,
  FETCH_SUBSCRIBERS,
} from './constants';

import { API_URL, ROLES } from '../../constants';
import handleError from '../../utils/error';
// import { formatSelectOptions, unformatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';


export const resetCampaigns = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_CAMPAIGNS });
  };
};


export const fetchMailingListDetails = () => {
  return async (dispatch) => {
    dispatch(setCampaingLoading(true));
    try {
      const mailingList = await axios.get(`${API_URL}/newsletter/mailing_list_details`)

      if (mailingList.status === 200) {
        return dispatch({
          type: FETCH_MAILING_LIST_DETAILS,
          payload: mailingList.data.data
        })
      }
    } catch (error) {
      handleError(dispatch, error)
    } finally {
      dispatch(setCampaingLoading(false));
    }
  }
}

export const fetchSubscribers = () => {
  return async (dispatch) => {
    dispatch(setCampaingLoading(true));
    try {
      const response = await axios.get(`${API_URL}/newsletter/subscribers`);

      if (response.status === 200) {
        dispatch({
          type: FETCH_SUBSCRIBERS,
          payload: response.data.subscribers
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setCampaingLoading(false));
    }
  };
}

export const setCampaingLoading = value => {
  return {
    type: SET_CAMPAIGN_LOADING,
    payload: value
  };
};

export const campaignChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: CAMPAIGN_CHANGE,
    payload: formData
  };
}

export const fetchCampaigns = () => {
  return async (dispatch, getState) => {
    try {
      const campaigns = await axios.get(`${API_URL}/newsletter/`);
      if (campaigns.data.success) {
        dispatch({
          type: FETCH_ALL_CAMPAIGNS,
          payload: campaigns.data.campaigns
        })
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  }
}

export const fetchCampaign = (id) => {
  return async (dispatch, getState) => {
    try {
      const campaign = await axios.get(`${API_URL}/newsletter/${id}`);

      if (campaign.data.success) {
        dispatch({
          type: FETCH_CAMPAIGN,
          payload: campaign.data.campaign
        })
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const sendCampaign = (campaignId, userSelected, newsletterSelected, specificEmails = []) => {
  return async (dispatch, getState) => {
    dispatch(setCampaingLoading(true))
    try {
      const response = await axios.post(`${API_URL}/newsletter/send`, {
        campaignId,
        newsletterSelected,
        userSelected,
        specificEmails
      });

      const { data } = response;
      const successfulOptions = {
        title: data.message,
        position: 'tr',
        autoDismiss: 1
      };

      if (data.success) {
        dispatch(success(successfulOptions));
      }

      dispatch(resetCampaigns());
      dispatch(goBack());
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setCampaingLoading(false))
    }
  };
};

export const deleteCampaign = (id) => {
  return async (dispatch, getState) => {
    dispatch(setCampaingLoading(true))
    try {
      const response = await axios.delete(`${API_URL}/newsletter/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_CAMPAIGN,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setCampaingLoading(false))
    }
  };
}


// add product api
export const addCampaign = () => {
  return async (dispatch, getState) => {
    dispatch(setCampaingLoading(true))
    try {
      const rules = {
        // heading: 'required',
        subHeading: 'required|max:50000',
        // isBestSellingSelected: 'required',
      };

      const campaign = getState().campaign.campaignFormData;

      let newCampaign = {
        heading: campaign.heading,
        subHeading: campaign.subHeading,
        footer: campaign.footer,
        links: campaign.links,
        image: campaign.image,
        isBestSellingSelected: campaign.isBestSellingSelected,
        isDiscountedSelected: campaign.isDiscountedSelected,
        isNewArrivalsSelected: campaign.isNewArrivalsSelected,
      };



      const { isValid, errors } = allFieldsValidation(newCampaign, rules, {
        'required.heading': 'Heading is required.',
        'required.subHeading': 'Sub Heading  is required.',
        'max.subHeading':
          'Sub Heading may not be greater than 50000 characters.',
        'required.isBestSellingSelected': 'You have to include best selling products in your campaign email.',
      });

      if (!isValid) {
        return dispatch({ type: SET_CAMPAIGN_FORM_ERRORS, payload: errors });
      }
      const BSS = newCampaign.isBestSellingSelected.value
      const DS = newCampaign.isDiscountedSelected.value
      const NAS = newCampaign.isNewArrivalsSelected.value
      const FOO = newCampaign.footer.value
      const LIN = newCampaign.links && newCampaign.links.value

      newCampaign.isBestSellingSelected = BSS === 1 ? true : false
      newCampaign.isDiscountedSelected = DS === 1 ? true : false
      newCampaign.isNewArrivalsSelected = NAS === 1 ? true : false
      newCampaign.footer = FOO === 1 ? true : false
      newCampaign.links = LIN === 1 ? true : false


      const formData = new FormData();
      if (newCampaign.image) {
        for (const key in newCampaign) {
          if (newCampaign.hasOwnProperty(key)) {
            if (key === 'brand' && newCampaign[key] === null) {
              continue;
            } else {
              formData.set(key, newCampaign[key]);
            }
          }
        }
      }
      const response = await axios.post(`${API_URL}/newsletter/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_CAMPAIGNS,
          payload: response.data.campaign,
        });
        dispatch(resetCampaigns());
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setCampaingLoading(false))
    }
  };
};
