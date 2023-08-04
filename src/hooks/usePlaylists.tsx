import { useEffect, useState } from "react";
import { Playlist } from "../types/PlaylistTypes";
import { fetchPlaylists } from "../service/SpotifyApiService";

const usePlaylists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [serverError, setServerError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const playlistData : Playlist[] = await fetchPlaylists();

            setData(playlistData);
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

    return { isLoading, data, serverError};
}

export default usePlaylists;