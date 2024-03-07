import json
import openai

from django.shortcuts import redirect, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Course
from .serializers import CourseSerializer, QuestionSerializer

from .models import Course

def validate_context(value):
    words = value.split()
    if len(words) > 40:
        return False
    return True

def get_secret_key():
    with open('secrets.json') as f:
        secrets = json.load(f)
    return secrets['OPENAI_KEY']

api_key = get_secret_key()
openai.api_key = api_key


def ask_open_ai(context, question, model="gpt-3.5-turbo-16k"):
    prompt = f'''using the context: {context}
answer the next question: {question} in maximum 150 words. 
If the answer is not related to the context, 
give the following answer: "The question is not related to the course". 
Provide your answer using the language used in the question.'''

    messages = [{"role": "user", "content": prompt}]
    response = openai.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0,
        max_tokens= 300,
        n=1
    )
    answer = response.choices[0].message
    if answer:
        message = answer.content
    else:
        message = "Sin respuesta"
    return message


def home(request):
    return render(request, 'home.html')


class List(APIView):
    def get(self, request, format=None):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class Register(APIView):
    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            instructor_name = serializer.validated_data.get('instructor_name')
            description = serializer.validated_data.get('description')
            context = serializer.validated_data.get('context')
            course = Course.objects.create(name=name,instructor_name=instructor_name, description=description, context=context)
            if course:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "No se pudo crear el curso"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class Chat(APIView):
    def post(self, request, pk):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data.get('content')
            if validate_context(question):
                context = Course.get_context(pk)
                answer = ask_open_ai(context, question)
                return Response({'answer': answer})
            else:
                return Response({'error': 'Invalid question'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
