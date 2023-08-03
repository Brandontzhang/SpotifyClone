import { useEffect, useState } from "react";
import { PlaylistTrackObject } from "../types/TrackTypes";

/**
 * Checks if the tracks have been saved (liked) by the user
 * @param trackItems tracks to check
 * @returns boolean array corresponding to each track item
 */
export const usePlaylistSavedTracks = (trackItems : PlaylistTrackObject[]) => {
    const [isLoading, setIsLoading] = useState(false);
    const [savedTracks, setSavedTracks] = useState<boolean[]>([]);
    const [serverError, setServerError] = useState<any>(null);

    const fetchPlaylistSavedTracks = async () => {
        let trackIds = trackItems.map(trackItem => trackItem.track.id);

        if (trackIds.length === 0) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/me/playlist/contains', {
                method : "POST",
                mode: "cors", 
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(trackIds)
            });
            const data = await response.json();

            setSavedTracks(data);
            setIsLoading(false);
        } catch (error : any) {
            setServerError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPlaylistSavedTracks();
    }, [trackItems]);

    return {isLoading, savedTracks, serverError}
}