import { useContext } from "react";
import { Track } from "../types/TrackTypes";
import { buildRecommendations } from "../service/SpotifyApiService";
import { BuildPlaylistContext } from "../context/BuildPlaylistContext";

export const useBuildRecommendations = () => {
    const { setRecTracks } = useContext(BuildPlaylistContext);

    const buildRecs = async (seedTracks : Track[]) => {
        if (seedTracks.length === 0) {
            return;
        }

        const response = await buildRecommendations(seedTracks);
        setRecTracks(response.tracks);
    }

    return { buildRecs };
}