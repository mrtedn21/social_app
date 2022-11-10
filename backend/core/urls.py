from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import routers
from rest_framework import permissions

from message.views import ChatViewSet, MessageViewSet
from music.views import MusicViewSet
from person.views import PersonViewSet, PersonSettingsView
from photo.views import PhotoViewSet
from post.views import PostViewSet
from user_auth.views import AuthViewSet, RegisterViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'chats', ChatViewSet, basename='chats')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'music', MusicViewSet, basename='music')
router.register(r'persons', PersonViewSet, basename='persons')
router.register(r'photos', PhotoViewSet, basename='photos')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/person_settings/', PersonSettingsView.as_view()),
    path('admin/', admin.site.urls),
    path('__debug__/', include('debug_toolbar.urls')),
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0),
        name='schema-json',
    ),
    re_path(
        r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'
    ),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
