from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create_course', views.CourseCreateAPIView.as_view(), name="create-course"),
    url(r'^list', views.CourseListAPIView.as_view(), name="courses"),
    url(r'^my', views.TeacherCoursesAPIView.as_view(), name="my-courses"),
    url(r'^(?P<pk>[0-9]+)/inactivate', views.CourseInactivateAPIView.as_view(), name="inactivate"),
    url(r'^(?P<pk>[0-9]+)/activate', views.CourseActivateAPIView.as_view(), name="activate"),
    url(r'^enrolled', views.EnrolledCourseAPIView.as_view(), name="enroll-list"),
    url(r'^(?P<pk>[0-9]+)/enroll', views.EnrollCourseAPIView.as_view(), name="enroll"),
    url(r'^(?P<pk>[0-9]+)/drop', views.EnrollmentAPIView.as_view(), name="drop"),
    url(r'^(?P<obj_model>[0-9]+)/(?P<obj_pk>[0-9]+)/(?P<p_model>[0-9]+)/(?P<p_pk>[0-9]+)', views.PrerequisiteCreateAPIView.as_view(), name="pre"),
    url(r'^prerequisite/(?P<pk>[0-9]+)', views.PrerequisiteAPIView.as_view(), name="pre-delete"),
    url(r'^(?P<obj_model>[A-Za-z]+)/(?P<obj_pk>[0-9]+)', views.FullFilledCreateAPIView.as_view(), name="full"),
    url(r'^(?P<pk>[0-9]+)', views.CourseAPIView.as_view(), name="course"),
    url(r'^models', views.ContentTypeListAPIView.as_view(), name="models"),
]
