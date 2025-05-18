from django.db import models

from django.contrib.auth.models import User

import uuid

# Create your models here.

USER_TYPE = [
    ("Student","Student"),
    ("Founder","Founder")
]

class Profile(models.Model):

    static_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.OneToOneField(User,models.CASCADE,related_name="profile")
    user_type = models.CharField(max_length=30,choices=USER_TYPE)

    def __str__(self) -> str:
        return f"{self.user_type} - {self.name}"