from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import EventViewSet, SessionViewSet, RegisterAPI, LoginAPI

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'sessions', SessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view()),

]
