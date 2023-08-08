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

export const play = (contextURI : string, trackURIs? : string[], offset? : string | number) => {
    // TODO : whenever we add a song, add the songs from the playlist be played as well (should add to the queue?)
    return fetch(`http://localhost:5000/me/player/play`, {
        method : "PUT",
        mode: "cors", 
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            contextURI : contextURI,
            uris : trackURIs ? trackURIs : [],
            offset : offset ? offset : 0
        })
    });
}

export const getSavedTracks = async () => {
    const response = await fetch(`http://localhost:5000/me/tracks`);
    const data = await response.json();

    return data;
}

export const fetchPlaylistData = async (playlistId : string) : Promise<TrackPage> => {
    const response = await fetch(`http://localhost:5000/playlist/${playlistId}/tracks`)
    const data = await response.json();

    return data;
}

export const getLikedSongs = async () : Promise<Playlist> => {
    const response = await fetch(`http://localhost:5000/me/tracks`);
    const data = await response.json();

    return data;
}

export const getDiscoverWeekly = async () : Promise<Playlist> => {
    const data = await search("Discover Weekly", ['playlist']);

    return data.playlists.items[0];
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
    const status = await response.status;

    return status;
}

export const search = async (query : string, types : string[]) : Promise<any> => {
    const response = await fetch(`http://localhost:5000/search/${query}/${types.join(",")}`);
    const data = await response.json();
    
    return data;
}