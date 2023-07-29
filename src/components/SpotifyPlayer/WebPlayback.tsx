import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { PlayBar } from "./PlayBar";
import { useCallback, useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Playlists from "../SpotifyPlaylist/Playlists";


export const WebPlayback = () => {
    const { token } = useContext(TokenContext);

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(token),
        [token]
    );

    const initialVolume = 0.5;

    return (
        <>
            <div>
                <div className="main-wrapper">
                    <WebPlaybackSDK
                        initialDeviceName="My Spotify App"
                        getOAuthToken={getOAuthToken}
                        connectOnInitialized={true}
                        initialVolume={initialVolume}>
                            <Playlists/>
                            <div className="flex justify-center items-center">
                                <PlayBar initialVolume={initialVolume}/>
                            </div>
                    </WebPlaybackSDK>
                </div>
            </div>
        </>
    )

}