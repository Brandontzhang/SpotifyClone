import { useContext, useEffect, useState } from "react";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import { fetchQueue } from "../service/SpotifyApiService";
import { QueueContext } from "../context/QueueContext";

export const useQueue = () => {

    const { setCurrentlyPlaying, setQueue } = useContext(QueueContext);

    const [isLoading, setIsLoading] = useState(false);
    const [queueData, setQueueData] = useState<any>(); // Type of TrackObject or EpisodeObject
    const [error, setError] = useState<any>();

    const playbackState = usePlaybackState(true, 100);

    const [refreshQueue, setRefreshQueue] = useState(true);

    const fetchData = async () => {
        try {
            const queueData = await fetchQueue();

            setIsLoading(false);
            setQueueData(queueData);
            setCurrentlyPlaying(queueData.currently_playing);
            setQueue(queueData.queue);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
            fetchData()
        }, 100);
    }, [playbackState?.paused, playbackState?.playback_id, refreshQueue]);
    
    return { isLoading, queueData, error, setRefreshQueue };
}