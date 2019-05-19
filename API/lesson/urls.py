from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create_lesson/(?P<pk>[0-9]+)', views.LessonCreateAPIView.as_view(), name="create-lesson"),
    url(r'^(?P<pk>[0-9]+)/list', views.LessonListAPIView.as_view(), name="lessons"),
    url(r'^(?P<pk>[0-9]+)/my', views.TeacherLessonsAPIView.as_view(), name="my-lessons"),
    url(r'^(?P<pk>[0-9]+)/inactivate', views.LessonInactivateAPIView.as_view(), name="inactivate"),
    url(r'^(?P<pk>[0-9]+)/activate', views.LessonActivateAPIView.as_view(), name="activate"),
    url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)', views.LessonAPIView.as_view(), name="lesson"),


]
