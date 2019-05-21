import {
  TRY_GET_COURSES_SUCCESS,
  TRY_GET_COURSES_FAILURE,
  TRY_GET_MY_COURSES_SUCCESS,
  TRY_GET_MY_COURSES_FAILURE,
  TRY_GET_COURSE_SUCCESS,
  TRY_GET_COURSE_FAILURE,
  TRY_DEACTIVATE_COURSE_SUCCESS,
  TRY_DEACTIVATE_COURSE_FAILURE,
  TRY_GET_ENROLLED_COURSES_SUCCESS,
  TRY_GET_ENROLLED_COURSES_FAILURE,
  TRY_CREATE_COURSE_SUCCESS,
  TRY_CREATE_COURSE_FAILURE,
  TRY_EDIT_COURSE_SUCCESS,
  TRY_EDIT_COURSE_FAILURE,
  TRY_GET_LESSONS_SUCCESS,
  TRY_GET_LESSONS_FAILURE,
  TRY_GET_LESSON_SUCCESS,
  TRY_GET_LESSON_FAILURE,
  TRY_DEACTIVATE_LESSON_SUCCESS,
  TRY_DEACTIVATE_LESSON_FAILURE,
  TRY_GET_CONTENTS_SUCCESS,
  TRY_GET_CONTENTS_FAILURE,
  TRY_EDIT_LESSON_SUCCESS,
  TRY_EDIT_LESSON_FAILURE,
  TRY_CREATE_CONTENT_SUCCESS,
  TRY_CREATE_CONTENT_FAILURE,
  TRY_GET_CONTENT_SUCCESS,
  TRY_GET_CONTENT_FAILURE,
  TRY_NEXT,
  TRY_PRE,
  PAYLOAD,
  TRY_GET_QUIZ_SUCCESS,
  TRY_CREATE_QUESTION_SUCCESS,
  TRY_GET_QUESTIONS_SUCCESS,
  TRY_GET_QUESTION_SUCCESS,
  TRY_CREATE_CHOICE_SUCCESS,
  TRY_GET_CHOICES_SUCCESS
} from "../actionTypes";

export const next = () => ({
  type: TRY_NEXT
});
export const pre = () => ({
  type: TRY_PRE
});
export const getPayload = responseData => ({
  type: PAYLOAD,
  payload: responseData
});
export const getCoursesSuccessful = responseData => ({
  type: TRY_GET_COURSES_SUCCESS,
  payload: responseData
});
export const getCoursesFailed = responseData => ({
  type: TRY_GET_COURSES_FAILURE,
  payload: responseData
});
export const getMyCoursesSuccessful = responseData => ({
  type: TRY_GET_MY_COURSES_SUCCESS,
  payload: responseData
});
export const getMyCoursesFailed = responseData => ({
  type: TRY_GET_MY_COURSES_FAILURE,
  payload: responseData
});
export const getCourseSuccessful = responseData => ({
  type: TRY_GET_COURSE_SUCCESS,
  payload: responseData
});
export const getCourseFailed = responseData => ({
  type: TRY_GET_COURSE_FAILURE,
  payload: responseData
});
export const deactivateCourseSuccessful = responseData => ({
  type: TRY_DEACTIVATE_COURSE_SUCCESS,
  payload: responseData
});
export const deactivateCourseFailed = responseData => ({
  type: TRY_DEACTIVATE_COURSE_FAILURE,
  payload: responseData
});
export const getEnrolledCoursesSuccessful = responseData => ({
  type: TRY_GET_ENROLLED_COURSES_SUCCESS,
  payload: responseData
});
export const getEnrolledCoursesFailed = responseData => ({
  type: TRY_GET_ENROLLED_COURSES_FAILURE,
  payload: responseData
});
export const createCourseSuccessful = responseData => ({
  type: TRY_CREATE_COURSE_SUCCESS,
  payload: responseData
});
export const createCourseFailed = responseData => ({
  type: TRY_CREATE_COURSE_FAILURE,
  payload: responseData
});
export const editCourseSuccessful = responseData => ({
  type: TRY_EDIT_COURSE_SUCCESS,
  payload: responseData
});
export const editCourseFailed = responseData => ({
  type: TRY_EDIT_COURSE_FAILURE,
  payload: responseData
});
export const getLessonsSuccessful = responseData => ({
  type: TRY_GET_LESSONS_SUCCESS,
  payload: responseData
});
export const getLessonsFailed = responseData => ({
  type: TRY_GET_LESSONS_FAILURE,
  payload: responseData
});
export const getLessonSuccessful = responseData => ({
  type: TRY_GET_LESSON_SUCCESS,
  payload: responseData
});
export const getLessonFailed = responseData => ({
  type: TRY_GET_LESSON_FAILURE,
  payload: responseData
});
export const deactivateLessonSuccessful = responseData => ({
  type: TRY_DEACTIVATE_LESSON_SUCCESS,
  payload: responseData
});
export const deactivateLessonFailed = responseData => ({
  type: TRY_DEACTIVATE_LESSON_FAILURE,
  payload: responseData
});
export const getContentsSuccessful = responseData => ({
  type: TRY_GET_CONTENTS_SUCCESS,
  payload: responseData
});
export const getContentsFailed = responseData => ({
  type: TRY_GET_CONTENTS_FAILURE,
  payload: responseData
});
export const editLessonSuccessful = responseData => ({
  type: TRY_EDIT_LESSON_SUCCESS,
  payload: responseData
});
export const editLessonFailed = responseData => ({
  type: TRY_EDIT_LESSON_FAILURE,
  payload: responseData
});
export const createContentSuccessful = responseData => ({
  type: TRY_CREATE_CONTENT_SUCCESS,
  payload: responseData
});
export const createContentFailed = responseData => ({
  type: TRY_CREATE_CONTENT_FAILURE,
  payload: responseData
});
export const getContentSuccessful = responseData => ({
  type: TRY_GET_CONTENT_SUCCESS,
  payload: responseData
});
export const getContentFailed = responseData => ({
  type: TRY_GET_CONTENT_FAILURE,
  payload: responseData
});
export const getQuizSuccessful = responseData => ({
  type: TRY_GET_QUIZ_SUCCESS,
  payload: responseData
});
export const createQuestionSuccessful = responseData => ({
  type: TRY_CREATE_QUESTION_SUCCESS,
  payload: responseData
});
export const getQuestionsSuccessful = responseData => ({
  type: TRY_GET_QUESTIONS_SUCCESS,
  payload: responseData
});
export const getQuestionSuccessful = responseData => ({
  type: TRY_GET_QUESTION_SUCCESS,
  payload: responseData
});
export const createChoiceSuccessful = responseData => ({
  type: TRY_CREATE_CHOICE_SUCCESS,
  payload: responseData
});
export const getChoicesSuccessful = responseData => ({
  type: TRY_GET_CHOICES_SUCCESS,
  payload: responseData
});
export const getCourses = () => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/list",
      method: "GET"
    })
    .then(res => dispatch(getCoursesSuccessful(res)))
    .catch(err => dispatch(getCoursesFailed(err)));
};
export const getMyCourses = () => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/my",
      method: "GET",
      sendToken: true
    })
    .then(res => dispatch(getMyCoursesSuccessful(res)))
    .catch(err => dispatch(getMyCoursesFailed(err)));
};
export const getEnrolledCourses = () => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/enrolled",
      method: "GET",
      sendToken: true
    })
    .then(res => dispatch(getEnrolledCoursesSuccessful(res)))
    .catch(err => dispatch(getEnrolledCoursesSuccessful(err)));
};
export const getCourse = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/" + id,
      method: "GET"
    })
    .then(res => dispatch(getCourseSuccessful(res)))
    .catch(err => dispatch(getCourseFailed(err)));
};
export const deactivateCourse = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/" + id + "/inactivate",
      method: "PUT",
      sendToken: true
    })
    .then(() => dispatch(getCourse(id)))
    .catch(err => dispatch(deactivateCourseFailed(err)));
};
export const activateCourse = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/" + id + "/activate",
      method: "PUT",
      sendToken: true
    })
    .then(() => dispatch(getCourse(id)))
    .catch();
};
export const enrollCourse = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/" + id + "/enroll",
      method: "POST",
      sendToken: true
    })
    .then(() => dispatch(getAuthCourse(id)))
    .catch();
};
export const dropCourse = (id, course_id) => (
  dispatch,
  getState,
  xmlService
) => {
  return xmlService
    .fetch({
      path: "courses/" + id + "/drop",
      method: "DELETE",
      sendToken: true
    })
    .then(() => dispatch(getAuthCourse(course_id)))
    .catch();
};
export const getAuthCourse = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "courses/" + id,
      method: "GET",
      sendToken: true
    })
    .then(res => dispatch(getCourseSuccessful(res)))
    .catch(err => dispatch(getCourseFailed(err)));
};
export const createCourse = course => (dispatch, getState, xmlService) => {
  let { file, text, title } = course;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "courses/create_course",
      method: "POST",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(createCourseSuccessful(res)))
    .catch(err => dispatch(createCourseFailed(err)));
};
export const editCourse = course => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = course;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "courses/" + id,
      method: "PUT",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(editCourseSuccessful(res)))
    .catch(err => dispatch(editCourseFailed(err)));
};
export const getLessons = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "lessons/" + id + "/list",
      method: "GET"
    })
    .then(res => dispatch(getLessonsSuccessful(res)))
    .catch(err => dispatch(getLessonsFailed(err)));
};
export const getMyLessons = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "lessons/" + id + "/my",
      method: "GET",
      sendToken: true
    })
    .then(res => dispatch(getLessonsSuccessful(res)))
    .catch(err => dispatch(getLessonsFailed(err)));
};
export const createLesson = lesson => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = lesson;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "lessons/create_lesson/" + id,
      method: "POST",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(editLessonSuccessful(res)))
    .catch(err => dispatch(editLessonFailed(err)));
};
export const getLesson = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "lessons/" + id,
      method: "GET"
    })
    .then(res => dispatch(getLessonSuccessful(res)))
    .catch(err => dispatch(getLessonFailed(err)));
};
export const deactivateLesson = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "lessons/" + id + "/inactivate",
      method: "PUT",
      sendToken: true
    })
    .then(() => dispatch(getLesson(id)))
    .catch(err => dispatch(deactivateLessonFailed(err)));
};
export const activateLesson = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "lessons/" + id + "/activate",
      method: "PUT",
      sendToken: true
    })
    .then(() => dispatch(getLesson(id)))
    .catch();
};
export const getContents = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "contents/" + id + "/list",
      method: "GET"
    })
    .then(res => dispatch(getContentsSuccessful(res)))
    .catch(err => dispatch(getContentsFailed(err)));
};
export const getMyContents = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "contents/" + id + "/my",
      method: "GET",
      sendToken: true
    })
    .then(res => dispatch(getContentsSuccessful(res)))
    .catch(err => dispatch(getContentsFailed(err)));
};
export const editLesson = lesson => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = lesson;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "lessons/" + id,
      method: "PUT",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(editLessonSuccessful(res)))
    .catch(err => dispatch(editLessonFailed(err)));
};
export const createContent = content => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = content;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "contents/create_content/" + id,
      method: "POST",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(createContentSuccessful(res)))
    .catch(err => dispatch(createContentFailed(err)));
};
export const editContent = content => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = content;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "contents/" + id,
      method: "PUT",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(createContentSuccessful(res)))
    .catch(err => dispatch(createContentFailed(err)));
};
export const getContent = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "contents/" + id,
      method: "GET"
    })
    .then(res => dispatch(getContentSuccessful(res)))
    .catch(err => dispatch(getContentFailed(err)));
};
export const getNext = () => (dispatch, getState, xmlService) => {
  return () => dispatch(next());
};
export const getPre = () => (dispatch, getState, xmlService) => {
  return () => dispatch(pre());
};
export const createQuiz = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/create_quiz/" + id,
      method: "POST",
      sendToken: true
    })
    .then(res => dispatch(getLesson(id)))
    .catch(err => dispatch(getPayload(err)));
};
export const getQuiz = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/" + id,
      method: "GET"
    })
    .then(res => dispatch(getQuizSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
export const deactivateQuiz = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/" + id + "/inactivate/",
      method: "PUT",
      sendToken: true
    })
    .then(res => dispatch(getQuiz(id)))
    .catch(err => dispatch(getPayload(err)));
};
export const activateQuiz = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/" + id + "/activate/",
      method: "PUT",
      sendToken: true
    })
    .then(res => dispatch(getQuiz(id)))
    .catch(err => dispatch(getPayload(err)));
};
export const createQuestion = question => (dispatch, getState, xmlService) => {
  let { file, text, title, id } = question;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  return xmlService
    .fetch({
      path: "quizzes/create_question/" + id,
      method: "POST",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(createQuestionSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
export const getQuestions = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/questions/" + id + "/list",
      method: "GET"
    })
    .then(res => dispatch(getQuestionsSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
export const getQuestion = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/questions/" + id,
      method: "GET"
    })
    .then(res => dispatch(getQuestionSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
export const deactivateQuestion = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/questions/" + id + "/inactivate/",
      method: "PUT",
      sendToken: true
    })
    .then(res => dispatch(getQuestion(id)))
    .catch(err => dispatch(getPayload(err)));
};
export const activateQuestion = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/questions/" + id + "/activate/",
      method: "PUT",
      sendToken: true
    })
    .then(res => dispatch(getQuestion(id)))
    .catch(err => dispatch(getPayload(err)));
};
export const createChoice = choice => (dispatch, getState, xmlService) => {
  let { file, text, title, id, is_answer } = choice;
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("text", text);
  formData.append("title", title);
  formData.append("is_answer", is_answer);
  return xmlService
    .fetch({
      path: "quizzes/create_choice/" + id,
      method: "POST",
      body: formData,
      sendToken: true,
      contentType: "multipart/form-data"
    })
    .then(res => dispatch(createChoiceSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
export const getChoices = id => (dispatch, getState, xmlService) => {
  return xmlService
    .fetch({
      path: "quizzes/choices/" + id + "/list",
      method: "GET"
    })
    .then(res => dispatch(getChoicesSuccessful(res)))
    .catch(err => dispatch(getPayload(err)));
};
