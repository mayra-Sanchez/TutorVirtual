from django.shortcuts import render
from rest_framework import generics, permissions
from .serializers import CreateUserSerializer
from .models import User

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]
