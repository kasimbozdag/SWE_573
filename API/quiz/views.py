import datetime

from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from content.serializers import ContentSerializer
from lesson.models import Lesson
from quiz.models import Quiz, Question, Choice, QuizRelation, QuestionRelation
from quiz.serializers import QuizSerializer, QuestionSerializer, ChoiceSerializer, QuizRelationSerializer, QuizRelationDetailSerializer, QuizDetailSerializer, \
    QuestionRelationSerializer, QuestionRelationDetailSerializer, QuestionDetailSerializer, ChoiceDetailSerializer


class QuizCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        lesson = get_object_or_404(Lesson, pk=kwargs.get("pk"))
        quiz = {
            "owner": user.pk,
            "lesson": kwargs.get("pk"),
        }
        serializer = QuizSerializer(data=quiz)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class QuizAPIView(APIView):
    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        quiz = get_object_or_404(Quiz, pk=pk)
        serializer = QuizDetailSerializer(quiz)

        return Response(serializer.data, status=HTTP_200_OK)


class QuizInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        quiz = get_object_or_404(Quiz, pk=pk)
        if not quiz.is_authorized(request.user):
            return Response(status=401)
        quiz.is_active = False
        quiz.save()
        return Response(status=HTTP_200_OK)


class QuizActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        quiz = get_object_or_404(Quiz, pk=pk)
        if not quiz.is_authorized(request.user):
            return Response(status=401)
        quiz.is_active = True
        quiz.save()
        return Response(status=HTTP_200_OK)


class QuestionCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        quiz = get_object_or_404(Quiz, pk=kwargs.get("pk"))
        content = {'text': data['text'], "sub_title": data['title']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content['file'] = file
        serializer = ContentSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        question = {
            "owner": user.pk,
            "description": serializer.instance.pk,
            "quiz": kwargs.get("pk"),
        }
        serializer = QuestionSerializer(data=question)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class QuestionListAPIView(ListAPIView):
    serializer_class = QuestionDetailSerializer
    queryset = Question.objects.all()

    def get_queryset(self):
        return Question.objects.filter(quiz=self.kwargs.get("pk"), is_active=True)


class QuestionAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        pk = kwargs['pk']
        question = get_object_or_404(Question, pk=pk)
        if not question.is_authorized(request.user):
            return Response(status=401)
        content = question.description
        content_data = {'text': data['text'], "last_edited_at": datetime.datetime.now(), "sub_title": data['title']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content_data['file'] = file
        serializer = ContentSerializer(content, data=content_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        question_data = {
            "owner": question.owner.pk,
            "description": question.description.pk,
            "last_edited_at": datetime.datetime.now(),
            "quiz": question.quiz.pk
        }
        serializer = QuestionSerializer(question, data=question_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        question = get_object_or_404(Question, pk=pk)
        serializer = QuestionDetailSerializer(question)

        return Response(serializer.data, status=HTTP_200_OK)


class QuestionInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        question = get_object_or_404(Question, pk=pk)
        if not question.is_authorized(request.user):
            return Response(status=401)
        question.is_active = False
        question.save()
        return Response(status=HTTP_200_OK)


class QuestionActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        question = get_object_or_404(Question, pk=pk)
        if not question.is_authorized(request.user):
            return Response(status=401)
        question.is_active = True
        question.save()
        return Response(status=HTTP_200_OK)


class TeacherQuestionAPIView(ListAPIView):
    serializer_class = QuestionDetailSerializer

    def get_queryset(self):
        return Question.objects.filter(quiz=self.kwargs.get("pk"))


class ChoiceCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        question = get_object_or_404(Question, pk=kwargs.get("pk"))
        content = {'text': data['text'], "sub_title": data.get("title")}
        if "file" in request.FILES:
            file = request.FILES['file']
            content['file'] = file
        serializer = ContentSerializer(data=content)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        choice = {
            "owner": user.pk,
            "description": serializer.instance.pk,
            "question": kwargs.get("pk"),
            "is_answer": data.get("is_answer")
        }
        serializer = ChoiceSerializer(data=choice)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class ChoiceListAPIView(ListAPIView):
    serializer_class = ChoiceDetailSerializer

    def get_queryset(self):
        return Choice.objects.filter(question=self.kwargs.get("pk"), is_active=True)


class ChoiceAPIView(APIView):
    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        pk = kwargs['pk']
        choice = get_object_or_404(Choice, pk=pk)
        if not choice.is_authorized(request.user):
            return Response(status=401)
        content = choice.description
        content_data = {'text': data['text'], "last_edited_at": datetime.datetime.now(), "sub_title": data['title']}
        if "file" in request.FILES:
            file = request.FILES['file']
            content_data['file'] = file
        serializer = ContentSerializer(content, data=content_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        choice_data = {
            "owner": choice.owner.pk,
            "description": choice.description.pk,
            "last_edited_at": datetime.datetime.now(),
            "question": choice.question.pk,
            "is_answer": data.get("is_answer")
        }
        serializer = ChoiceSerializer(choice, data=choice_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        choice = get_object_or_404(Choice, pk=pk)
        serializer = ChoiceSerializer(choice)

        return Response(serializer.data, status=HTTP_200_OK)


class ChoiceInactivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        choice = get_object_or_404(Choice, pk=pk)
        if not choice.is_authorized(request.user):
            return Response(status=401)
        choice.is_active = False
        choice.save()
        return Response(status=HTTP_200_OK)


class ChoiceActivateAPIView(APIView):
    def put(self, request, *args, **kwargs):
        pk = kwargs['pk']
        choice = get_object_or_404(Choice, pk=pk)
        if not choice.is_authorized(request.user):
            return Response(status=401)
        choice.is_active = True
        choice.save()
        return Response(status=HTTP_200_OK)


class TeacherChoiceAPIView(ListAPIView):
    serializer_class = ChoiceSerializer

    def get_queryset(self):
        return Choice.objects.filter(question=self.kwargs.get("pk"))


class QuizRelationCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        qr = {
            "user": user.pk,
            "quiz": kwargs.get("pk"),
        }
        serializer = QuizRelationSerializer(data=qr)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class QuizRelationListAPIView(ListAPIView):
    serializer_class = QuizRelationDetailSerializer

    def get_queryset(self):
        return QuizRelation.objects.filter(user=self.request.user.pk)


class QuestionRelationCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user

        choice = Choice.objects.filter(pk=request.data.get("answer")).first()
        quiz_r = QuizRelation.objects.filter(pk=request.data.get("quiz")).first()
        if choice.is_answer:
            quiz_r.right+=1
        else:
            quiz_r.wrong+=1
        quiz_r.save()

        qr = {
            "user": user.pk,
            "question": kwargs.get("pk"),
            "quiz": request.data.get("quiz"),
            "answer": request.data.get("answer"),
            "right": choice.is_answer
        }
        serializer = QuestionRelationSerializer(data=qr)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_200_OK)


class QuestionRelationListAPIView(ListAPIView):
    serializer_class = QuestionRelationDetailSerializer

    def get_queryset(self):
        return QuestionRelation.objects.filter(user=self.request.user.pk,quiz=self.kwargs.get("pk"))
