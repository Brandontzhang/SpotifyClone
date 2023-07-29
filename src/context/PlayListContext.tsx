import { createContext } from "react";
import { Playlist } from "../types/PlaylistTypes";

type playlistContext = {
    playlist : Playlist;
    setPlaylist : (newPlaylist : Playlist) => void;
}

const playlistDefaultValue : playlistContext = {
    playlist : {} as Playlist,
    setPlaylist : (newPlaylist : Playlist) => {},
}

export const PlaylistContext = createContext(playlistDefaultValue);