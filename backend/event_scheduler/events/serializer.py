from rest_framework import serializers
from .models import Event, Session
from django.contrib.auth.models import User

class SessionSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Session
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    sessions = SessionSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        if data['username']:
            if User.objects.filter(username= data['username']).exists():
                raise serializers.ValidationError("Username already exists")
        if data['email']:
            if User.objects.filter(email= data['email']).exists():
                raise serializers.ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        user = User.objects.create(username= validated_data['username'], email= validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return validated_data
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
