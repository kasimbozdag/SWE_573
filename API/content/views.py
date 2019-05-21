import datetime

from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from content.models import Content
from content.serializers import ContentSerializer, ContentsSerializer, ContentsDetailSerializer
from lesson.models import Lesson, Contents


class ContentCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        lesson = get_object_or_404(Lesson, pk=kwargs.get("pk"))
        content = {'text': data['text'], "sub_title": data['title']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content['file'] = file
        serializer = ContentSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        place = Contents.objects.filter(lesson=lesson.id).count() + 1
        contents = {
            "lesson": kwargs.get("pk"),
            "content": serializer.instance.pk,
            "owner": user.pk,
            "place": place,
        }
        serializer = ContentsSerializer(data=contents)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class ContentsListAPIView(ListAPIView):
    serializer_class = ContentsDetailSerializer
    queryset = Contents.objects.all()

    def get_queryset(self):
        return Contents.objects.filter(lesson=self.kwargs.get("pk"), is_active=True).order_by("place")


class ContentsAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        pk = kwargs['pk']
        contents = get_object_or_404(Contents, pk=pk)
        if not contents.is_authorized(request.user):
            return Response(status=401)
        content = contents.content
        content_data = {'text': data['text'], "last_edited_at": datetime.datetime.now(), "sub_title": data['title']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content_data['file'] = file
        serializer = ContentSerializer(content, data=content_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        contents_data = {
            "lesson": contents.lesson_id,
            "content": content.pk,
            "owner": contents.owner.pk,
            "last_edited_at": datetime.datetime.now(),
        }
        serializer = ContentsSerializer(contents, data=contents_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        contents = get_object_or_404(Contents, pk=pk)
        serializer = ContentsDetailSerializer(contents)

        return Response(serializer.data, status=HTTP_200_OK)


class ContentsInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        content = get_object_or_404(Contents, pk=pk)
        if not content.is_authorized(request.user):
            return Response(status=401)
        content.is_active = False
        content.save()
        return Response(status=HTTP_200_OK)


class ContentsActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        content = get_object_or_404(Contents, pk=pk)
        if not content.is_authorized(request.user):
            return Response(status=401)
        content.is_active = True
        content.save()
        return Response(status=HTTP_200_OK)

class TeacherContentsListAPIView(ListAPIView):
    serializer_class = ContentsDetailSerializer
    queryset = Contents.objects.all()

    def get_queryset(self):
        return Contents.objects.filter(lesson=self.kwargs.get("pk")).order_by("place")

class ChangePlaceAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        content = get_object_or_404(Contents, pk=pk)
        if not content.is_authorized(request.user):
            return Response(status=401)
        place=request.data['place']
        lte=content.place
        gte=place
        change=1
        if lte < gte:
            lte=place
            gte=content.place
            change=-1
        contents=Contents.objects.filter(place__gte=gte).filter(place__lte=lte)
        for l in contents:
            l.place=l.place+change
            l.save()
        content.place=place
        content.save()
        return Response(status=HTTP_200_OK)