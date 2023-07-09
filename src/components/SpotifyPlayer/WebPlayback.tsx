import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { SongTitle } from "./SongTitle";
import { PlayBar } from "./PlayBar";
import { useCallback } from "react";


export const WebPlayback = (props : any) => {

    const getOAuthToken : Spotify.PlayerInit["getOAuthToken"] = useCallback(
        callback => callback(props.token),
        [props.token]
    );

    return (
        <>
            <div>
                <div className="main-wrapper">
                    <WebPlaybackSDK
                        initialDeviceName="My Spotify App"
                        getOAuthToken={getOAuthToken}
                        connectOnInitialized={true}
                        initialVolume={0.5}>
                            <div className="flex justify-center items-center">
                                <PlayBar token={props.token}/>
                                {/* <SongTitle /> */}
                            </div>
                        {/* <ServerInfo /> */}
                    </WebPlaybackSDK>
                </div>
            </div>
        </>
    )

}