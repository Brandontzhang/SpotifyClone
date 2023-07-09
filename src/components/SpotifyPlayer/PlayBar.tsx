import { useEffect } from "react";
import { useErrorState, usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";
import { CiPlay1 } from 'react-icons/ci/index';
import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx/index';


export const PlayBar = (props : any) => {

    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const player = useSpotifyPlayer();
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
        <div className="flex justify-center items-baseline rounded-lg m-5 w-5/6 bg-background">
            <button className="text-primary p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.previousTrack()}><RxTrackPrevious /></button>
            <button className="text-primary p-5 text-7xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.togglePlay()}><CiPlay1 /></button>
            <button className="text-primary p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.nextTrack()}><RxTrackNext /></button>
        </div>
    )
}