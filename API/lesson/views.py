import datetime

from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from content.serializers import ContentSerializer
from course.models import Course
from lesson.models import Lesson
from lesson.serializers import LessonSerializer, LessonDetailSerializer


class LessonCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        course = get_object_or_404(Course, pk=kwargs.get("pk"))
        content = {'text': data['text']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content['file'] = file
        serializer = ContentSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        lesson = {
            "title": data['title'],
            "owner": user.pk,
            "description": serializer.instance.pk,
            "place": data['place'],
            "course": kwargs.get("pk"),
        }
        serializer = LessonSerializer(data=lesson)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class LessonListAPIView(ListAPIView):
    serializer_class = LessonDetailSerializer
    queryset = Lesson.objects.all()

    def get_queryset(self):
        return Lesson.objects.filter(course=self.kwargs.get("pk"),is_active=True).order_by("place")

class LessonAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        pk = kwargs['pk']
        lesson = get_object_or_404(Lesson, pk=pk)
        if not lesson.is_authorized(request.user):
            return Response(status=401)
        content = lesson.description
        content_data = {'text': data['text'], "last_edited_at": datetime.datetime.now()}
        if "file" in request.FILES:
            file = request.FILES['file']
            content_data['file'] = file
        serializer = ContentSerializer(content, data=content_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        lesson_data = {
            "title": data['title'],
            "owner": lesson.owner.pk,
            "description": lesson.description.pk,
            "last_edited_at": datetime.datetime.now(),
            "course":lesson.course.pk
        }
        serializer = LessonSerializer(lesson, data=lesson_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        lesson = get_object_or_404(Lesson, pk=pk)
        serializer = LessonDetailSerializer(lesson)

        return Response(serializer.data, status=HTTP_200_OK)

class LessonInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        lesson = get_object_or_404(Lesson, pk=pk)
        if not lesson.is_authorized(request.user):
            return Response(status=401)
        lesson.is_active = False
        lesson.save()
        return Response(status=HTTP_200_OK)


class LessonActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        lesson = get_object_or_404(Lesson, pk=pk)
        if not lesson.is_authorized(request.user):
            return Response(status=401)
        lesson.is_active = True
        lesson.save()
        return Response(status=HTTP_200_OK)

class TeacherLessonsAPIView(ListAPIView):
    serializer_class = LessonDetailSerializer

    def get_queryset(self):
        return Lesson.objects.filter(course=self.kwargs.get("pk")).order_by("place")

class ChangePlaceAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        lesson = get_object_or_404(Lesson, pk=pk)
        if not lesson.is_authorized(request.user):
            return Response(status=401)
        place=request.data['place']
        lte=lesson.place
        gte=place
        change=1
        if lte < gte:
            lte=place
            gte=lesson.place
            change=-1
        lessons=Lesson.objects.filter(place__gte=gte).filter(place__lte=lte)
        for l in lessons:
            l.place=l.place+change
            l.save()
        lesson.place=place
        lesson.save()
        return Response(status=HTTP_200_OK)