import { useContext, useEffect } from "react"
import { SearchResultsContext } from "../../context/SearchResultsContext"

export const SearchResults = () => {

    const { tracks, albums, artists, playlists } = useContext(SearchResultsContext);

    useEffect(() => {
    }, [tracks, albums, artists, playlists]);

    return (
        <div className="h-[100%] overflow-y-scroll">
            <div className="bg-background100 m-4 p-4">
                Search Results
                <span>Songs</span>
                <span>Artists</span>
                <span>Playlists</span>
            </div>
        </div>
    )
}