import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { PlayBar } from "./PlayBar";
import { useCallback, useContext, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import Playlists from "../SpotifyPlaylist/Playlists";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaylistView } from "../SpotifyPlaylist/PlaylistView";
import { PlaylistContext } from "../../context/PlayListContext";
import { Playlist } from "../../types/PlaylistTypes";


export const WebPlayback = () => {
    const { token } = useContext(TokenContext);
    const [playlist, setPlaylist] = useState<Playlist>({} as Playlist);

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(token),
        [token]
    );

    const initialVolume = 0.5;

    return (
        <>
            <div className="h-full">
                <WebPlaybackSDK
                    initialDeviceName="My Spotify App"
                    getOAuthToken={getOAuthToken}
                    connectOnInitialized={true}
                    initialVolume={initialVolume}>
                        <div className="h-full">
                            <div className="h-2/3 overflow-auto">
                                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path="/" element={
                                                <Playlists/>
                                            }>
                                            </Route>
                                            <Route path="/playlist/:playlistID" element={
                                                <PlaylistView />
                                            }>
                                            </Route>
                                        </Routes>
                                    </BrowserRouter>
                                </PlaylistContext.Provider>
                            </div>
                            <div className="flex justify-center items-center h-1/3">
                                <PlayBar initialVolume={initialVolume}/>
                            </div>
                        </div>
                </WebPlaybackSDK>
            </div>
        </>
    )

}