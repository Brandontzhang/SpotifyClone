import { useEffect, useState } from "react";
import { TrackPage } from "../types/PlaylistTypes";

/**
 * Returns the track page item based on playlist id provided
 * @param playlistId 
 * @returns 
 */
export const usePlaylistTracks = (playlistId? : string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [playlistTracks, setPlaylistTracks] = useState<TrackPage>();
    const [error, setError] = useState<any>();

    const fetchPlaylistData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/playlist/${playlistId}/tracks`)
            const data = await response.json();

            setIsLoading(false);
            setPlaylistTracks(data);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        if (!playlistId) {
            return;
        }

        setIsLoading(true);
        fetchPlaylistData()
    }, [playlistId]);

    return { isLoading, playlistTracks, error };
}