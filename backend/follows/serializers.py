from rest_framework import serializers
from .models import Follow

class FollowSerializer(serializers.ModelSerializer):
    follower_name = serializers.CharField(source='follower.name', read_only=True)
    following_name = serializers.CharField(source='following.name', read_only=True)

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'follower_name', 'following', 'following_name', 'created_at']
        extra_kwargs = {'follower': {'read_only': True}}