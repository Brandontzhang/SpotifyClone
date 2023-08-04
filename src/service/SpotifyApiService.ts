import { Playlist, TrackPage } from "../types/PlaylistTypes";

export const setRepeat = (state : string) => {
    return fetch(`http://localhost:5000/me/player/repeat`, {
      method: "PUT",
      mode: "cors", 
      headers: {
          "Content-Type": "application/json",
      },
      body : JSON.stringify({state : state})
    });
}

export const playSongs = (songURIs : string[]) => {
    // TODO : whenever we add a song, add the songs from the playlist be played as well (should add to the queue?)
    return fetch(`http://localhost:5000/me/player/track`, {
        method : "PUT",
        mode: "cors", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(songURIs)
    });
}

export const fetchPlaylistData = async (playlistId : string) : Promise<TrackPage> => {
    const response = await fetch(`http://localhost:5000/playlist/${playlistId}/tracks`)
    const data = await response.json();

    return data;
}

export const fetchPlaylists = async () : Promise<Playlist[]> => {
    const response = await fetch('http://localhost:5000/playlists');
    const data = await response.json();

    return data;
}

export const fetchPlaylistsSavedTracks = async (trackIds : string[]) : Promise<boolean[]> => {
    const response = await fetch('http://localhost:5000/me/playlist/contains', {
        method : "POST",
        mode: "cors", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(trackIds)
    });
    const data = await response.json();

    return data;
}

export const fetchQueue = async () : Promise<any> => {
    const response = await fetch(`http://localhost:5000/me/player/queue`);
    const data = await response.json();

    return data;
}

export const addToQueue = async (songURI : string) : Promise<any> => {
    const response = await fetch(`http://localhost:5000/me/player/queue/${songURI}`, {
        method : "POST",
        mode: "cors", 
        headers: {
            "Content-Type": "application/json",
        },
    });
    const status = await response.json();

    return status;
}