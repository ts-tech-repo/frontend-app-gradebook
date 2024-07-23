import { React, useState, useEffect } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';

import { instructorDashboardUrl, getTracksUrl } from 'data/services/lms/urls';
import useGradebookHeaderData from './hooks';
import messages from './messages';

export const GradebookHeader = () => {
  const { formatMessage } = useIntl();
  const [courseName, setCourseName] = useState('');  
  const {
    areGradesFrozen,
    canUserViewGradebook,
    courseId,
    handleToggleViewClick,
    showBulkManagement,
    toggleViewMessage,
  } = useGradebookHeaderData();
  
  useEffect(() => {
    fetch(getTracksUrl())
      .then(response => response.json())
      .then(data => setCourseName(data.course_name))
      .catch(error => console.log('Fetch error:', error));
  }, [courseId]);  

  const dashboardUrl = instructorDashboardUrl();
  return (
    <div className="gradebook-header">
      <a href={dashboardUrl} className="mb-3">
        <span aria-hidden="true">{'<< '}</span>
        {formatMessage(messages.backToDashboard)}
      </a>
      <h1>{formatMessage(messages.gradebook)}</h1>
      <div className="subtitle-row d-flex justify-content-between align-items-center">
        <h2 className="text-break">{courseName}</h2>
        {showBulkManagement && (
          <Button variant="tertiary" onClick={handleToggleViewClick}>
            {formatMessage(toggleViewMessage)}
          </Button>
        )}
      </div>
      {areGradesFrozen && (
        <div className="alert alert-warning" role="alert">
          {formatMessage(messages.frozenWarning)}
        </div>
      )}
      {(canUserViewGradebook === false) && (
        <div className="alert alert-warning" role="alert">
          {formatMessage(messages.unauthorizedWarning)}
        </div>
      )}
    </div>
  );
};

export default GradebookHeader;
