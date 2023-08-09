import { useContext, useEffect, useState } from "react";
import { PlaylistContext } from "../../context/PlayListContext";
import { PlaylistTrackObject } from "../../types/TrackTypes";
import { TrackRow } from "../SpotifySong/TrackRow";
import { usePlaylistSavedTracks } from "../../hooks/usePlaylistSavedTracks";
import { usePlaylistTracks } from "../../hooks/usePlaylistTracks";
import { useParams } from "react-router-dom";
import { useQueue } from "../../hooks/useQueue";
import { play } from "../../service/SpotifyApiService";
import { LoadingSpinner } from "../../assets/LoadingSpinner";

export const PlaylistView = () => {

    const { playlist } = useContext(PlaylistContext);
    const params = useParams();

    const [playlistId, setPlaylistId] = useState<string>();
    const [ trackData, setTrackData ] = useState<PlaylistTrackObject[]>([]);
    const { savedTracks } = usePlaylistSavedTracks(trackData);
    const { playlistTracks, setOffset, isLoading } = usePlaylistTracks(playlistId);
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

    const handleScroll = (event : any) => {
        const target = event.target;
        
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setOffset(offset => offset + 20);
        }
    }

    return (
        <div className="max-h-full overflow-y-scroll" onScroll={handleScroll}>
            <div className="flex flex-col">
                {trackData.map((trackItem : PlaylistTrackObject, index : number) => 
                    <TrackRow 
                        key={index} 
                        addedAt={trackItem.added_at} 
                        track={trackItem.track} 
                        saved={savedTracks.length > 0 ? savedTracks[index] : false} 
                        setRefreshQueue={setRefreshQueue} 
                        playTrack={playTrack} 
                        mode={'playlist'}/>
                )}
                <div className={`flex justify-center items-center ${isLoading ? "m-4" : ""}`}>
                    {isLoading ? <LoadingSpinner /> : <></>}
                </div>
            </div>
        </div>
    )
}