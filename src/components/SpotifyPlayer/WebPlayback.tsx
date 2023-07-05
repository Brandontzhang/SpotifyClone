import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { SongTitle } from "./SongTitle";
import { TogglePlay } from "./TogglePlay";
import { useCallback } from "react";


export const WebPlayback = (props : any) => {

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(props.token),
        [props.token]
    );

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <WebPlaybackSDK
                        initialDeviceName="My Spotify App"
                        getOAuthToken={getOAuthToken}
                        connectOnInitialized={true}
                        initialVolume={0.5}>
                        <TogglePlay token={props.token}/>
                        <SongTitle />
                        {/* <ServerInfo /> */}
                    </WebPlaybackSDK>
                </div>
            </div>
        </>
    )

}