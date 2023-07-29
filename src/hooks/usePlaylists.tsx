import { useEffect, useState } from "react";

const usePlaylists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [playlists, setPlaylists] = useState<any>(null);
    const [serverError, setServerError] = useState<any>(null);

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:5000/playlists');
            const data = await response.json();

            setPlaylists(data);
            setIsLoading(false);
        } catch (error : any) {
            setServerError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchPlaylists();
    }, []);

    return { isLoading, playlists, serverError};
}

export default usePlaylists;