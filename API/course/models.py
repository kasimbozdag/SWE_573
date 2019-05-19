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

    def __str__(self):
        return self.title

    def is_authorized(self, user):
        if self.owner == user:
            return True
        return False