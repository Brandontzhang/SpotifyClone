import { useEffect, useState } from "react";
import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export const useQueue = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [queueData, setQueueData] = useState<any>(); // Type of TrackObject or EpisodeObject
    const [error, setError] = useState<any>();

    const playbackState = usePlaybackState(true, 100);
    const player = useSpotifyPlayer();

    const fetchQueue = async () => {
        try {
            const response = await fetch(`http://localhost:5000/me/player/queue`);
            const data = await response.json();

            console.log(data);

            setIsLoading(false);
            setQueueData(data);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }

    }

    // Initial fetch on the page load
    useEffect(() => {
        setIsLoading(true);
        fetchQueue();
    }, []);

    // TODO: Currently querying every instant, change to query only when song is changed
    useEffect(() => {
        setIsLoading(true);
        fetchQueue();
    }, [playbackState?.context.metadata?.current_item.uid])
    
    return { isLoading, queueData, error };
}