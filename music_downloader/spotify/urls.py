from django.urls import path
from .views import *

urlpatterns = [
    path("get-auth-url", AuthURL.as_view()),
    path("callback", spotify_callback),
    path("is-authenticated", IsAuthenticated.as_view()),
    path("logoff", Logoff.as_view()),
    path("get-playlists", GetPlaylists.as_view()),
    path("download", DownloadMusic.as_view()),
]
