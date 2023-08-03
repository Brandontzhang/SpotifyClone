# Development Plan
Add remaining action buttons (Comp 7/10)
- back 10 sec
- forward 10 sec

Get PlayList
- API fetch (comp 7/28)
- Display playlists (comp 7/29)
- Navigate to selected playlist (Comp 7/29)
    - Add routing
- Play song from playlist  (comp 7/30)
    - will need to use the api (set next song and skip)
- Display playlist (comp 7/30)

Side Nav (Comp)
- Search bar
- Display results
    - Artists
    - Songs
    - Playlists

Clean Up
- move Spotify API calls into its own service
    - Whenever a call is made to the service to play a song or update queue, changes a flag to update the queue
    - useQueue will have a useEffect watching that flag to check for updates

- Add song to liked list (saved song)
    - svg update
    - api action
    - click trigger


Refactoring
- move all server calls into a service file
- create custom hooks for any API calls

Action Menu
- home screen
- search screen

- Add song to queue
- Edit queue

- navigation buttons (back and forward)

Manipulate playlist (next songs)
- loop (repeat)
- shuffle?

UI
- playlist header

Home Screen
- users specific playlists

Artist box
- Keep size small
- hover to scroll through name


Pulldown Spotify playlist information
- display playlist blocks
    - Trending
    - Recently Played
    - Favorites?
- Click into playlist
    - display song information
        - wow ballroom stuff... add bpm lol
    - select song to play
- Additional!
    - add song requests

