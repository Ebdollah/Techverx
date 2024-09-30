from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError 

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(
            email=clean_data['email'],
            username=clean_data['username'],  # Ensure the username is passed
            password=clean_data['password']
        )
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        admin_user = authenticate(username=clean_data['email'], password=clean_data['password'])
        print(admin_user.is_superuser)  # Make sure indentation is consistent
        if not admin_user:
            raise ValidationError('User not found')
        if not admin_user.is_superuser:
            raise ValidationError('User is not admin')
        return admin_user


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')