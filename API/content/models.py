from django.db import models

# Create your models here.

class Content(models.Model):
    sub_title=models.CharField(max_length=127,blank=True)
    text=models.CharField(max_length=256,blank=True)
    file=models.FileField(upload_to="content-files")
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_edited_at = models.DateTimeField(auto_now_add=True, editable=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.sub_title
