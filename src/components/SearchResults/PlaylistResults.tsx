import { useContext, useEffect, useState } from "react";
import { SearchResultsContext } from "../../context/SearchResultsContext";
import { SimplifiedPlaylistObject } from "../../types/PlaylistTypes";
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../context/PlayListContext";

export const PlaylistResults = () => {

    const { playlists } = useContext(SearchResultsContext);
    const { setPlaylist } = useContext(PlaylistContext);
    const [listItems, setListItems] = useState<SimplifiedPlaylistObject[]>([])

    useEffect(() => {
        if (playlists) {
            setListItems(playlists.items);
        }
    }, [playlists]);


    return (
        <div>
            <div className="grid grid-cols-7">
                    <div className="col-span-1"></div>
                    <span className="flex justify-start items-center col-span-4">Name</span>
                    <span className="col-span-1"># Tracks</span>
                    <span className="col-span-1">Created By</span>
            </div>
            { listItems.map(playlist => 
                <Link  onClick={() => setPlaylist(playlist)} to={`../playlist/${playlist.id}`}>
                    <div className="grid grid-cols-7 bg-background100 m-4 p-4 rounded-lg">
                        <div className="col-span-1"><img className="h-14 w-14 rounded-lg" src={playlist.images[0].url} /></div>
                        <span className="flex justify-start items-center col-span-4">{playlist.name}</span>
                        <span className="col-span-1 flex justify-start items-center">{playlist.tracks.total}</span>
                        <span className="col-span-1 flex justify-start items-center">{playlist.owner.display_name}</span>
                    </div>
                </Link>
            )}
        </div>
    )
}