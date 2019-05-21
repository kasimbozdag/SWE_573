from django.apps import apps

from auth.serializers import UserDetailSerializer
from course.models import *

from content.serializers import ContentSerializer

from rest_framework.serializers import ModelSerializer, SerializerMethodField

from lesson.models import Lesson
from quiz.models import Quiz


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class CourseDetailSerializer(ModelSerializer):
    description = ContentSerializer()
    owner = UserDetailSerializer()
    enroll = SerializerMethodField()
    enrolled = SerializerMethodField()
    prerequisite = SerializerMethodField()
    prerequisite_fullfilled = SerializerMethodField()
    lessons = SerializerMethodField()
    quizzes = SerializerMethodField()
    number_of_visits=SerializerMethodField()
    class Meta:
        model = Course
        fields = "__all__"

    def get_enroll(self, obj):
        user = self.context.get('user')
        if user:
            if not user.is_anonymous:
                e = Enrollment.objects.filter(course=obj.pk, user=user.pk).first()
                if e:
                    return e.pk
        return False

    def get_enrolled(self, obj):
        e = Enrollment.objects.filter(course=obj.pk).count()
        return e

    def get_prerequisite(self, obj):
        model = ContentType.objects.get(model="course")
        pre = Prerequisite.objects.filter(content_type=model.pk, object_id=obj.pk).first()
        if pre:
            model = pre.prerequisite_content_type
            Model = apps.get_model(app_label=model.app_label, model_name=model.model)

            Instance = Model.objects.filter(pk=pre.prerequisite_object_id).first()
            return PrerequisiteSerializer(pre).data
        return None

    def get_prerequisite_fullfilled(self, obj):
        user = self.context.get('user')
        if user:
            if not user.is_anonymous:
                model = ContentType.objects.get(model="course")
                pre = Prerequisite.objects.filter(content_type=model.pk, object_id=obj.pk).first()
                if pre:
                    model = pre.prerequisite_content_type
                    Model = apps.get_model(app_label=model.app_label, model_name=model.model)

                    Instance = Model.objects.filter(pk=pre.prerequisite_object_id).first()
                    ff = Fullfilled.objects.filter(content_type=model.pk, object_id=pre.prerequisite_object_id, user=user.pk)
                    if not ff:
                        return False
        return True

    def get_lessons(self, obj):
        e = Lesson.objects.filter(course=obj.pk,is_active=True).count()
        return e

    def get_quizzes(self, obj):
        e = Quiz.objects.filter(lesson__course=obj.pk,is_active=True).count()
        return e
    def get_number_of_visits(self,obj):
        obj.number_of_visits+=1
        obj.save()
        return obj.number_of_visits

class EnrollmentSerializer(ModelSerializer):
    class Meta:
        model = Enrollment
        fields = "__all__"


class EnrollmentDetailSerializer(ModelSerializer):
    course = CourseDetailSerializer()

    class Meta:
        model = Enrollment
        fields = "__all__"


class PrerequisiteSerializer(ModelSerializer):
    class Meta:
        model = Prerequisite
        fields = "__all__"


class ContentTypeSerializer(ModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"


class FullfilledSerializer(ModelSerializer):
    class Meta:
        model = Fullfilled
        fields = "__all__"
