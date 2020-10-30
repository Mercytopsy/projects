from django.contrib import admin

from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_name', 'product_type', 'price', 'product_description', 'exact_date')
    list_display_links = ('id', 'product_name')
    search_fields = ('product_name', 'product_type', 'price','product_description', 'exact_date')
    list_per_page = 5
    
    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Product, ProductAdmin)
