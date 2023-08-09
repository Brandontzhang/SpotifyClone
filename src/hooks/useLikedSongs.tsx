import { useEffect, useState } from "react";
import { getLikedSongs } from "../service/SpotifyApiService";
import { TrackPage } from "../types/PlaylistTypes";

export const useLikedSongs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [likedSongs, setLikedSongs] = useState<TrackPage>();
    const [serverError, setServerError] = useState<any>(null);
    const [offset, setOffset] = useState(0);

    const fetchData = async () => {
        try {
            const newData : TrackPage = await getLikedSongs(offset);
            setLikedSongs(prevLikedSongs => {

                if (!prevLikedSongs) {
                    return newData;
                }

                let combinedLikedSongs = {
                    ...prevLikedSongs,
                    next : newData.next,
                    offset : newData.offset,
                    previous : newData.previous,
                    items : [
                        ...prevLikedSongs.items,
                        ...newData.items
                    ]
                }

                return combinedLikedSongs;
            });
            setIsLoading(false);
        } catch (error : any) {
            setServerError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [offset]);

    return { isLoading, likedSongs, serverError, setOffset};
}