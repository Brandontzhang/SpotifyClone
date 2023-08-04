import { useEffect, useState } from "react";
import { PlaylistTrackObject } from "../types/TrackTypes";
import { fetchPlaylistsSavedTracks } from "../service/SpotifyApiService";

/**
 * Checks if the tracks have been saved (liked) by the user
 * @param trackItems tracks to check
 * @returns boolean array corresponding to each track item
 */
export const usePlaylistSavedTracks = (trackItems : PlaylistTrackObject[]) => {
    const [isLoading, setIsLoading] = useState(false);
    const [savedTracks, setSavedTracks] = useState<boolean[]>([]);
    const [serverError, setServerError] = useState<any>(null);

    const fetchData = async () => {
        let trackIds = trackItems.map(trackItem => trackItem.track.id);

        if (trackIds.length === 0) {
            setIsLoading(false);
            return;
        }

        try {
            const playlistSavedTracks = await fetchPlaylistsSavedTracks(trackIds);

            setSavedTracks(playlistSavedTracks);
            setIsLoading(false);
        } catch (error : any) {
            setServerError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [trackItems]);

    return {isLoading, savedTracks, serverError}
}