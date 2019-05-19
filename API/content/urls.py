from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^create_content/(?P<pk>[0-9]+)', views.ContentCreateAPIView.as_view(), name="create-content"),
    url(r'^(?P<pk>[0-9]+)/list', views.ContentsListAPIView.as_view(), name="contents"),
    url(r'^(?P<pk>[0-9]+)/my', views.TeacherContentsListAPIView.as_view(), name="my-contents"),
    url(r'^(?P<pk>[0-9]+)/inactivate', views.ContentsInactivateAPIView.as_view(), name="inactivate"),
    url(r'^(?P<pk>[0-9]+)/activate', views.ContentsActivateAPIView.as_view(), name="activate"),
    url(r'^(?P<pk>[0-9]+)/change', views.ChangePlaceAPIView.as_view(), name="change"),
    url(r'^(?P<pk>[0-9]+)', views.ContentsAPIView.as_view(), name="contents"),


]
