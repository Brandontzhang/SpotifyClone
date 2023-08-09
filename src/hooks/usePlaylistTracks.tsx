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
    const [offset, setOffset] = useState(0);

    const fetchData = async () => {
        if (!playlistId) {
            return;
        }

        try {
            const trackPage = await fetchPlaylistData(playlistId, offset);

            setIsLoading(false);
            if (trackPage.items.length === 0) {
                setOffset(-1);
                return;
            }
            setPlaylistTracks(prevTrackPage => {
                if (!prevTrackPage) {
                    return trackPage;
                }

                let combinedTrackPage = {
                    ...prevTrackPage,
                    next: trackPage.next,
                    offset : trackPage.offset,
                    previous : trackPage.previous,
                    items : [
                        ...prevTrackPage.items,
                        ...trackPage.items
                    ]
                }

                return combinedTrackPage;
            })

        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        if (offset === -1) {
            return;
        }
        setIsLoading(true);
        fetchData()
    }, [playlistId, offset]);

    return { isLoading, playlistTracks, error, setOffset };
}