import { useQueue } from "../../../hooks/useQueue";
import { useLikedSongs } from "../../../hooks/useLikedSongs";
import { play } from "../../../service/SpotifyApiService";
import { PlaylistTrackObject } from "../../../types/TrackTypes";
import { TrackRow } from "../../SpotifySong/TrackRow";
import { useEffect } from "react";

export const LikedSongs = () => {

    const { setRefreshQueue } = useQueue();
    const { likedSongs, setOffset } = useLikedSongs();

    const playTrack = async (trackURI : string) => {
        await play("", likedSongs?.items.map(trackObject => trackObject.track.uri), trackURI);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    const handleScroll = (event : any) => {
        const target = event.target;
        
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setOffset(offset => offset + 20);
        }
    }

    useEffect(() => {

    }, [likedSongs]);

    return (
        <div className="max-h-full overflow-y-scroll" onScroll={handleScroll}>
            <div className="flex flex-col">
                { likedSongs?.items.map((trackItem : PlaylistTrackObject, index : number) => 
                    <TrackRow 
                    key={index} 
                    addedAt={trackItem.added_at} 
                    track={trackItem.track} 
                    saved={true} 
                    setRefreshQueue={setRefreshQueue} 
                    playTrack={playTrack} 
                    mode={'playlist'}/>
                ) }
            
            </div>
        </div>
    )
}