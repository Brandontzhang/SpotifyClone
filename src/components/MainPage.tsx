import { useCallback, useContext } from "react";
import { SideNav } from "./SideNav/SideNav"
import { MainContent } from "./SpotifyPlayer/MainContent"
import { TokenContext } from "../context/TokenContext";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { BrowserRouter } from "react-router-dom";


export const MainPage = () => {
    const { token } = useContext(TokenContext);

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(token),
        [token]
    );

    const initialVolume : number = 0.5;

    return (
        <BrowserRouter>
            <WebPlaybackSDK
                initialDeviceName="My Spotify App"
                getOAuthToken={getOAuthToken}
                connectOnInitialized={true}
                initialVolume={initialVolume}>
                    <div className="grid grid-cols-6 h-full">
                        <div className="col-span-1 m-2 mr-0 rounded-lg">
                            <SideNav />
                        </div>
                        <div className="col-span-5 bg-background200 m-2 rounded-lg">
                            <MainContent />
                        </div>
                    </div>            
            </WebPlaybackSDK>
        </BrowserRouter>
    )
}