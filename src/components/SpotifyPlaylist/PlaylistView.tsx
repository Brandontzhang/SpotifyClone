import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlayListContext";
import { PlaylistTrackObject } from "../../types/TrackTypes";
import { TrackRow } from "../SpotifySong/TrackRow";
import { usePlaylistSavedTracks } from "../../hooks/usePlaylistSavedTracks";
import { usePlaylistTracks } from "../../hooks/usePlaylistTracks";
import { useParams } from "react-router-dom";
import { useQueue } from "../../hooks/useQueue";
import { play } from "../../service/SpotifyApiService";

export const PlaylistView = () => {

    const { playlist } = useContext(PlaylistContext);
    const params = useParams();

    const [playlistId, setPlaylistId] = useState<string>();
    const [ trackData, setTrackData ] = useState<PlaylistTrackObject[]>([]);
    const { savedTracks } = usePlaylistSavedTracks(trackData);
    const { playlistTracks } = usePlaylistTracks(playlistId);
    const { setRefreshQueue } = useQueue();

    useEffect(() => {
        if (!playlist.id) {
            setPlaylistId(params.playlistId);
        } else {
            setPlaylistId(playlist.id);
        }
    }, []);

    useEffect(() => {
        if (playlistTracks) {
            setTrackData(playlistTracks.items);
        }
    }, [playlistTracks]);

    const playTrack = async (trackURI : string) => {
        await play(playlist.uri, playlistTracks?.items.map(trackObject => trackObject.track.uri), trackURI);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    return (
        <div className="max-h-full overflow-y-scroll">
            <div className="flex flex-col">
                {trackData.map((trackItem : PlaylistTrackObject, index : number) => 
                    <TrackRow 
                        key={index} 
                        addedAt={trackItem.added_at} 
                        track={trackItem.track} 
                        saved={savedTracks.length > 0 ? savedTracks[index] : false} 
                        setRefreshQueue={setRefreshQueue} 
                        playTrack={playTrack} />
                )}
            </div>
        </div>
    )
}