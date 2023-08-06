import { useContext, useEffect, useState } from "react"
import { SearchResultsContext } from "../../context/SearchResultsContext"
import { TrackResults } from "./TrackResults";
import { ArtistResults } from "./ArtistResults";
import { AlbumResults } from "./AlbumResults";
import { PlaylistResults } from "./PlaylistResults";

export const SearchResults = () => {

    const { tracks, albums, artists, playlists } = useContext(SearchResultsContext);

    const [mode, setMode] = useState('tracks');

    useEffect(() => {
    }, [tracks, albums, artists, playlists]);

    return (
        <div className="h-[100%] overflow-y-scroll text-primary">
            <div className=" m-4 p-4">
                <span>Search Results</span>
                <div className="flex flex-row w-full justify-start items-center text-sm">
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