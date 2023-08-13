import { useContext, useMemo } from "react"
import { BuildPlaylistContext } from "../../../context/BuildPlaylistContext"
import { Track } from "../../../types/TrackTypes";
import { TrackRow } from "../../SpotifySong/TrackRow";
import { play } from "../../../service/SpotifyApiService";
import { useQueue } from "../../../hooks/useQueue";


export const RecommendationsList = () => {

    const { recTracks } = useContext(BuildPlaylistContext);
    const { setRefreshQueue } = useQueue();
    
    const playTrack = async (trackURI : string) => {
        await play("", recTracks?.map(track => track.uri), trackURI);
        setRefreshQueue((refresh : boolean) => !refresh);
    }

    const tracks = useMemo(() => {
        return (
            <div className="max-h-full overflow-y-scroll">
                <div className="flex flex-col">
                    {
                        recTracks.map((track : Track, index : number) => 
                            <TrackRow 
                                key={index}
                                track={track}
                                saved={false}
                                playTrack={playTrack}
                                setRefreshQueue={setRefreshQueue}
                            />
                        )
                    }
                </div>
            </div>
        )
    }, [recTracks]);

    return tracks
}