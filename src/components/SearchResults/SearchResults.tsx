import { useContext, useEffect, useState } from "react"
import { SearchResultsContext } from "../../context/SearchResultsContext"
import { TrackResults } from "./TrackResults";
import { ArtistResults } from "./ArtistResults";
import { AlbumResults } from "./AlbumResults";
import { PlaylistResults } from "./PlaylistResults";
import { useNavigate } from "react-router-dom";

export const SearchResults = () => {

    const { tracks } = useContext(SearchResultsContext);

    const [mode, setMode] = useState('tracks');
    const navigate = useNavigate();

    useEffect(() => {
        if (!tracks) {
            navigate("/");
        }
    }, [tracks]);

    return (
        <div className="h-[100%] overflow-y-hidden text-primary">
            <div className=" m-4 p-4">
                <span className="ml-7 text-2xl">Search Results</span>
                <div className="flex flex-row w-full justify-start items-center text-sm m-4 ml-6 sticky">
                    <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${mode === 'top' ? 'text-highlight' : ""}`} onClick={() => setMode('top')}>Top</button>
                    <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${mode === 'tracks' ? 'text-highlight' : ""}`} onClick={() => setMode('tracks')}>Songs</button>
                    <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${mode === 'albums' ? 'text-highlight' : ""}`} onClick={() => setMode('albums')}>Album</button>
                    <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${mode === 'artists' ? 'text-highlight' : ""}`} onClick={() => setMode('artists')}>Artist</button>
                    <button className={`mt-4 mx-2 px-4 bg-background100 rounded-3xl ${mode === 'playlists' ? 'text-highlight' : ""}`} onClick={() => setMode('playlists')}>Playlist</button>
                </div>
                <div className="m-4">
                    {
                        mode === 'tracks' ? <TrackResults /> :
                        mode === 'artists' ? <ArtistResults /> :
                        mode === 'albums' ? <AlbumResults /> :
                        mode === 'playlists' ? <PlaylistResults /> : <span>No results</span>
                    }
                </div>
            </div>
        </div>
    )
}