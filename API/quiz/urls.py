from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create_quiz/(?P<pk>[0-9]+)', views.QuizCreateAPIView.as_view(), name="create-quiz"),
    # url(r'^(?P<pk>[0-9]+)/list', views.LessonListAPIView.as_view(), name="lessons"),
    # url(r'^(?P<pk>[0-9]+)/my', views.TeacherLessonsAPIView.as_view(), name="my-lessons"),
    url(r'^(?P<pk>[0-9]+)/inactivate', views.QuizInactivateAPIView.as_view(), name="inactivate"),
    url(r'^(?P<pk>[0-9]+)/activate', views.QuizActivateAPIView.as_view(), name="activate"),
    # url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)', views.QuizAPIView.as_view(), name="quiz"),
    url(r'^create_question/(?P<pk>[0-9]+)', views.QuestionCreateAPIView.as_view(), name="create-question"),
    url(r'^questions/(?P<pk>[0-9]+)/list', views.QuestionListAPIView.as_view(), name="questions"),
    url(r'^questions/(?P<pk>[0-9]+)/my', views.TeacherQuestionAPIView.as_view(), name="my-question"),
    url(r'^questions/(?P<pk>[0-9]+)/inactivate', views.QuestionInactivateAPIView.as_view(), name="question-inactivate"),
    url(r'^questions/(?P<pk>[0-9]+)/activate', views.QuestionActivateAPIView.as_view(), name="questions-activate"),
    # url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^questions/(?P<pk>[0-9]+)', views.QuestionAPIView.as_view(), name="question"),
    url(r'^create_choice/(?P<pk>[0-9]+)', views.ChoiceCreateAPIView.as_view(), name="create-choice"),
    url(r'^choices/(?P<pk>[0-9]+)/list', views.ChoiceListAPIView.as_view(), name="choices"),
    url(r'^choices/(?P<pk>[0-9]+)/my', views.TeacherChoiceAPIView.as_view(), name="my-choice"),
    url(r'^choices/(?P<pk>[0-9]+)/inactivate', views.ChoiceInactivateAPIView.as_view(), name="choice-inactivate"),
    url(r'^choices/(?P<pk>[0-9]+)/activate', views.ChoiceActivateAPIView.as_view(), name="choice-activate"),
    # url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^choices/(?P<pk>[0-9]+)', views.ChoiceAPIView.as_view(), name="choice"),
    url(r'^relation/(?P<pk>[0-9]+)', views.QuizRelationCreateAPIView.as_view(), name="create-qr"),
    url(r'^relations/(?P<pk>[0-9]+)', views.QuizRelationListAPIView.as_view(), name="list-qr"),
    url(r'^questions/relation/(?P<pk>[0-9]+)', views.QuestionRelationCreateAPIView.as_view(), name="create-qqr"),
    url(r'^questions/relations/(?P<pk>[0-9]+)', views.QuestionRelationListAPIView.as_view(), name="list-qqr"),

]
