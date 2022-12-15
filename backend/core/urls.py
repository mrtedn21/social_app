from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework import routers

from group.views import GroupViewSet
from message.views import ChatViewSet, MessageViewSet
from music.views import SongViewSet
from person.views import PersonViewSet, PersonSettingsView
from photo.views import PhotoViewSet
from post.views import PostViewSet
from user_auth.views import AuthViewSet, RegisterViewSet

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'chats', ChatViewSet, basename='chats')
router.register(r'groups', GroupViewSet, basename='groups')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'song', SongViewSet, basename='song')
router.register(r'persons', PersonViewSet, basename='persons')
router.register(r'photos', PhotoViewSet, basename='photos')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = (
    [
        path('api/', include(router.urls)),
        path('api/person_settings/', PersonSettingsView.as_view()),
        path('admin/', admin.site.urls),
        path('__debug__/', include('debug_toolbar.urls')),
        path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
        path(
            'api/schema/swagger-ui/',
            SpectacularSwaggerView.as_view(url_name='schema'),
            name='swagger-ui',
        ),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)
