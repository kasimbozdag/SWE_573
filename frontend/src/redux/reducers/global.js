import {
  TRY_GET_COURSES_SUCCESS,
  TRY_GET_COURSES_FAILURE,
  TRY_GET_MY_COURSES_SUCCESS,
  TRY_GET_MY_COURSES_FAILURE,
  TRY_GET_COURSE_SUCCESS,
  TRY_GET_COURSE_FAILURE,
  TRY_DEACTIVATE_COURSE_SUCCESS,
  TRY_DEACTIVATE_COURSE_FAILURE,
  TRY_ACTIVATE_COURSE_SUCCESS,
  TRY_ACTIVATE_COURSE_FAILURE,
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

const initialState = {
  courses: [],
  course: null,
  myCourses: [],
  enrolledCourses: [],
  lessons: [],
  lesson: null,
  contents: [],
  questions: [],
  question: null,
  content: null,
  quiz: null,
  choices: [],
  courseCreated: false,
  courseCreatedFailed: false,
  lessonCreated: false,
  lessonCreatedFailed: false,
  contentCreated: false,
  contentCreatedFailed: false,
  questionCreated: false,
  questionCreatedFailed: false,
  choiceCreated: false,
  choiceCreatedFailed: false,
  index: 0,
  payload: null
};

export default function(state = initialState, action) {
  let { payload } = action;
  let { index } = state;
  if (action.type === TRY_NEXT) {
    return {
      ...state,
      index: index + 1
    };
  }
  if (action.type === TRY_PRE) {
    return {
      ...state,
      index: index - 1
    };
  }
  if (action.type === TRY_GET_COURSES_SUCCESS) {
    return {
      ...state,
      courses: payload.results,
      payload: payload
    };
  }
  if (action.type === TRY_GET_COURSES_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_GET_MY_COURSES_SUCCESS) {
    return {
      ...state,
      myCourses: payload.results,
      courseCreated: false,
      courseCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_GET_MY_COURSES_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_GET_COURSE_SUCCESS) {
    return {
      ...state,
      course: payload,
      payload: payload,
      courseCreated: false,
      courseCreatedFailed: false
    };
  }
  if (action.type === TRY_GET_COURSE_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_DEACTIVATE_COURSE_SUCCESS) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_DEACTIVATE_COURSE_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_GET_ENROLLED_COURSES_SUCCESS) {
    return {
      ...state,
      enrolledCourses: payload.results,
      payload: payload
    };
  }
  if (action.type === TRY_GET_ENROLLED_COURSES_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_COURSE_SUCCESS) {
    return {
      ...state,

      courseCreated: true,
      courseCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_COURSE_FAILURE) {
    return {
      ...state,
      courseCreated: false,
      courseCreatedFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_EDIT_COURSE_SUCCESS) {
    return {
      ...state,

      courseCreated: true,
      courseCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_EDIT_COURSE_FAILURE) {
    return {
      ...state,
      courseCreated: false,
      courseCreatedFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_GET_LESSONS_SUCCESS) {
    return {
      ...state,
      lessons: payload.results,
      payload: payload
    };
  }
  if (action.type === TRY_GET_LESSONS_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_GET_LESSON_SUCCESS) {
    return {
      ...state,
      lesson: payload,
      payload: payload,
      lessonCreated: false,
      lessonCreatedFailed: false,
      contentCreated: false,
      contentCreatedFailed: false
    };
  }
  if (action.type === TRY_GET_LESSON_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_DEACTIVATE_LESSON_SUCCESS) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_DEACTIVATE_LESSON_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_GET_CONTENTS_SUCCESS) {
    return {
      ...state,
      contents: payload.results,
      payload: payload
    };
  }
  if (action.type === TRY_GET_CONTENTS_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === TRY_EDIT_LESSON_SUCCESS) {
    return {
      ...state,

      lessonCreated: true,
      lessonCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_EDIT_LESSON_FAILURE) {
    return {
      ...state,
      lessonCreated: false,
      lessonCreatedFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_CONTENT_SUCCESS) {
    return {
      ...state,

      contentCreated: true,
      contentCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_CONTENT_FAILURE) {
    return {
      ...state,
      contentCreated: false,
      contentCreatedFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_GET_CONTENT_SUCCESS) {
    return {
      ...state,
      content: payload,
      payload: payload
    };
  }
  if (action.type === TRY_GET_CONTENT_FAILURE) {
    return {
      ...state,
      payload: payload
    };
  }
  if (action.type === PAYLOAD) {
    return {
      ...state,
      questionCreated: false,
      questionCreatedFailed: true,
      choiceCreated: false,
      choiceCreatedFailed: true,
      payload: payload
    };
  }
  if (action.type === TRY_GET_QUIZ_SUCCESS) {
    return {
      ...state,
      questionCreated: false,
      questionCreatedFailed: false,
      quiz: payload,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_QUESTION_SUCCESS) {
    return {
      ...state,

      questionCreated: true,
      questionCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_GET_QUESTIONS_SUCCESS) {
    return {
      ...state,
      questions: payload.results,
      payload: payload
    };
  }
  if (action.type === TRY_GET_QUESTION_SUCCESS) {
    return {
      ...state,
      question: payload,
      choiceCreated: false,
      choiceCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_CREATE_CHOICE_SUCCESS) {
    return {
      ...state,

      choiceCreated: true,
      choiceCreatedFailed: false,
      payload: payload
    };
  }
  if (action.type === TRY_GET_CHOICES_SUCCESS) {
    return {
      ...state,
      choices: payload.results,
      payload: payload
    };
  }

  return state;
}
