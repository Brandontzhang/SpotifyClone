import { createContext } from "react";
import { Track } from "../types/TrackTypes";

type buildPlaylistContext = {
    mode : string;
    setMode : (newMode : string) => void;

    seedTracks : Track[];
    setSeedTracks : (newTracks : Track[]) => void;
    removeSeedTracks : (newTracks : Track[]) => void,

    recTracks : Track[];
    setRecTracks : (newRecTracks : Track[]) => void;
}

const buildPlaylistDefaultValue : buildPlaylistContext = {
    mode : 'queue',
    setMode : (_newMode : string) => {},

    seedTracks : [],
    setSeedTracks : (_newTracks : Track[]) => {},
    removeSeedTracks : (_removeTracks : Track[]) => {},

    recTracks : [],
    setRecTracks : (_newRecTracks : Track[]) => {},
}

export const BuildPlaylistContext = createContext(buildPlaylistDefaultValue);