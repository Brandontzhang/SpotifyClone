import { useEffect, useState } from "react"
import { LoginPage } from "./LoginPage";
import { TokenContext } from "../../context/TokenContext";
import { MainPage } from "../MainPage";
import { QueueContext } from "../../context/QueueContext";
import { Track } from "../../types/TrackTypes";
import { AlbumResults, ArtistResults, PlaylistResults, SearchResultsContext, TrackResults } from "../../context/SearchResultsContext";
import { BuildPlaylistContext } from "../../context/BuildPlaylistContext";

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

    // Build Playlist context
    const [recTracks, setRecTracks] = useState<Track[]>([]);
    const [seedTracks, setSeedTracks] = useState<Track[]>([]);
    const setSeedTracksLessThanSeedLimit = (newTracks : Track[]) => {
        let limit : number = 5; // Spotify limits number of seed tracks
        setSeedTracks(tracks => {
            if (tracks.length + newTracks.length <= limit) {
                return [...tracks, ...newTracks];
            } else {
                if (newTracks.length > limit) {
                    return newTracks.slice(limit * -1);
                } else {
                    return [...tracks.slice((newTracks.length + tracks.length) - limit), ...newTracks];
                }
            }
        })
    }

    const buildPlaylistContextValue = {
        seedTracks : seedTracks, 
        recTracks : recTracks,
        setSeedTracks : setSeedTracksLessThanSeedLimit,
        setRecTracks : setRecTracks
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
        <BuildPlaylistContext.Provider value={buildPlaylistContextValue}>
            <SearchResultsContext.Provider value={searchContextValue}>
                <QueueContext.Provider value={{currentlyPlaying : currentlyPlaying, queue : queue, setCurrentlyPlaying : setCurrentlyPlaying, setQueue : setQueue}}>
                    <TokenContext.Provider value={{token : token, setToken : setToken}}>
                        <div className="bg-background300 h-screen">
                            { (token === '') ? <LoginPage /> : <MainPage />}
                        </div>
                    </TokenContext.Provider>
                </QueueContext.Provider>
            </SearchResultsContext.Provider>
        </BuildPlaylistContext.Provider>
    )

}