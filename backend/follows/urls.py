from django.urls import path
from .views import follow_user, unfollow_user, followers_list, following_list

urlpatterns = [
    path('follow/<int:user_id>/', follow_user),
    path('unfollow/<int:user_id>/', unfollow_user),
    path('followers/<int:user_id>/', followers_list),
    path('following/<int:user_id>/', following_list),
]