from rest_framework.permissions import IsAuthenticated


class IsFounder(IsAuthenticated):
    def has_permission(self,request,view):
        print(request.user)
        return super().has_permission(request,view) and request.user.profile.user_type.upper() == "FOUNDER"
    
class IsStudent(IsAuthenticated):
    def has_permission(self,request,view):
        return super().has_permission(request,view) and request.user.profile.user_type.upper() == "STUDENT"