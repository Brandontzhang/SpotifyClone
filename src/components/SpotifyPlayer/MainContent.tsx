import { PlayBar } from "./PlayBar";
import Playlists from "../SpotifyPlaylist/Playlists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaylistView } from "../SpotifyPlaylist/PlaylistView";
import { PlaylistContext } from "../../context/PlayListContext";
import { Playlist } from "../../types/PlaylistTypes";
import { useState } from "react";

export const MainContent = () => {

    const [playlist, setPlaylist] = useState<Playlist>({} as Playlist);
    
    return (
        <div className="h-full flex-col justify-between">
            <div className="h-[80%] max-h-[70vh]">
                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                        <Routes>
                            <Route path="/" element={
                                <Playlists/>
                            }>
                            </Route>
                            <Route path="/playlist/:playlistId" element={
                                <PlaylistView />
                            }>
                            </Route>
                        </Routes>
                </PlaylistContext.Provider>
            </div>
            <div className="flex justify-center items-center h-[28%]">
                <PlayBar />
            </div>
        </div>
    )

}