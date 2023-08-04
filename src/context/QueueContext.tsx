import { createContext } from "react";
import { Track } from "../types/TrackTypes";

type queueContext = {
    currentlyPlaying : Track | undefined,
    queue : Track[],
    setCurrentlyPlaying : (cP : Track) => void,
    setQueue : (t : Track[]) => void,
}

const queueDefaultValue : queueContext = {
    currentlyPlaying : {} as Track,
    queue : [],
    setCurrentlyPlaying : (newCP : Track) => {},
    setQueue : (t : Track[]) => {},
}

export const QueueContext = createContext(queueDefaultValue);