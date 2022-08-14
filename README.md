# spotify-music-downloader
This webapp allows you to log in with your Spotify account and download songs from your Spotify playlists.

## Main technologies used
    django v4.0.4
    React 18.0.0

***To run this code on your local device, it is necessary to go to music_downloader/spotify/credentials.py and add the CLIENT_ID and CLIENT_SECRET credentials there. To get those credentials, you need to create an account at Spotify and then create a new app at https://developer.spotify.com/dashboard/applications***

### Setting up (after the you add the CLIENT_ID and CLIENT_SECRET to music_controller/spotify/credentials.py)
  1. Open a terminal window, `cd` into music_downloader and run `python manage.py runserver`
  2. Then, on a new terminal window at music_downloader/frontend, run `npm run dev`
  3. After that, on your favourite browser, go to http://127.0.0.1:8000/
  4. Enjoy