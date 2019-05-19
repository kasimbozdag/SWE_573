from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from content.models import Content
from lesson.models import Lesson


class Quiz(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.DO_NOTHING, unique=True)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.lesson.title + " Quiz"

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.DO_NOTHING)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    description = models.ForeignKey(Content, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.description.sub_title

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.DO_NOTHING)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    description = models.ForeignKey(Content, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)
    is_answer = models.BooleanField(default=False)

    def __str__(self):
        return self.description.sub_title

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False

