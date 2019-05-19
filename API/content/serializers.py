from rest_framework.serializers import ModelSerializer

from content.models import *
from lesson.models import Contents


class ContentSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = [
            'sub_title',
            'text',
            'file'
        ]


class ContentsSerializer(ModelSerializer):
    class Meta:
        model = Contents
        fields = "__all__"


class ContentsDetailSerializer(ModelSerializer):
    content = ContentSerializer()

    class Meta:
        model = Contents
        fields = "__all__"
