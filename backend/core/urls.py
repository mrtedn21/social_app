from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from group.views import GroupViewSet
from message.views import ChatViewSet, MessageViewSet
from music.views import CommonMusicViewSet, GroupSongViewSet, PersonSongViewSet
from person.views import PersonSettingsView, PersonViewSet
from photo.views import GroupPhotoViewSet, PersonPhotoViewSet
from post.views import GroupPostViewSet, PersonPostViewSet
from rest_framework import routers
from user_auth.views import AuthViewSet, RegisterViewSet
from video.views import GroupVideoViewSet, PersonVideoViewSet
from person.views import WhoAmIView

router = routers.DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'chats', ChatViewSet, basename='chats')
router.register(r'common_music', CommonMusicViewSet, basename='common_music')
router.register(r'groups', GroupViewSet, basename='groups')
router.register(r'group_music', GroupSongViewSet, basename='group_music')
router.register(r'group_photos', GroupPhotoViewSet, basename='group_photos')
router.register(r'group_posts', GroupPostViewSet, basename='group_posts')
router.register(r'group_videos', GroupVideoViewSet, basename='group_videos')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'persons', PersonViewSet, basename='persons')
router.register(r'person_photos', PersonPhotoViewSet, basename='person_photos')
router.register(r'person_posts', PersonPostViewSet, basename='person_posts')
router.register(r'person_music', PersonSongViewSet, basename='person_music')
router.register(r'person_videos', PersonVideoViewSet, basename='person_videos')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = (
    [
        path('api/', include(router.urls)),
        path('api/person_settings/', PersonSettingsView.as_view()),
        path('api/who_am_i/', WhoAmIView.as_view()),
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
