import { useEffect, useState } from "react";
import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { fetchQueue } from "../service/SpotifyApiService";

export const useQueue = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [queueData, setQueueData] = useState<any>(); // Type of TrackObject or EpisodeObject
    const [error, setError] = useState<any>();

    const playbackState = usePlaybackState(true, 100);
    const player = useSpotifyPlayer();

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
        setIsLoading(true);
        fetchData();
    }, []);

    // TODO: Currently querying every instant, change to query only when song is changed
    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [playbackState?.context.metadata?.current_item.uid])
    
    return { isLoading, queueData, error };
}