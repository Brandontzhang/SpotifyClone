import { useEffect, useState } from "react";

const usePlaylists = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [serverError, setServerError] = useState<any>(null);

    const fetchPlaylists = async () => {
        try {
            const response = await fetch('http://localhost:5000/playlists');
            const data = await response.json();

            setData(data);
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

    return { isLoading, data, serverError};
}

export default usePlaylists;