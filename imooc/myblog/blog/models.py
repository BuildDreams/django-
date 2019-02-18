from django.db import models
from django.contrib import admin

class User(models.Model):   #建立用户数据库
    usename = models.CharField(max_length=12, blank=True, primary_key=True)
    password = models.CharField(max_length=20, blank=True)

