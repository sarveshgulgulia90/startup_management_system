from django.db import models

from users.models import Profile
# Create your models here.

import uuid


class Startup(models.Model):
    
    static_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=40)
    founding_date = models.DateField()
    description = models.TextField(blank=True)
    domain = models.CharField(max_length=50)
    valuation = models.DecimalField(max_digits=10,decimal_places=2)
    investors = models.JSONField(default=list)
    founders = models.ManyToManyField(Profile,related_name="startups")
    
    def __str__(self):
        return f"{self.name} - {self.domain}"
    
    class Meta:
        verbose_name_plural = "Startups"


class Employee(models.Model):
    
    """
    Attributes:
    Name
    Joining date
    Designation
    Salary
    Startup - many to one

    """
    static_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=40)
    joining_date = models.DateField()
    designation = models.CharField(max_length=40)
    salary = models.DecimalField(max_digits=10,decimal_places=2)
    startup = models.ForeignKey(Startup,on_delete=models.CASCADE,related_name="employees")
    
    def __str__(self):
        return f"{self.name} - {self.designation}"
    
    class Meta:
        verbose_name_plural = "Employees"
        

JOB_TYPES = [
    ("Full Time","Full Time"),
    ("Part Time","Part Time"),
    ("Internship","Internship")
]        


class Job(models.Model):
    """
    Attributes:

    Job type
    Title
    Description
    Startup - many to one

    """
    
    static_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    job_type = models.CharField(max_length=40,choices=JOB_TYPES)
    title = models.CharField(max_length=40)
    description = models.TextField()
    startup = models.ForeignKey(Startup,on_delete=models.CASCADE,related_name="jobs")
    
    def __str__(self):
        return f"{self.title} - {self.job_type}"
    
    class Meta:
        verbose_name_plural = "Jobs"
    

class Application(models.Model):
    
    """
    Attributes:

    Job - many to one
    Applicant - many to one
    Status
    """
    
    static_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    job = models.ForeignKey(Job,on_delete=models.CASCADE,related_name="applications")
    applicant = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name="applications")
    date_of_application = models.DateField(auto_now_add=True)
    resume = models.FileField(upload_to="resumes/")
    
    def __str__(self):
        return f"{self.applicant} - {self.job}"
    
    class Meta:
        verbose_name_plural = "Applications"
