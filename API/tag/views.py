import requests
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from tag.models import Tag, EntityTag
from tag.serializers import TagSerializer, EntityTagSerializer, EntityTagDetailSerializer


class TagCreateAPIView(CreateAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class TagListAPIView(ListAPIView):
    serializer_class = TagSerializer

    def get_queryset(self):
        pass


class EntityTagsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        object_model = kwargs.get('obj_model')
        model = ContentType.objects.get(model=object_model)
        object_id = kwargs.get("obj_pk")
        tags = EntityTag.objects.filter(content_type=model.pk, object_id=object_id)
        serializer = EntityTagDetailSerializer(tags, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        # course = get_object_or_404(Course, pk=kwargs.get("pk"))
        tags=data

        object_model = kwargs.get('obj_model')
        model = ContentType.objects.get(model=object_model)
        object_id = kwargs.get("obj_pk")
        response=[]
        for tag in tags:
            t = Tag.objects.filter(url=tag['url']).first()
            if not t:


                serializer = TagSerializer(data=tag)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                t = serializer.instance
            et = EntityTag.objects.filter(tag=t.pk, content_type=model.pk, object_id=object_id).first()
            if not et:
                entitytag = {
                    "tag": t.pk,
                    "content_type": model.pk,
                    "user": user.pk,
                    "object_id": object_id,
                }
                serializer = EntityTagSerializer(data=entitytag)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                response.append(serializer.instance)
        return Response(EntityTagSerializer(response,many=True).data,status=HTTP_200_OK)



class EntityTagAPIView(APIView):
    def delete(self, request, *args, **kwargs):
        user = request.user

        tag = EntityTag.objects.filter(pk=kwargs.get("pk"), user=user.pk).first()
        if tag:
            tag.delete()
        return Response(status=HTTP_200_OK)


class GetWikiTags(APIView):
    def get(self, request, *args, **kwargs):
        keyword = kwargs.get("keyword")
        url = "https://www.wikidata.org/w/api.php" + "?action=wbsearchentities&search=" + keyword + "&language=en&format=json"
        res = requests.get(url)
        return Response(res.json(), status=HTTP_200_OK)
