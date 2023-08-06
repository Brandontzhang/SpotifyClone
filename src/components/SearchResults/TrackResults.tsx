import { useContext, useEffect, useState } from "react";
import { SearchResultsContext } from "../../context/SearchResultsContext";
import { Track } from "../../types/TrackTypes";
import { TrackRow } from "../SpotifySong/TrackRow";
import { useQueue } from "../../hooks/useQueue";
import { play } from "../../service/SpotifyApiService";

export const TrackResults = () => {

    const { tracks } = useContext(SearchResultsContext);
    const { setRefreshQueue } = useQueue();

    const [listItems, setListItems] = useState<Track[]>([])

    useEffect(() => {
        if (tracks) {
            console.log(tracks.items);
            setListItems(tracks.items);
        }
    }, [tracks]);

    const playTrack = async (trackURI : string) => {
        await play("", [trackURI]);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    return (
        <div className="flex flex-col">
            <span>Songs</span>
            { listItems.map((track : Track, index : number) => 
                <TrackRow 
                    key={index}
                    track={track} 
                    setRefreshQueue={setRefreshQueue} 
                    playTrack={playTrack} 
                    mode={'search'}/>
            )}
        </div>
    )
}