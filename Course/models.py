from django.db import models

def validate_context(value):
    words = value.split()
    if len(words) > 130:
        return False
    return True


class Course(models.Model):
    name = models.CharField(max_length=100, verbose_name="Tittle for your course")
    instructor_name = models.CharField(max_length = 50, blank =False, null = False)
    description = models.CharField(max_length=200, verbose_name="Write a quick description of your course")
    context = models.TextField(
        verbose_name="Write the topics, context and a large description for your course", 
    )
    creation_date = models.DateTimeField(auto_now_add=True, verbose_name="Creation date")

    class Meta:
        ordering = ['name']

    @staticmethod
    def get_by_id(id):
        return Course.objects.filter(pk=id).first()
    
    @staticmethod
    def get_context(course_id):
        course = Course.get_by_id(course_id)
        if course is None:
            return "Without context"
        else:
            contex = f'{course.name}: {course.context}'
            return contex
        
    @staticmethod
    def create(name, description, context):
        if validate_context(context):
            course = Course.objects.create(name, description, context)
            return course
        else:
            return None
        
    
