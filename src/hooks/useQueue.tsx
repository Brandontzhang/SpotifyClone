import { useEffect, useState } from "react";
import { usePlaybackState, usePlayerDevice } from "react-spotify-web-playback-sdk";
import { fetchQueue } from "../service/SpotifyApiService";

export const useQueue = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [queueData, setQueueData] = useState<any>(); // Type of TrackObject or EpisodeObject
    const [error, setError] = useState<any>();

    const playbackState = usePlaybackState(true, 100);
    const playerDevice = usePlayerDevice();

    const fetchData = async () => {
        try {
            const queue = await fetchQueue();

            setIsLoading(false);
            setQueueData(queue);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }

    }

    // Initial fetch on the page load
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            fetchData()
        }, 500);
    }, []);

    // TODO: I NEED TO FIND WHAT THIS DEPENDS ONNNN
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            fetchData()
        }, 100);
    }, [playerDevice, playbackState?.paused, playbackState?.playback_id])
    
    return { isLoading, queueData, error };
}