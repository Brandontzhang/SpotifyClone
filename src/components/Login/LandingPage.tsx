import { useEffect, useState } from "react"
import { LoginPage } from "./LoginPage";
import { TokenContext } from "../../context/TokenContext";
import { MainPage } from "../MainPage";
import { QueueContext } from "../../context/QueueContext";
import { Track } from "../../types/TrackTypes";
import { AlbumResults, ArtistResults, PlaylistResults, SearchResultsContext, TrackResults } from "../../context/SearchResultsContext";

export const LandingPage = () => {

    // Token Context
    const [token, setToken] = useState('');

    // Queue Context
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>();
    const [queue, setQueue] = useState<Track[]>([]);

    // Search Results Context
    const [tracks, setTrackResults] = useState<TrackResults>();
    const [albums, setAlbumResults] = useState<AlbumResults>();
    const [artists, setArtistResults] = useState<ArtistResults>();
    const [playlists, setPlaylistResults] = useState<PlaylistResults>();
    const [query, setQuery] = useState<string>("");
    const [searchTypes, setSearchTypes] = useState(['track', 'artist', 'album', 'playlist']);

    const searchContextValue = {
        query : query,
        tracks : tracks,
        albums : albums,
        artists : artists,
        playlists : playlists,
        searchTypes : searchTypes,

        setTrackResults : setTrackResults,
        setAlbumResults : setAlbumResults,
        setArtistResults : setArtistResults,
        setPlaylistResults : setPlaylistResults,
        setQuery : setQuery,
        setSearchTypes : setSearchTypes
    }

    const getOAuthToken = async() => {
        const response = await fetch('http://localhost:5000/auth/token');
        const json = await response.json();

        setToken(json.access_token);
    }

    useEffect(() => {
        getOAuthToken();
    }, [])

    return (
        <SearchResultsContext.Provider value={searchContextValue}>
            <QueueContext.Provider value={{currentlyPlaying : currentlyPlaying, queue : queue, setCurrentlyPlaying : setCurrentlyPlaying, setQueue : setQueue}}>
                <TokenContext.Provider value={{token : token, setToken : setToken}}>
                    <div className="bg-background300 h-screen">
                        { (token === '') ? <LoginPage /> : <MainPage />}
                    </div>
                </TokenContext.Provider>
            </QueueContext.Provider>
        </SearchResultsContext.Provider>
    )

}