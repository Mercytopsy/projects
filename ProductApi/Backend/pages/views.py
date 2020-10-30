from rest_framework.decorators import permission_classes
from django.shortcuts import render
from .models import Product
from django.http.response import JsonResponse
from .serializer import ProductSerializer
from rest_framework.parsers import JSONParser 
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminUser
from django.contrib.auth import authenticate



@csrf_exempt
def add(request):
    if request.method == "POST":
        all_data = JSONParser().parse(request)
        serializer = ProductSerializer(data=all_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def all(request):  
    queryset = Product.objects.all()
    serializer_class = ProductSerializer(queryset, many=True)
    return JsonResponse(serializer_class.data, safe=False)

@csrf_exempt 
def remove(request, product_id):
    permission_classes = []
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    if request.method == "DELETE":
        object_list = Product.objects.filter(pk=product_id)
        if object_list:
            object_list.delete()
            msg_item ={'message': 'item deleted'}
            return JsonResponse(msg_item )
        else:
            no_item ={'message': 'item deleted'}
            return JsonResponse(no_item )
             

@csrf_exempt
def update(request, value_id):
    permission_classes = []
    authentication_classes = [TokenAuthentication]
    all_data = JSONParser().parse(request)
    product_str = Product.objects.filter(pk=value_id).first()
    permission_classes = [IsAdminUser]
    if request.method == 'PUT':
        serializer = ProductSerializer(product_str, data=all_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
   
   