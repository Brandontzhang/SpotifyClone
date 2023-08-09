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
            setListItems(tracks.items);
        }
    }, [tracks]);

    const playTrack = async (trackURI : string) => {
        await play("", [trackURI]);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    return (
        <div className="h-[55vh] xl:h-[60vh] overflow-y-scroll flex flex-col">
            <div className="grid grid-cols-10 mx-2 px-8">
                <div className="col-span-4">
                    Name / Artist
                </div>
                <div className="col-span-2 pl">
                    Album
                </div>
                <div className="col-span-3"></div>
                <div className="flex col-span-1 items-center justify-center">
                    Duration
                </div>

            </div>
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