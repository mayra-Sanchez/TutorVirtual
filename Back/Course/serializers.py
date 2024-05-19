from Users.models import User
from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        extra_kwargs = {
            "name": {"required": True},
            "instructor": {"required": True},
            "material_type": {"required": True},
            "description": {"required": True},
            "context": {"required": True},
            "creation_date": {"required": False}
        }
    
    def create(self, validated_data):
        user_id = validated_data['instructor']
        user = User.objects.filter(pk=user_id)
        if user.rol == "Profesor":
            course = Course(**validated_data)
            course.save()
            return course
        return None


class QuestionSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=200)
