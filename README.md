# Music Player Project (Semi-clone of Spotify)
## Project Description
This project is a music player linked to a Spotify account. It uses Web Playback SDK from Spotify, as well as the Spotify API to interact with a user's Spotify account. 

The frontend of the project is built using React.js, and Express is used to send requests through the Spotify API. 
Additionally, a React component wrapper (https://github.com/y-hiraoka/react-spotify-web-playback-sdk) is used to interface with the Web Playback SDK. 

The project was meant to help me develop and showcase a better understanding of React, including concepts such as hooks (useState, useEffect, useMemo, useContext, etc.) and routing using ReactDOM. It was also a learning opportunity for how to work with 3rd party APIs (in this case, the Spotify web API)

## Project Highlight
One of the most interesting features I was able to find through the Spotify API, was the get recommendations route. By providing up to 5 tracks, you can generate new song recommendations. To my knowledge, this feature isn't even really used, or easily accessible in the Spotify app itself. As I wanted to use this feature more myself, I created an additional button on all tracks that enable you to add them to a temporary collection, which can be pushed to this route to generate a mini-recommendation playlist.

## How to run the project
To run the project, follow the steps below:
1. Clone the repository
2. Navigate to the src folder, and run npm install
3. Run the command npm run dev
4. Navigate to http://localhost:5173

In order to run the project against your own Spotify app, follow the steps detailed in the guide for using the WebPlaybackSdk (https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started)
Once you have your client id and client secret, you can use those in server.js to run against your own Spotify app. 

## Future enhancements
- Add view recently listened
- view Artist/Album
- Add in playlist looping/repeat modes
- TBD
