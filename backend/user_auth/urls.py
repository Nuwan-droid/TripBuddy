from django.urls import path
from .views import LoginView, LogoutView, UserDetailView, CurrentUserView, RegisterUserView  # Add RegisterUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)


urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user_detail'),
    path('current-user/', CurrentUserView.as_view(), name='current_user'),
    path('register/', RegisterUserView.as_view(), name='register'),  # New registration endpoint
]
