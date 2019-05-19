from auth.serializers import UserDetailSerializer
from course.serializers import CourseDetailSerializer
from .models import *

from content.serializers import ContentSerializer

from rest_framework.serializers import ModelSerializer


class LessonSerializer(ModelSerializer):

    class Meta:
        model = Lesson
        fields = "__all__"


class LessonDetailSerializer(ModelSerializer):
    description=ContentSerializer()
    owner=UserDetailSerializer()
    course=CourseDetailSerializer()

    class Meta:
        model = Lesson
        fields = "__all__"
