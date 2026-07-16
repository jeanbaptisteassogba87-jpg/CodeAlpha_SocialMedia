from rest_framework import serializers
from .models import Post, Comment, Like
from follows.models import Follow

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'content', 'created_at']
        extra_kwargs = {'author': {'read_only': True}, 'post': {'read_only': True}}

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    author_avatar = serializers.ImageField(source='author.avatar', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_following_author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_name', 'author_avatar', 'content', 'image', 'created_at', 'comments', 'likes_count', 'is_liked', 'is_following_author']
        extra_kwargs = {'author': {'read_only': True}}

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(post=obj, user=request.user).exists()
        return False

    def get_is_following_author(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and obj.author_id != request.user.id:
            return Follow.objects.filter(follower=request.user, following=obj.author).exists()
        return False