from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from content.models import Content
from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Course(models.Model):
    title = models.CharField(max_length=127)
    description = models.ForeignKey(Content, on_delete=models.DO_NOTHING)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)
    number_of_visits=models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


class Prerequisite(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, blank=True, null=True)
    object_id = models.PositiveIntegerField(blank=True, null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    prerequisite_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, blank=True, null=True,related_name="pre_content_type")
    prerequisite_object_id = models.PositiveIntegerField(blank=True, null=True)
    prerequisite_content_object = GenericForeignKey('prerequisite_content_type', 'prerequisite_object_id')

class Fullfilled(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, blank=True, null=True)
    object_id = models.PositiveIntegerField(blank=True, null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)


