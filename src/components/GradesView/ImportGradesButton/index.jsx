/* eslint-disable react/button-has-type, import/no-named-as-default */
import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { Form } from '@edx/paragon';

import NetworkButton from 'components/NetworkButton';
import messages from './messages';
import useImportGradesButtonData from './hooks';
import { AppContext } from '@edx/frontend-platform/react';


/**
 * <ImportGradesButton />
 * File-type input wrapped with hidden control such that when a valid file is
 * added, it is automattically uploaded.
 */
export const ImportGradesButton = () => {
  const {
    fileInputRef,
    gradeExportUrl,
    handleClickImportGrades,
    handleFileInputChange,
  } = useImportGradesButtonData();
  const { formatMessage } = useIntl();
  const { authenticatedUser } = React.useContext(AppContext);

  return (
    <>
      <Form action={gradeExportUrl} method="post">
        <Form.Group controlId="csv">
          <Form.Control
            data-testid="file-control"
            className="d-none"
            type="file"
            label={formatMessage(messages.csvUploadLabel)}
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </Form.Group>
      </Form>
      {authenticatedUser.email.includes('@talentsprint.com') && (
      <NetworkButton
        className="import-grades-btn"
        label={messages.importGradesBtnText}
        onClick={handleClickImportGrades}
        import
      />
      )}
    </>
  );
};
ImportGradesButton.propTypes = {};

export default ImportGradesButton;
