from .views import index
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', index)
]