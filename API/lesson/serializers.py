from auth.serializers import UserDetailSerializer
from course.serializers import CourseDetailSerializer
from quiz.models import Quiz
from .models import *

from content.serializers import ContentSerializer

from rest_framework.serializers import ModelSerializer, SerializerMethodField


class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class LessonDetailSerializer(ModelSerializer):
    description = ContentSerializer()
    owner = UserDetailSerializer()
    course = SerializerMethodField()
    contents = SerializerMethodField()
    quiz = SerializerMethodField()

    class Meta:
        model = Lesson
        fields = "__all__"

    def get_course(self, obj):
        return obj.course.title

    def get_contents(self, obj):
        e = Contents.objects.filter(lesson=obj.pk, is_active=True).count()
        return e

    def get_quiz(self, obj):
        q = Quiz.objects.filter(lesson=obj.pk, is_active=True).first()
        if q:
            return q.pk
        return False
