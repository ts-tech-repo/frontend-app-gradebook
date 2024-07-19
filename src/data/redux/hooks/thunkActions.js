import { StrictDict } from 'utils';
import thunkActions from 'data/thunkActions';
import { actionHook } from './utils';
import { getConfig } from '@edx/frontend-platform';

export const initializeApp = (courseId, urlQuery) => async (dispatch) => {
  try {
    const response = await fetch(`${getConfig().LMS_BASE_URL}/api/courses/v1/courses/${courseId}/`);
    if (!response.ok) {
      console.log(`Failed to fetch course data: ${response.statusText}`);
    }
    const courseData = await response.json();
    const courseName = courseData.name;

    dispatch({ type: 'INITIALIZE_APP', payload: { courseId, courseName, urlQuery } });
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

const app = StrictDict({
  filterMenu: {
    useCloseMenu: actionHook(thunkActions.app.filterMenu.close),
    useHandleTransitionEnd: actionHook(thunkActions.app.filterMenu.handleTransitionEnd),
    useToggleMenu: actionHook(thunkActions.app.filterMenu.toggle),
  },
  useSetModalStateFromTable: actionHook(thunkActions.app.setModalStateFromTable),
  initializeApp,
});

const grades = StrictDict({
  useFetchGradesIfAssignmentGradeFiltersSet: actionHook(
    thunkActions.grades.fetchGradesIfAssignmentGradeFiltersSet,
  ),
  useFetchPrevNextGrades: actionHook(thunkActions.grades.fetchPrevNextGrades),
  useFetchGrades: actionHook(thunkActions.grades.fetchGrades),
  useSubmitImportGradesButtonData: actionHook(thunkActions.grades.submitImportGradesButtonData),
  useUpdateGrades: actionHook(thunkActions.grades.updateGrades),
});

export default StrictDict({
  app,
  grades,
});
