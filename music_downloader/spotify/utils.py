from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import JSONDecodeError, post, put, get

from pytube import YouTube, Search


BASE_URL = "https://api.spotify.com/v1/"


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=[
            "access_token", "refresh_token", "expires_in", "token_type"
        ])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expire_date = tokens.expires_in
        if expire_date <= timezone.now():
            refresh_spotify_token(session_id)

        return True

    return False


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post("https://accounts.spotify.com/api/token", 
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    expires_in = response.get("expires_in")

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {
        "Content-Type": "application/json", "Authorization": "Bearer " + tokens.access_token
        }
    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)
    
    response = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        return response.json()
    except (KeyError, ValueError, JSONDecodeError):
        return {"Error": "Issue with request"}

def logoff(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        SpotifyToken.objects.filter(user=session_id).delete()
    else:
        return None

def get_playlists(session_id):
    # Get user id, so I can access their playlists
    user = execute_spotify_api_request(session_id, endpoint="me")
    user_id = user.get("id")

    # Get playlist id, so I can access its tracks data
    playlist_id = []
    playlist_data = execute_spotify_api_request(session_id, endpoint=f"users/{user_id}/playlists")["items"]
    for playlist in playlist_data:
        playlist_id.append(playlist["id"])

    tracks_data = [execute_spotify_api_request(
        session_id, endpoint=f"playlists/{id}/tracks"
        ).get("items") for id in playlist_id]
    
    # Filter data and get only names and artists
    response = []
    for playlist in tracks_data:
        for item in playlist:
            response.append(
                {
                    "name": item["track"]["name"],  
                    "image": item["track"]["album"]["images"][1]["url"],
                    "artists": {item["track"]["artists"][i]["name"] 
                        for i in range(len(item["track"]["artists"]))}
                }
            )
    return response

def download_music(params):
    search = Search(params)
    id = search.results[0].video_id
    yt = YouTube(f"youtube.com/watch?v={id}")
    audio = yt.streams.get_audio_only()

    output = audio.download(output_path="output")
    return output, yt.title;