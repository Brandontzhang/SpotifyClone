import usePlaylists from "../../hooks/usePlaylists"
import { PlaylistCard } from "./PlaylistCard";
import { Playlist } from "../../types/PlaylistTypes";
import { useEffect, useState } from "react";
import { useDiscoverWeekly } from "../../hooks/useDiscoverWeekly";

const Playlists = () => {
    const { data }= usePlaylists();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const { discoverWeekly } = useDiscoverWeekly();

    useEffect(() => {
        if (data) {
            setPlaylists(data.items);
        }
    }, [data])



    return (
        <div className="h-[100%] overflow-y-scroll">
            <div className="grid grid-cols-4"> 
                <div>
                    {discoverWeekly ? <PlaylistCard playlist={discoverWeekly}/> : <></>}
                </div>
            </div>
            <div className="grid grid-cols-4">
                { playlists.map((pl : Playlist) => 
                    <PlaylistCard key={pl.snapshot_id} playlist={pl} />
                ) }
            </div>
        </div>
    )
}

export default Playlists;