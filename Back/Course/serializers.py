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
        course = Course(**validated_data)
        course.save()
        return course
    
    def is_valid(self, raise_exception=False):
        if 'instructor' in self.initial_data:
            user = User.objects.get(pk=self.initial_data['instructor'])
            if user.rol != "Profesor":
                self._errors = {'instructor': 'Only professors can create courses.'}
                if raise_exception:
                    raise serializers.ValidationError(self.errors)
                return False
        return super().is_valid(raise_exception=raise_exception)
    

class QuestionSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=200)
