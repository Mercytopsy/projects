from django.shortcuts import render
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from .serializer import UserSerializer
from rest_framework.parsers import JSONParser 
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

@csrf_exempt
def signup(request):
    if request.method == "POST":
        all_data = JSONParser().parse(request)
        serializer = UserSerializer(data=all_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
   
@csrf_exempt
def login(request):  
    queryset = User.objects.all()
    serializer_class = UserSerializer(queryset, many=True)
    return JsonResponse(serializer_class.data, safe=False)

