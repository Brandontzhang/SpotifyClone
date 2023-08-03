import { PlayBar } from "./PlayBar";
import Playlists from "../SpotifyPlaylist/Playlists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaylistView } from "../SpotifyPlaylist/PlaylistView";
import { PlaylistContext } from "../../context/PlayListContext";
import { Playlist } from "../../types/PlaylistTypes";
import { useState } from "react";

export const MainContent = (props : any) => {

    const [playlist, setPlaylist] = useState<Playlist>({} as Playlist);
    const initialVolume = props.initialvolume;
    
    return (
        <div className="h-full">
            <div className="h-[80%] max-h-[70vh]">
                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                    <BrowserRouter>
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
                    </BrowserRouter>
                </PlaylistContext.Provider>
            </div>
            <div className="flex justify-center items-center pt-20 h-[18%]">
                <PlayBar initialVolume={initialVolume}/>
            </div>
        </div>
    )

}