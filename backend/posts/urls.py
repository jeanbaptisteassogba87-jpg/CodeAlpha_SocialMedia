from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, like_post, unlike_post, feed

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('posts/<int:post_id>/like/', like_post),
    path('posts/<int:post_id>/unlike/', unlike_post),
    path('feed/', feed),
]