from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = Post.objects.all().order_by('-created_at')
        author_id = self.request.query_params.get('author')
        if author_id:
            qs = qs.filter(author_id=author_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        serializer.save(author=self.request.user, post_id=post_id)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post introuvable'}, status=404)

    like, created = Like.objects.get_or_create(post=post, user=request.user)
    if not created:
        return Response({'message': 'Deja like'}, status=200)
    return Response({'message': 'Post aime', 'likes_count': post.likes.count()})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unlike_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post introuvable'}, status=404)

    Like.objects.filter(post=post, user=request.user).delete()
    return Response({'message': 'Like retire', 'likes_count': post.likes.count()})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def feed(request):
    """Fil public : tous les posts de tous les utilisateurs, plus recents en premier."""
    posts = Post.objects.all().order_by('-created_at')
    serializer = PostSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)