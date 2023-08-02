import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlayListContext";
import { TrackItem } from "../../types/TrackTypes";
import { TrackRow } from "../SpotifySong/TrackRow";
import { usePlaylistSavedTracks } from "../../hooks/usePlaylistSavedTracks";

export const PlaylistView = () => {

    const { playlist } = useContext(PlaylistContext);
    const [ trackData, setTrackData ] = useState<TrackItem[]>([]);
    const { savedTracks } = usePlaylistSavedTracks(trackData);

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

    return (
        <div className="flex flex-col overflow-auto h-2/3">
            {trackData.map((trackItem : TrackItem, index : number) => 
                <TrackRow key={index} addedAt={trackItem.added_at} track={trackItem.track} saved={savedTracks.length > 0 ? savedTracks[index] : false} />
            )}
        </div>
    )
}