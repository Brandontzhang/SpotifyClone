import { useContext, useEffect, useState } from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk";
import { CiPlay1, CiPause1 } from 'react-icons/ci/index';
import { RxTrackPrevious, RxTrackNext } from 'react-icons/rx/index';
import { ProgressPlayButton } from "./ProgressPlayButton";
import { VolumeBar } from "./VolumeBar";
import { Forward, Rewind } from "../../assets";
import { TokenContext } from "../../context/TokenContext";
import { setRepeat, transferPlayback } from "../../service/SpotifyApiService";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiPlayListAddLine } from "react-icons/ri";

export const PlayBar = () => {

    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState(true, 100);
    const playerDevice = usePlayerDevice();
    // const errorState = useErrorState();

    const [percentage, setPercentage] = useState(0);

    // Start up variables, no need to track state
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [artists, setArtists] = useState<{name : string, uri : string, url : string}[]>([]);

    const [volume, setVolume] = useState(0.5);
    const [saved, setSaved] = useState(false);

    const { token } = useContext(TokenContext);

    // Initialize song information
    useEffect(() => {
      if (playbackState) {
        setCurrentTime(Math.floor(playbackState.position / 1000))
        setDuration(Math.floor(playbackState.duration / 1000));
        setTitle(playbackState.track_window.current_track.name);
        setArtists(playbackState.track_window.current_track.artists);
        let url = playbackState.context.metadata?.current_item.images[0].url;
        setImage(url ? url : "");
      }
    }, [playbackState]);

    // Initiate device
    useEffect(() => {
      if (playerDevice?.device_id === undefined) return;

      if (playerDevice.status === 'ready') {
        transferPlayback(token, playerDevice.device_id);
      }

    }, [playerDevice?.status]);

    // Volume 
    useEffect(() => {
      player?.setVolume(volume);
    }, [volume]);

    useEffect(() => {
      setPercentage(parseFloat(((currentTime / duration) * 100).toFixed(2)));
    }, [currentTime]);

    const convertMSToMin = (seconds : number) => {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = (seconds % 60);
      
      return `${minutes}:${remainingSeconds < 10? '0' : ''}${remainingSeconds}`;
    }

    const shiftTime = (shiftSeconds : number) => {
      setCurrentTime(ct => {
        player?.seek((ct + shiftSeconds) * 1000);

        return ct + shiftSeconds;
      });
    } 

    if (!webPlaybackSDKReady || !player) return <div>Loading...</div>;

    // TODO : Fix spacing on smaller screens
    const saveToLiked = (e : any) => {
      e.preventDefault();
    }

    const addToSeedTracks = (e : any) => {
      e.stopPropagation();
  }

    return (
        <div className="grid grid-cols-12 m-2 rounded-lg w-full bg-background100">
          <div className="col-span-6 lg:col-span-4 sm:col-span-8 flex flex-row justify-center items-center w-full p-5">
            <img className="h-[128px] w-[128px] rounded-lg" src={image}></img>
            <div className="p-5 overflow-hidden">
              <p className="text-primary text-xl font-bold whitespace-nowrap text-ellipsis">{title}</p>
              <div className="whitespace-nowrap">
                {artists.map((artist, index) => <span key={index} className="text-primary pr-3">{artist.name}</span>)}
              </div>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-4 sm:col-span-4 flex justify-center items-end w-full p-5">
            <button className="text-primary lg:block hidden p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => shiftTime(-10)}><Rewind/></button>
            <button className="text-primary md:block hidden p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.previousTrack()}><RxTrackPrevious /></button>
            <div className="flex flex-col items-center">
              <ProgressPlayButton progressBarClassName="stroke-highlight" size={250} strokeWidth={10} percentage={percentage} > 
                <button className="text-primary text-7xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.togglePlay()}>{playbackState?.paused ? <CiPlay1 /> : <CiPause1 />}</button>
              </ProgressPlayButton>
              <span className="text-primary text-xs pt-5">{convertMSToMin(currentTime)}/{convertMSToMin(duration)}</span>
            </div>
            <button className="text-primary md:block hidden p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => player.nextTrack()}><RxTrackNext /></button>
            <button className="text-primary lg:block hidden p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => shiftTime(10)}><Forward/></button>
          </div>

          <div className="lg:col-span-4 hidden lg:flex flex-col justify-center items-center w-full p-5">
            <div className="flex flex-row">
              <button className="text-highlight p-5 text-3xl">{saved ? <AiFillHeart /> : <span onClick={(e) => saveToLiked(e)}><AiOutlineHeart /></span>}</button>
              <button className="text-primary p-5 text-3xl transition ease-in-out hover:text-highlight duration-300" onClick={() => setRepeat("track")}>R</button>
              <span className="text-primary text-3xl p-5 pt-6 hover:text-highlight" onClick={(e) => addToSeedTracks(e)}><RiPlayListAddLine /></span>
            </div>
            <VolumeBar initialVolume={volume} setVolume={setVolume} />
            
          </div>
        </div>
    )
}

export default PlayBar;