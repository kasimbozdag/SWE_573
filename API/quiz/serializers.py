from rest_framework.serializers import ModelSerializer, SerializerMethodField

from quiz.models import Quiz, Question, Choice, QuizRelation, QuestionRelation


class QuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"


class QuizDetailSerializer(ModelSerializer):
    lesson = SerializerMethodField()
    questions = SerializerMethodField()

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

    class Meta:
        model = Question
        fields = "__all__"

    def get_answers(self, obj):
        total = QuestionRelation.objects.filter(question=obj.pk).count()
        right = QuestionRelation.objects.filter(right=True).count()
        statistics={"total": total, "right": right}
        choices=Choice.objects.filter(question=obj.pk,is_active=True)
        for c in choices:
            answers=QuestionRelation.objects.filter(answer=c.pk).count()
            statistics[c.pk]=answers
        return statistics


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

    class Meta:
        model = QuizRelation
        fields = "__all__"

    def get_quiz(self, obj):
        return obj.quiz.pk


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
