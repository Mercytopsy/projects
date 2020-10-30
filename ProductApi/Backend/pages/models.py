from django.db import models
from datetime import datetime

class Product(models.Model):
    product_name = models.CharField(max_length=50, blank=True, null=True)
    product_type = models.CharField(max_length=50, blank=True, null=True)
    price = models.CharField(max_length=50, blank=True, null=True)
    product_description = models.CharField(max_length=20000, blank=True, null=True)
    exact_date = models.DateTimeField(default=datetime.now, blank=True)


    def __str__(self):
        return self.name
