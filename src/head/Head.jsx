import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import messages from './messages';

const Head = () => {
  const { formatMessage } = useIntl();
  useEffect(() => {
    let courseIDs = [
      "course-v1:TalentSprint+BCDM+2024",
      "course-v1:TalentSprint+MLOP+2024",
      "course-v1:TalentSprint+AOSCF+2024",
      "course-v1:TalentSprint+AOSCDC1+2024",
      "course-v1:TalentSprint+AIMLOPS1+2024",
      "course-v1:QUINCE+TestingAnalyticsloadissue+C01",
    ];

    const tag = document.querySelector(".logo");
    let logoImage;
    if (tag.tagName === "IMG") {
      logoImage = document.querySelector(".logo");
    } else {
      logoImage = tag.querySelector("img");
    }

    courseIDs.map((item) => {
      if (window.location.pathname.includes(item)) {
        logoImage.src =
          "https://static.talentsprint.com/lms_maple/images/iiith_logo.png";
      }
    });
  }, [])
  return (
    <Helmet>
      <title>
        {formatMessage(messages['gradebook.page.title'], { siteName: getConfig().SITE_NAME })}
      </title>
      <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
    </Helmet>
  );
};

Head.propTypes = {
};

export default Head;
