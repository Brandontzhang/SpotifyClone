import { useEffect, useState } from "react";
import { useErrorState, usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";

export const TogglePlay = (props : any) => {

    const webPlaybackSDKReady = useWebPlaybackSDKReady();

    const player = useSpotifyPlayer();


    const [deviceName, setDeviceName] = useState("Spotify Device");

    const SPOTIFY_URI = "spotify:track:7xGfFoTpQ2E7fRF5lN10tr";


    const playbackState = usePlaybackState(true, 100);
    const playerDevice = usePlayerDevice();
    const errorState = useErrorState();

    useEffect(() => {
      if (playerDevice?.device_id === undefined) return;

      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({ device_ids: [playerDevice.device_id], play: false }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });
    }, [playerDevice?.device_id]);

    
    if (!webPlaybackSDKReady || !player) return <div>Loading...</div>;

    return(
        <div>
            <button onClick={() => player.togglePlay()}>Toggle Play</button>
            <button onClick={() => player.pause()}>pause</button>
            <button onClick={() => player.resume()}>resume</button>
        </div>
    )
}