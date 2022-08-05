from wsgiref.util import FileWrapper
from pathlib import Path

from django.shortcuts import redirect
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from requests import Request, post

from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from .utils import *

from pytube import YouTube, Search


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = "playlist-read-private"
        url = Request("GET", "https://accounts.spotify.com/authorize", 
            params={
                "scope": scopes,
                "response_type": "code",
                "redirect_uri": REDIRECT_URI,
                "client_id": CLIENT_ID
            }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
    code = request.GET.get("code")
    error = request.GET.get("error")

    response = post('https://accounts.spotify.com/api/token', 
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    refresh_token = response.get("refresh_token")
    expires_in = response.get("expires_in")
    error = response.get("error")

    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    if error:
        return redirect("http://127.0.0.1:8000/")

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect("http://127.0.0.1:8000/")


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({"status": is_authenticated}, status=status.HTTP_200_OK)


class Logoff(APIView):
    def get(self, request, format=None):
        if is_spotify_authenticated(
            self.request.session.session_key):
            logoff(self.request.session.session_key)
            return Response({"status": "Logged off successfuly"}, status=status.HTTP_200_OK)

        return Response({"error": "User not logged in"}, status=status.HTTP_204_NO_CONTENT)


class GetPlaylists(APIView):
    def get(self, request, format=None):
        if not is_spotify_authenticated(
            self.request.session.session_key):
            return Response("User not logged in", status=status.HTTP_204_NO_CONTENT)
        
        response = get_playlists(self.request.session.session_key)

        return Response(response, status=status.HTTP_200_OK)


class DownloadMusic(generics.ListAPIView):
    def get(self, request, format=None):

        search = Search(request.GET["q"])
        if not search:
            return Response({"status": None}, status.HTTP_404_NOT_FOUND)
            
        yt = YouTube(f"youtube.com/watch?v={search.results[0].video_id}")
        audio = yt.streams.get_audio_only()

        output = audio.download(output_path="output")

        path = Path(output)
        document = open(path, 'rb')
        response = HttpResponse(FileWrapper(document), content_type='video/mp4')
        response['Content-Disposition'] = 'attachment; filename="%s"' % f"{yt.title}.mp4"

        return response
      

