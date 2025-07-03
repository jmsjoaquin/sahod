from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'email', 
            'given_name', 
            'last_name', 
            # 'salary_per_day',
            # 'employment_start_date', 
            'password'
            ]
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            given_name=validated_data['given_name'],
            last_name=validated_data['last_name'],
            # salary_per_day=validated_data['salary_per_day'],
            # employment_start_date=validated_data['employment_start_date'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(username=email, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")