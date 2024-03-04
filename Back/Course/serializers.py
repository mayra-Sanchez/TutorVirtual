from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        extra_kwargs = {
            'creation_date': {'required': False}
        }

class QuestionSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=200)
