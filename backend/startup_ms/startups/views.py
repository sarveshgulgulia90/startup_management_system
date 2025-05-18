from rest_framework import status,viewsets,generics
from rest_framework.response import Response
# Create your views here.


from .models import Startup,Employee,Job, Application
from .serializers import EmployeeSerializer, StartupListSerializer,StartupCreateSerializer,StartupDetailSerializer,JobSerializer,ApplicationSerializer
from .permissions import IsFounder,IsStudent
from rest_framework.permissions import AllowAny,IsAuthenticated

class StartupListView(generics.ListAPIView):
    
    serializer_class = StartupListSerializer
    permission_classes = [IsAuthenticated]
    ordering = ["-founding_date"]
    
    def get_queryset(self):
        if self.request.user.profile.user_type.upper() == "Founder".upper():
            return self.request.user.profile.startups.all()
        return Startup.objects.all()
    
class StartupCreateView(generics.CreateAPIView):
    
    serializer_class = StartupCreateSerializer
    permission_classes = [IsFounder]
    
class StartupDetailView(generics.RetrieveAPIView):

    serializer_class = StartupDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "static_id"
    lookup_url_kwarg = "static_id"
    
    
    def get_queryset(self):
        if self.request.user.profile.user_type.upper() == "Founder".upper():
            return self.request.user.profile.startups.all()
        return Startup.objects.all()
    
    def get_object(self):
        return self.get_queryset().get(static_id=self.kwargs["static_id"])
    
class EmployeeListCreateAPI(generics.ListCreateAPIView):
    
    serializer_class = EmployeeSerializer
    permission_classes = [IsFounder]
    
    def get_queryset(self):
        return Startup.objects.get(static_id = self.kwargs.get("static_id")).employees.all()
    
    def create(self, request, *args, **kwargs):
        request.data["startup"] = self.kwargs.get("static_id")
        return super().create(request, *args, **kwargs)
    
class EmployeeDeleteAPI(generics.DestroyAPIView):
    
    serializer_class = EmployeeSerializer
    permission_classes = [IsFounder]
    lookup_field = "static_id"
    lookup_url_kwarg = "static_id"
    queryset = Employee.objects.all()


class JobListCreateAPI(generics.ListCreateAPIView):
        
        serializer_class = JobSerializer
        permission_classes = [IsAuthenticated]
        
        def get_queryset(self):
            return Startup.objects.get(static_id = self.kwargs.get("static_id")).jobs.all()
        
        def create(self, request, *args, **kwargs):
            request.data["startup"] = self.kwargs.get("static_id")
            return super().create(request, *args, **kwargs)


class JobDeleteAPI(generics.DestroyAPIView):
        
        serializer_class = JobSerializer
        permission_classes = [IsFounder]
        lookup_field = "static_id"
        lookup_url_kwarg = "static_id"
        queryset = Job.objects.all()

class JobDetailAPI(generics.RetrieveAPIView):
        
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "static_id"
    lookup_url_kwarg = "static_id"
    queryset = Job.objects.all()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return {**context,"request":self.request}

class ApplicationListCreateAPI(generics.ListCreateAPIView):
    
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        job_static_id = self.request.query_params.get("job_static_id","all")
        if job_static_id == "all":
            return Application.objects.filter(applicant=self.request.user.profile)
        return Application.objects.filter(job__static_id=job_static_id)
    
    def create(self, request, *args, **kwargs):
        try:
            job = Job.objects.get(static_id = request.data.get("job_id"))
            applicant = request.user.profile
            resume = request.FILES.get("resume")
            Application.objects.create(job=job,applicant=applicant,resume=resume)
            return Response({"message":"Application created successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)