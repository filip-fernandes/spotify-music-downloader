# spotify-music-downloader
This webapp allows you to log in with your Spotify account and download songs from your Spotify playlists.

## Main technologies used
    django v4.0.4
    React 18.0.0

### Running this code on your local device
 1. It is necessary to go to music_downloader/spotify/credentials.py and add the CLIENT_ID and CLIENT_SECRET credentials there. To get those credentials, you need to create an account at Spotify and then create a new app at https://developer.spotify.com/dashboard/applications
 2. You should create an empty folder named "output" on music_downloader (parent folder)
 3. Install all python dependencies from requirements.txt and all node modules (you can find these at music_downloader/frontend/package.json)

### Running 
  1. Open a terminal window, `cd` into music_downloader and run `python manage.py runserver`
  2. Then, on a new terminal window at music_downloader/frontend, run `npm run dev`
  3. After that, on your favourite browser, go to http://127.0.0.1:8000/
  4. Enjoy
  
### Video demo
Originally, I made this application for my Final Project in the CS50x course, so I recorded a video showcasing it.
Watch it here: https://www.youtube.com/watch?v=17D_o192Gmw
