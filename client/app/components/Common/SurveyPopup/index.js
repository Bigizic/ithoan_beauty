import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants';
import './style.css';

const surveyOptions = [
  'Instagram',
  'Facebook',
  'Twitter',
  'TikTok',
  'Google Search',
  'Friend or Family',
  'Blog or Article',
  'Advertisement',
  'Other'
];

const SurveyPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [customSource, setCustomSource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storageKey = 'survey_popup_closed';
    const hasCompletedSurvey = localStorage.getItem('survey_completed');
    const lastClosedTime = localStorage.getItem(storageKey);

    if (hasCompletedSurvey) {
      return;
    }

    if (lastClosedTime) {
      const timePassed = Date.now() - parseInt(lastClosedTime);
      const durationInMs = 5 * 60 * 1000;

      if (timePassed < durationInMs) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    const storageKey = 'survey_popup_closed';
    localStorage.setItem(storageKey, Date.now().toString());
    setIsVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const source = selectedOption === 'Other' ? customSource : selectedOption;

    if (!source.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/survey/submit`, { source });
      localStorage.setItem('survey_completed', 'true');
      setIsVisible(false);
    } catch (error) {
      console.error('Survey submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="survey-popup-overlay">
      <div className="survey-popup-container">
        <button
          className="survey-popup-close"
          onClick={handleClose}
          aria-label="Close survey"
        >
          ×
        </button>
        <div className="survey-popup-content">
          <div className="survey-popup-header">
            <h2>Help Us Serve You Better</h2>
            <p>How did you hear about us?</p>
          </div>
          <form onSubmit={handleSubmit} className="survey-popup-form">
            <div className="survey-options">
              {surveyOptions.map((option) => (
                <label key={option} className="survey-option">
                  <input
                    type="radio"
                    name="source"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className="survey-option-label">{option}</span>
                </label>
              ))}
            </div>

            {selectedOption === 'Other' && (
              <div className="survey-custom-input">
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={customSource}
                  onChange={(e) => setCustomSource(e.target.value)}
                  className="survey-text-input"
                  autoFocus
                />
              </div>
            )}

            <div className="survey-popup-actions">
              <button
                type="button"
                onClick={handleClose}
                className="survey-button-secondary"
              >
                Skip
              </button>
              <button
                type="submit"
                className="survey-button-primary"
                disabled={!selectedOption || (selectedOption === 'Other' && !customSource.trim()) || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyPopup;
