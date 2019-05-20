from rest_framework.serializers import ModelSerializer

from tag.models import Tag, EntityTag


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class EntityTagSerializer(ModelSerializer):
    class Meta:
        model = EntityTag
        fields = "__all__"

class EntityTagDetailSerializer(ModelSerializer):
    tag=TagSerializer()
    class Meta:
        model =EntityTag
        fields = "__all__"

