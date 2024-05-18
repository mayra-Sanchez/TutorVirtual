from rest_framework import serializers
from .models import User

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