import { createContext } from "react";
import { Track } from "../types/TrackTypes";

type buildPlaylistContext = {
    seedTracks : Track[];
    setSeedTracks : (newTracks : Track[]) => void;

    recTracks : Track[];
    setRecTracks : (newRecTracks : Track[]) => void;
}

const buildPlaylistDefaultValue : buildPlaylistContext = {
    seedTracks : [],
    setSeedTracks : (_newTracks : Track[]) => {},

    recTracks : [],
    setRecTracks : (_newRecTracks : Track[]) => {},
}

export const BuildPlaylistContext = createContext(buildPlaylistDefaultValue);