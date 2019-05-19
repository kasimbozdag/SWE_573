import datetime

from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from content.models import Content
from content.serializers import ContentSerializer
from course.models import Course, Enrollment, Prerequisite
from course.serializers import CourseSerializer, CourseDetailSerializer, EnrollmentSerializer, EnrollmentDetailSerializer, PrerequisiteSerializer, \
    ContentTypeSerializer, FullfilledSerializer
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
        if not course.is_authorized(request.user):
            return Response(status=401)
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
        serializer = CourseDetailSerializer(course,context={"user":request.user})

        return Response(serializer.data, status=HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        if not course.is_authorized(request.user):
            return Response(status=401)
        content = course.description
        course.delete()
        content.delete()
        return Response(status=HTTP_200_OK)


class CourseListAPIView(ListAPIView):
    serializer_class = CourseDetailSerializer
    queryset = Course.objects.all()

    def get_queryset(self):
        params = self.request.query_params
        if "q" in params:
            query = params['q']
            if query == "first":
                return Course.objects.all()
            if query == "title":
                return Course.objects.all().order_by("title")
        return Course.objects.all().order_by("-created_at")


class TeacherCoursesAPIView(ListAPIView):
    serializer_class = CourseDetailSerializer

    def get_queryset(self):
        return Course.objects.filter(owner=self.request.user)


class CourseInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        if not course.is_authorized(request.user):
            return Response(status=401)
        course.is_active = False
        course.save()
        return Response(status=HTTP_200_OK)


class CourseActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        course = get_object_or_404(Course, pk=pk)
        if not course.is_authorized(request.user):
            return Response(status=401)
        course.is_active = True
        course.save()
        return Response(status=HTTP_200_OK)

class EnrollCourseAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        course = get_object_or_404(Course, pk=kwargs.get("pk"))

        enroll = {
            "user": user.pk,
            "course": kwargs.get("pk"),
        }
        serializer =EnrollmentSerializer(data=enroll)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

class EnrolledCourseAPIView(ListAPIView):
    serializer_class = EnrollmentDetailSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user.pk)

class EnrollmentAPIView(APIView):
    def delete(self,request,*args,**kwargs):
        enrollment=get_object_or_404(Enrollment,pk=kwargs.get("pk"))
        enrollment.delete()
        return Response(status=HTTP_200_OK)

class PrerequisiteCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        object_model=kwargs.get('obj_model')
        object_id=kwargs.get("obj_pk")
        prerequisite_model=kwargs.get('p_model')
        prerequisite_id=kwargs.get("p_pk")
        prerequisite = {
            "content_type": object_model,
            "prerequisite_content_type": prerequisite_model,
            "object_id": object_id,
            "prerequisite_object_id": prerequisite_id,
        }
        serializer =PrerequisiteSerializer(data=prerequisite)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

class PrerequisiteAPIView(APIView):
    def delete(self,request,*args,**kwargs):
        prerequisite=get_object_or_404(Prerequisite,pk=kwargs.get("pk"))
        prerequisite.delete()
        return Response(status=HTTP_200_OK)

class ContentTypeListAPIView(ListAPIView):
    serializer_class = ContentTypeSerializer
    queryset = ContentType.objects.all()

class FullFilledCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        object_model=kwargs.get('obj_model')
        model = ContentType.objects.get(model=object_model)
        object_id=kwargs.get("obj_pk")
        fullfilled = {
            "content_type": model.pk,
            "user":user.pk,
            "object_id": object_id,
        }
        serializer =FullfilledSerializer(data=fullfilled)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)