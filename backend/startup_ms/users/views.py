from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Profile, User
from django.contrib.auth import login, authenticate, logout

# Create your views here.


class RegisterAPI(APIView):

    authentication_classes = []

    def post(self, request, *args, **kwargs):

        data = request.data

        try:
            user = User.objects.create_user(
                username=data["email"], email=data["email"], password=data["password"], first_name = data["name"]
            )
            profile = Profile.objects.create(user=user, user_type=data["type"])
            login(request=request, user=user)
            return Response(
                {"message": "User registered successfully"}, status=status.HTTP_200_OK
            )
        except KeyError as e:
            return Response(
                {"message": "Please provide all fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"message": "Some error occured: " + str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class LoginAPI(APIView):

    authentication_classes = []

    def post(self, request, *args, **kwargs):
        print(request.data)
        user = authenticate(request, **request.data)
        if user is None:
            return Response(
                {"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )
        login(request, user)
        user_type = user.profile.user_type
        return Response(
            {"message": "Logged in successfully", "user_type": user_type},
            status=status.HTTP_200_OK,
        )

class GetUserAPI(APIView):

    def get(self, request, *args, **kwargs):
        
        if not request.user.is_authenticated:
            return Response(
                {"message": "User not logged in"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {
                "user_type": request.user.profile.user_type,
                "name":request.user.get_full_name(),
                "email":request.user.email,
            },
            status=status.HTTP_200_OK,
        )
        
class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(
            {"message": "Logged out successfully"},
            status=status.HTTP_200_OK,
        )