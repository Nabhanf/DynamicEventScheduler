from rest_framework import viewsets
from .models import Event, Session
from .serializer import EventSerializer, SessionSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class EventViewSet(viewsets.ModelViewSet):
    permission_classes = []      
    # authentication_classes = [TokenAuthentication]

    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SessionViewSet(viewsets.ModelViewSet):
    permission_classes = []      
    # authentication_classes = [TokenAuthentication]
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class RegisterAPI(APIView):
    permission_classes=[]
    def post(self,request):
        _data = request.data
        serializer = RegisterSerializer(data=_data)

        if not serializer.is_valid():
            return Response({"msg": serializer.errors},status=status.HTTP_404_NOT_FOUND)
        
        serializer.save()
        return Response({"msg":"User created"}, status=status.HTTP_201_CREATED)
    

class LoginAPI(APIView):
    permission_classes=[]
    def post(self,request):
        _data = request.data
        serializer = LoginSerializer(data=_data)

        if not serializer.is_valid():
            return Response({"msg":serializer.errors},status=status.HTTP_404_NOT_FOUND)
        
        user = authenticate(username= serializer.data['username'], password=serializer.data['password'])

        if not user:
            return Response({"msg":"Invalid user"}, status=status.HTTP_404_NOT_FOUND)
        
        token, _ = Token.objects.get_or_create(user = user)
        return Response({"msg":"Login Successful","token":str(token)},status=status.HTTP_201_CREATED)