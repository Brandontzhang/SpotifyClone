import { PlayBar } from "./PlayBar";
import Playlists from "../SpotifyPlaylist/Playlists";
import { Routes, Route } from "react-router-dom";
import { PlaylistView } from "../SpotifyPlaylist/PlaylistView";
import { PlaylistContext } from "../../context/PlayListContext";
import { Playlist, SimplifiedPlaylistObject } from "../../types/PlaylistTypes";
import { useState } from "react";
import { SearchResults } from "../SearchResults/SearchResults";
import { LikedSongs } from "../SpotifyPlaylist/LikedSongs/LikedSongs";
import { RecommendationsList } from "../SpotifyPlaylist/Recommendations/RecommendationsList";
import { Navbar } from "./Navbar";

export const MainContent = () => {
    const [playlist, setPlaylist] = useState<Playlist | SimplifiedPlaylistObject>({} as Playlist);
    
    return (
        <div className="h-full flex-col justify-between">
            <Navbar />

            <div className="h-[68vh] m-4">
                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                        <Routes>
                            <Route path="/" element={<Playlists/>} />
                            <Route path="/search/:query" element={<SearchResults />} />
                            <Route path="/playlist/:playlistId" element={<PlaylistView />} />
                            <Route path="/playlist/likedsongs" element={<LikedSongs />} />
                            <Route path="/recommendations" element={<RecommendationsList />} />
                        </Routes>
                </PlaylistContext.Provider>
            </div>

            <div className="flex justify-center items-center h-[20vh]">
                <PlayBar />
            </div>
        </div>
    )

}