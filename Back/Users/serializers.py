from rest_framework import serializers
from .models import User


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['rol'] = user.rol
        token['full_name'] = f"{user.first_name} {user.last_name}"

        return token
    

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'rol']
        extra_kwargs = {
            'id':{'read_only':True},
            'password':{'write_only':True},
            'email':{'required':True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)

        user.save()
        return user