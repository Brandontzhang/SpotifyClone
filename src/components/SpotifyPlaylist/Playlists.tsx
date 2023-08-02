import usePlaylists from "../../hooks/usePlaylists"
import { PlaylistCard } from "./PlaylistCard";
import { Playlist } from "../../types/PlaylistTypes";
import { useEffect, useState } from "react";

const Playlists = () => {
    const { data }= usePlaylists();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        if (data) {
            setPlaylists(data.items);
        }
    }, [data])

    return (
        <div className="max-h-full overflow-y-scroll">
            <div className="grid grid-cols-4">
                { playlists.map((pl : Playlist) => 
                    <PlaylistCard key={pl.snapshot_id} playlist={pl} />
                ) }
                { playlists.map((pl : Playlist) => 
                    <PlaylistCard key={pl.snapshot_id} playlist={pl} />
                ) }
            </div>
        </div>
    )
}

export default Playlists;