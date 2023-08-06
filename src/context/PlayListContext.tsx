import { createContext } from "react";
import { Playlist, SimplifiedPlaylistObject } from "../types/PlaylistTypes";

type playlistContext = {
    playlist : Playlist | SimplifiedPlaylistObject;
    setPlaylist : (newPlaylist : Playlist | SimplifiedPlaylistObject) => void;
}

const playlistDefaultValue : playlistContext = {
    playlist : {} as Playlist,
    setPlaylist : (newPlaylist : Playlist | SimplifiedPlaylistObject) => {},
}

export const PlaylistContext = createContext(playlistDefaultValue);