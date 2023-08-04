import { useEffect, useState } from "react";
import { TrackPage } from "../types/PlaylistTypes";
import { fetchPlaylistData } from "../service/SpotifyApiService";

/**
 * Returns the track page item based on playlist id provided
 * @param playlistId 
 * @returns 
 */
export const usePlaylistTracks = (playlistId? : string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [playlistTracks, setPlaylistTracks] = useState<TrackPage>();
    const [error, setError] = useState<any>();

    const fetchData = async () => {
        if (!playlistId) {
            return;
        }

        try {
            const trackPage = await fetchPlaylistData(playlistId);

            setIsLoading(false);
            setPlaylistTracks(trackPage);
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData()
    }, [playlistId]);

    return { isLoading, playlistTracks, error };
}