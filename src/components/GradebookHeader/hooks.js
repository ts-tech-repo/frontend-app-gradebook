import { views } from 'data/constants/app';
import { actions, selectors } from 'data/redux/hooks';

import messages from './messages';

export const useGradebookHeaderData = () => {
  const activeView = selectors.app.useActiveView();
  const courseId = selectors.app.useCourseId();
  const courseId = selectors.app.useCourseName();
  const areGradesFrozen = selectors.assignmentTypes.useAreGradesFrozen();
  const canUserViewGradebook = selectors.roles.useCanUserViewGradebook();
  const showBulkManagement = selectors.root.useShowBulkManagement();
  const setView = actions.app.useSetView();

  const handleToggleViewClick = () => setView(
    activeView === views.grades
      ? views.bulkManagementHistory
      : views.grades,
  );

  const toggleViewMessage = activeView === views.grades
    ? messages.toActivityLog
    : messages.toGradesView;

  return {
    areGradesFrozen,
    canUserViewGradebook,
    courseId,
    courseName,
    showBulkManagement,

    handleToggleViewClick,
    toggleViewMessage,
  };
};

export default useGradebookHeaderData;
