from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^entity/(?P<obj_model>[A-Za-z]+)/(?P<obj_pk>[0-9]+)', views.EntityTagsAPIView.as_view(), name="create-et"),
    #url(r'^(?P<pk>[0-9]+)/list', views.LessonListAPIView.as_view(), name="lessons"),
    #url(r'^(?P<pk>[0-9]+)/my', views.TeacherLessonsAPIView.as_view(), name="my-lessons"),
    #url(r'^(?P<pk>[0-9]+)/inactivate', views.LessonInactivateAPIView.as_view(), name="inactivate"),
    #url(r'^(?P<pk>[0-9]+)/activate', views.LessonActivateAPIView.as_view(), name="activate"),
    #url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^entity/(?P<pk>[0-9]+)', views.EntityTagAPIView.as_view(), name="et"),
    url(r'^wikitags/(?P<keyword>[A-Za-z]+)', views.GetWikiTags.as_view(), name="wiki"),

]
