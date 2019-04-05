from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.fields import CharField, EmailField
from rest_framework.serializers import ModelSerializer
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',

        ]


class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(write_only=True, required=False)
    email = EmailField(label='Email Address', write_only=True, required=False)
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token',
            'user',

        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                        }

    def validate(self, data):
        password = data["password"]
        email = data.get("email")
        username = data.get("username")
        user = User.objects.filter(email=email).distinct() | User.objects.filter(username=username).distinct()
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError("Incorrect credential")
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrect credential")

        payload = jwt_payload_handler(user_obj)
        token = jwt_encode_handler(payload)
        data["token"] = token
        data["user"] = user_obj
        return data
