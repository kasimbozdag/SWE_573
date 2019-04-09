from rest_framework.serializers import ModelSerializer

from content.models import *


class ContentSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = [
            'sub_title',
            'text',
            'file'
        ]
