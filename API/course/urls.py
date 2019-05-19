from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create_course', views.CourseCreateAPIView.as_view(), name="create-course"),
    url(r'^list', views.CourseListAPIView.as_view(), name="courses"),
    url(r'^my', views.TeacherCoursesAPIView.as_view(), name="my-courses"),
    url(r'^(?P<pk>[0-9]+)/inactivate', views.CourseInactivateAPIView.as_view(), name="inactivate"),
    url(r'^(?P<pk>[0-9]+)/activate', views.CourseActivateAPIView.as_view(), name="activate"),
    url(r'^(?P<pk>[0-9]+)', views.CourseAPIView.as_view(), name="course"),

]
