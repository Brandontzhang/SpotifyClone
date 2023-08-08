import { useEffect, useState } from "react";
import { getDiscoverWeekly } from "../service/SpotifyApiService";
import { Playlist } from "../types/PlaylistTypes";

export const useDiscoverWeekly = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [discoverWeekly, setDiscoverWeekly] = useState<Playlist>();
    const [serverError, setServerError] = useState<any>(null);


    const fetchData = async () => {
        try {
            const data : Playlist = await getDiscoverWeekly();

            setDiscoverWeekly(data);
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

    return { isLoading, discoverWeekly, serverError};
}