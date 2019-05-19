from auth.serializers import UserDetailSerializer
from course.models import *

from content.serializers import ContentSerializer

from rest_framework.serializers import ModelSerializer


class CourseSerializer(ModelSerializer):

    class Meta:
        model = Course
        fields = "__all__"


class CourseDetailSerializer(ModelSerializer):
    description=ContentSerializer()
    owner=UserDetailSerializer()

    class Meta:
        model = Course
        fields = "__all__"
