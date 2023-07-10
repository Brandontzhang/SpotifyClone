import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { PlayBar } from "./PlayBar";
import { useCallback } from "react";


export const WebPlayback = (props : any) => {

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(props.token),
        [props.token]
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
                            <div className="flex justify-center items-center">
                                <PlayBar token={props.token} initialVolume={initialVolume}/>
                            </div>
                    </WebPlaybackSDK>
                </div>
            </div>
        </>
    )

}