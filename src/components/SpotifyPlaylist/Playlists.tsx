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
    const [greeting, setGreeting] = useState("Good Morning");

    useEffect(() => {
        if (data) {
            setPlaylists(data.items);
        }
    }, [data])

    useEffect(() => {
        let time = new Date();
        let hours = time.getHours();

        if (hours < 12) {
            setGreeting("Good Morning");
        } else if (hours < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, [])

    return (
        <div className="h-[100%] overflow-y-scroll">
            <div>
                <span className="text-primary p-4 text-3xl">{greeting}</span>
                <div className="grid grid-cols-4"> 
                    <div className={`${isLoading} load`}>
                        <PlaylistCard playlist={discoverWeekly}/>
                    </div>
                    <div>
                        {isLoading ? <PlaylistCard playlist={discoverWeekly}/> : <LikedSongsPlaylistCard />}
                    </div>
                </div>
            </div>
            
            <div>
                <span className="text-primary p-4 text-3xl">Your Playlists</span>
                <div className="grid grid-cols-4">
                    { playlists?.map((pl : Playlist) => 
                        <PlaylistCard key={pl.snapshot_id} playlist={pl} />
                    ) }
                </div>
            </div>   
        </div>
    )
}

export default Playlists;