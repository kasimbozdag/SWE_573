import datetime

from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from content.models import Content
from content.serializers import ContentSerializer
from course.models import Course
from course.serializers import CourseSerializer, CourseDetailSerializer
from rest_framework.generics import CreateAPIView, ListAPIView


class CourseCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        content = {'text': data['text']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content['file'] = file
        serializer = ContentSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        course = {
            "title": data['title'],
            "owner": user.pk,
            "description": serializer.instance.pk
        }
        serializer = CourseSerializer(data=course)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)



class CourseAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        content = course.description
        content_data = {'text': data['text'], "last_edited_at": datetime.datetime.now()}
        if "file" in request.FILES:
            file = request.FILES['file']
            content_data['file'] = file
        serializer = ContentSerializer(content, data=content_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        course_data = {
            "title": data['title'],
            "owner": course.owner.pk,
            "description": course.description.pk,
            "last_edited_at": datetime.datetime.now()
        }
        serializer = CourseSerializer(course, data=course_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        serializer = CourseDetailSerializer(course)

        return Response(serializer.data, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        content = course.description
        course.delete()
        content.delete()
        return Response(status=HTTP_200_OK)


class CourseListAPIView(ListAPIView):
    serializer_class = CourseDetailSerializer
    queryset = Course.objects.all()

    def get_queryset(self):
        params=self.request.query_params
        if "q" in params:
            query=params['q']
            if query == "first":
                return Course.objects.all()
            if query == "title":
                return Course.objects.all().order_by("title")
        return Course.objects.all().order_by("-created_at")


class TeacherCoursesAPIView(ListAPIView):
    serializer_class = CourseDetailSerializer

    def get_queryset(self):
        return Course.objects.filter(owner=self.request.user)
