from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from person.views import PersonViewSet

router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
