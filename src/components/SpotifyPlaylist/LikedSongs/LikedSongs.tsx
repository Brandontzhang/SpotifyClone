import { useEffect } from "react";
import { useQueue } from "../../../hooks/useQueue";
import { useLikedSongs } from "../../../hooks/useLikedSongs";
import { play } from "../../../service/SpotifyApiService";
import { PlaylistTrackObject, Track } from "../../../types/TrackTypes";
import { TrackRow } from "../../SpotifySong/TrackRow";

export const LikedSongs = () => {

    const { setRefreshQueue } = useQueue();
    const { likedSongs } = useLikedSongs();

    const playTrack = async (trackURI : string) => {
        await play("", likedSongs?.items.map(trackObject => trackObject.track.uri), trackURI);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    return (
        <div className="max-h-full overflow-y-scroll">
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