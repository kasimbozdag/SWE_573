from rest_framework.serializers import ModelSerializer, SerializerMethodField

from auth.serializers import UserDetailSerializer
from content.serializers import ContentSerializer
from quiz.models import Quiz, Question, Choice, QuizRelation, QuestionRelation


class QuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"


class QuizDetailSerializer(ModelSerializer):
    lesson = SerializerMethodField()
    questions = SerializerMethodField()
    owner = UserDetailSerializer()

    class Meta:
        model = Quiz
        fields = "__all__"

    def get_lesson(self, obj):
        return obj.lesson.title

    def get_questions(self, obj):
        return Question.objects.filter(quiz=obj.pk).count()


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuestionDetailSerializer(ModelSerializer):
    answers = SerializerMethodField()
    choices = SerializerMethodField()

    class Meta:
        model = Question
        fields = "__all__"

    def get_answers(self, obj):
        total = QuestionRelation.objects.filter(question=obj.pk).count()
        right = QuestionRelation.objects.filter(question=obj.pk, right=True).count()
        statistics = {"total": total, "right": right}
        choices = Choice.objects.filter(question=obj.pk, is_active=True)
        for c in choices:
            answers = QuestionRelation.objects.filter(answer=c.pk).count()
            statistics[c.pk] = answers
        return statistics

    def get_choices(self, obj):
        choices = Choice.objects.filter(question=obj.pk)
        return ChoiceDetailSerializer(choices, many=True).data


class ChoiceDetailSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class ChoiceSerializer(ModelSerializer):
    class Meta:
        model = Choice
        fields = "__all__"


class QuizRelationSerializer(ModelSerializer):
    class Meta:
        model = QuizRelation
        fields = "__all__"


class QuizRelationDetailSerializer(ModelSerializer):
    quiz = SerializerMethodField()
    completed = SerializerMethodField()
    answers=SerializerMethodField()
    class Meta:
        model = QuizRelation
        fields = "__all__"

    def get_quiz(self, obj):
        return obj.quiz.pk

    def get_completed(self, obj):
        ques = Question.objects.filter(quiz=obj.quiz.pk).count()
        if obj.right + obj.wrong == ques:
            return True
        return False
    def get_answers(self,obj):
        ques = QuestionRelation.objects.filter(quiz=obj.pk)
        data={}
        for q in ques:
            data[q.question.id]=q.answer.id
        return data


class QuestionRelationSerializer(ModelSerializer):
    class Meta:
        model = QuestionRelation
        fields = "__all__"


class QuestionRelationDetailSerializer(ModelSerializer):
    quiz = SerializerMethodField()

    class Meta:
        model = QuestionRelation
        fields = "__all__"

    def get_quiz(self, obj):
        return obj.quiz.pk
