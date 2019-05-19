from django.db import models

# Create your models here.

from content.models import Content
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from course.models import Course


class Lesson(models.Model):
    title = models.CharField(max_length=127)
    description = models.ForeignKey(Content, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.DO_NOTHING)
    place = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False

class Contents(models.Model):
    lesson=models.ForeignKey(Lesson,on_delete=models.DO_NOTHING)
    content=models.ForeignKey(Content,on_delete=models.DO_NOTHING)
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    place = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)


    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False