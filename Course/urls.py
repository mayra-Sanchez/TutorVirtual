from django.urls import path
from .views import *


urlpatterns = [
    path('/home', home, name='home'),
    path('/estudent/list', List.as_view(), name='list'),
    path('/teacher/register', Register.as_view(), name='register'),
    path('/student/<int:pk>/chat', Chat.as_view(), name='chat')
]