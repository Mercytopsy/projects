from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    class Meta:
       model = User
       fields = ('email', 'username', 'password')