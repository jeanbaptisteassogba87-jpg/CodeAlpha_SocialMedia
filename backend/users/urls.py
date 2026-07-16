from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, my_profile, user_profile, update_avatar

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('me/', my_profile),
    path('me/avatar/', update_avatar),
    path('profile/<int:user_id>/', user_profile),
]