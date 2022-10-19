from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import routers
from rest_framework import permissions

from message.views import ChatViewSet, MessageViewSet
from person.views import PersonViewSet, GenderViewSet, LanguageViewSet, CountyViewSet
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
router.register(r'countries', CountyViewSet, basename='country')
router.register(r'genders', GenderViewSet, basename='genders')
router.register(r'languages', LanguageViewSet, basename='languages')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'persons', PersonViewSet, basename='persons')
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
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
