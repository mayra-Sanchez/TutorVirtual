from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenBlacklistView
)

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('create-user/', CreateUserView.as_view(), name='create-user')
]