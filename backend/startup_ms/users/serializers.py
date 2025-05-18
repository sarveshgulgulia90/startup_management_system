from .models import Profile


from rest_framework.serializers import ModelSerializer,SerializerMethodField


class ProfileSerializer(ModelSerializer):
    
    name = SerializerMethodField()
    email = SerializerMethodField()
        
    class Meta:
        model = Profile
        fields = ["user_type","name","email"]
        
    def get_name(self,obj):
        return obj.user.get_full_name()
    
    def get_email(self,obj):
        return obj.user.email
            