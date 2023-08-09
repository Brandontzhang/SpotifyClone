import usePlaylists from "../../hooks/usePlaylists"
import { PlaylistCard } from "./PlaylistCard";
import { Playlist } from "../../types/PlaylistTypes";
import { useEffect, useState } from "react";
import { useDiscoverWeekly } from "../../hooks/useDiscoverWeekly";
import { LikedSongsPlaylistCard } from "./LikedSongs/LikedSongsPlaylistCard";

const Playlists = () => {
    const { data }= usePlaylists();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const { discoverWeekly, isLoading } = useDiscoverWeekly();

    useEffect(() => {
        if (data) {
            setPlaylists(data.items);
        }
    }, [data])

    return (
        <div className="h-[100%] overflow-y-scroll">
            <div className="grid grid-cols-4"> 
                <div className={`${isLoading} load`}>
                    <PlaylistCard playlist={discoverWeekly}/>
                </div>
                <div>
                    {isLoading ? <PlaylistCard playlist={discoverWeekly}/> : <LikedSongsPlaylistCard />}
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