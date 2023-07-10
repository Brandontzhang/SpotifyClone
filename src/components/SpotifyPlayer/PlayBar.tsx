import { useEffect, useState } from "react";
import { useErrorState, usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";
import { CiPlay1, CiPause1 } from 'react-icons/ci/index';
import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx/index';
import { ProgressPlayButton } from "./ProgressPlayButton";
import { VolumeBar } from "./VolumeBar";


export const PlayBar = (props : any) => {

    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState(true, 100);
    const playerDevice = usePlayerDevice();
    const errorState = useErrorState();

    const [percentage, setPercentage] = useState(0);

    // Start up variables, no need to track state
    let duration : number = 0;

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [artists, setArtists] = useState<{name : string, uri : string, url : string}[]>([]);

    const [volume, setVolume] = useState(props.initialVolume);

    
    // Initialize song information
    useEffect(() => {
      if (playbackState) {
        duration = playbackState.duration;
        setTitle(playbackState.track_window.current_track.name);
        setArtists(playbackState.track_window.current_track.artists);
        let url = playbackState.context.metadata?.current_item.images[0].url;
        setImage(url ? url : "");
      }
    }, [playbackState]);


    // Initiate device
    useEffect(() => {
      if (playerDevice?.device_id === undefined) return;

      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({ device_ids: [playerDevice.device_id], play: false }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      });

    }, [playerDevice?.device_id]);


    // Calculate percentage of song
    useEffect(() => {
      if (playbackState) {
        let currentTime = playbackState.position;
        let estimatedDuration = playbackState.context.metadata?.current_item.estimated_duration;

        if (estimatedDuration) {
          setPercentage(parseFloat(((currentTime / estimatedDuration) * 100).toFixed(2)));
        }
      }
    }, [playbackState]);

    useEffect(() => {
      player?.setVolume(volume);
    }, [volume]);


    
    if (!webPlaybackSDKReady || !player) return <div>Loading...</div>;

    return (
        <div className="flex justify-between items-center rounded-lg m-5 p-5 w-4/6 bg-background">
          <div className="flex flex-row justify-center items-center">
            <img className="h-[128px] w-[128px] rounded-lg" src={image}></img>
            <div className="p-5">
              <span className="text-primary text-xl font-bold">{title}</span>
              <div>
                {artists.map(artist => <span className="text-primary pr-3">{artist.name}</span>)}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-baseline w-1/2">
            <button className="text-primary p-5 pb-0 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.previousTrack()}><RxTrackPrevious /></button>
            <ProgressPlayButton progressBarClassName="stroke-highlight" size={250} strokeWidth={10} percentage={percentage} > 
              <button className="text-primary text-7xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.togglePlay()}>{playbackState?.paused ? <CiPlay1 /> : <CiPause1 />}</button>
            </ProgressPlayButton>
            <button className="text-primary p-5 pb-0 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.nextTrack()}><RxTrackNext /></button>
          </div>

          <div className="flex flex-row items-center">
            <VolumeBar initialVolume={volume} setVolume={setVolume} />
          </div>
        </div>
    )
}