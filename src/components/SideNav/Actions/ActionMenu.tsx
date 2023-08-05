import { useContext, useEffect, useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai"
import { BiSearch, BiSolidSearch } from "react-icons/bi"
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { search } from "../../../service/SpotifyApiService";
import { Link, useNavigate } from "react-router-dom";
import { SearchResultsContext } from "../../../context/SearchResultsContext";

export const ActionMenu = () => {

    // For setting the focus on the search bar
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchFocus, setSearchFocus] = useState(false);
    const ref = useOutsideClick(() => setSearchFocus(false));

    // Data to be sent as search params
    const [query, setQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState(['track']);

    const { setTrackResults, setAlbumResults, setArtistResults, setPlaylistResults } = useContext(SearchResultsContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchFocus) {
            searchRef.current?.focus()
        }
    }, [searchFocus]);

    const sendQuery = async (event : any) => {
        event.preventDefault();

        // Process query
        const searchResults = await search(query, selectedTypes);
        processResults(searchResults);

        // Set focus of bar
        searchRef?.current?.blur();
        setSearchFocus(false);
        
        navigate("/search");
    }

    const processResults = (searchResults : any) => {
        setTrackResults(searchResults.tracks);
        setAlbumResults(searchResults.albums);
        setArtistResults(searchResults.artists);
        setPlaylistResults(searchResults.playlists);
    }

    const toggleSelectedTypes = (event : any, type : string) => {
        event.preventDefault();
        if (selectedTypes.includes(type)) {
            setSelectedTypes(sT => sT.filter(t => t != type));
        } else {
            setSelectedTypes(sT => [...sT, type]);
        }
    }

    return (
        <div className="flex justify-center h-full">
            <div className="flex flex-col justify-around h-full text-primary text-xl w-11/12">
                <div className="flex flex-row items-center text-2xl hover:text-highlight hover:cursor-pointer">
                    <span className="pl-2"><AiFillHome /></span>
                    <span className="pl-2"><Link to={'/'}>Home</Link></span>
                </div>
                <div>
                    <form onSubmit={(event) => {sendQuery(event)}}>
                        <div ref={ref} className={`flex flex-row bg-background100 rounded-lg ${searchFocus ? "border border-highlight" : ""}`} onClick={() => setSearchFocus(true)}>
                            <span className="text-2xl pt-2 px-2">{!searchFocus ? <BiSearch/> : <span className="text-highlight"><BiSolidSearch/></span>}</span>
                            <input ref={searchRef} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-lg bg-background100 p-1 hover:cursor-pointer focus:outline-none"></input>
                        </div>
                    </form>
                    <div className="flex flex-row w-full justify-start items-center text-sm">
                        <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${selectedTypes.includes('album') ? 'text-highlight' : ""}`} onClick={(e) => toggleSelectedTypes(e, 'album')}>Album</button>
                        <button className={`mt-4 mr-2 px-4 bg-background100 rounded-3xl ${selectedTypes.includes('artist') ? 'text-highlight' : ""}`} onClick={(e) => toggleSelectedTypes(e, 'artist')}>Artist</button>
                        <button className={`mt-4 mx-2 px-4 bg-background100 rounded-3xl ${selectedTypes.includes('playlist') ? 'text-highlight' : ""}`} onClick={(e) => toggleSelectedTypes(e, 'playlist')}>Playlist</button>
                    </div>
                </div>
            </div>
        </div>
    )
}