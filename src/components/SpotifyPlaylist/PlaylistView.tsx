import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlayListContext";
import { Track, TrackItem } from "../../types/TrackTypes";

export const PlaylistView = () => {

    const { playlist } = useContext(PlaylistContext);

    const [trackData, setTrackData] = useState<TrackItem[]>([]);

    const fetchTracks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/playlist/${playlist.id}/tracks`)
            const data = await response.json();


            setTrackData(data.items);
        } catch (error : any) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTracks();
    }, []);

    const play = (songId : string) => {
        // The player doesn't support... will need to use the api to do this.
    }

    return (
        <div>
            {trackData.map((trackItem : TrackItem) => 
                <span onClick={() => play(trackItem.track.id)} key={trackItem.track.id} className="text-primary">{trackItem.track.name}</span>
            )}
        </div>
    )
}