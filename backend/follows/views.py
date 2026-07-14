from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Follow
from users.models import User
from users.serializers import PublicProfileSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    if user_id == request.user.id:
        return Response({'error': 'Impossible de se suivre soi-meme'}, status=400)
    try:
        target = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur introuvable'}, status=404)

    follow, created = Follow.objects.get_or_create(follower=request.user, following=target)
    if not created:
        return Response({'message': 'Deja suivi'}, status=200)
    return Response({'message': f'Vous suivez maintenant {target.name}'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    try:
        target = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur introuvable'}, status=404)

    Follow.objects.filter(follower=request.user, following=target).delete()
    return Response({'message': f'Vous ne suivez plus {target.name}'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_list(request, user_id):
    follows = Follow.objects.filter(following_id=user_id)
    users = [f.follower for f in follows]
    serializer = PublicProfileSerializer(users, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def following_list(request, user_id):
    follows = Follow.objects.filter(follower_id=user_id)
    users = [f.following for f in follows]
    serializer = PublicProfileSerializer(users, many=True, context={'request': request})
    return Response(serializer.data)