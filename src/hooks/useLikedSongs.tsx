import { useEffect, useState } from "react";
import { getLikedSongs } from "../service/SpotifyApiService";
import { TrackPage } from "../types/PlaylistTypes";

export const useLikedSongs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [likedSongs, setLikedSongs] = useState<TrackPage>();
    const [serverError, setServerError] = useState<any>(null);


    const fetchData = async () => {
        try {
            const data : TrackPage = await getLikedSongs();

            setLikedSongs(data);
            setIsLoading(false);
        } catch (error : any) {
            setServerError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, []);

    return { isLoading, likedSongs, serverError};
}