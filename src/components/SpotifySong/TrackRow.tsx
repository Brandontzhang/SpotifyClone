import { Track } from "../../types/TrackTypes"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToQueue, saveTrack } from "../../service/SpotifyApiService";
import { RiPlayListFill, RiPlayListAddLine } from 'react-icons/ri';
import { useContext, useState } from "react";
import { QueueContext } from "../../context/QueueContext";
import { BuildPlaylistContext } from "../../context/BuildPlaylistContext";

export const TrackRow = (props : any) => {
    const track : Track = props.track;
    const addedAt : string = props.addedAt;
    const playTrack = props.playTrack;
    const [saved, setSaved] = useState(props.saved);
    const { setRefreshQueue, mode } = props;

    const { currentlyPlaying } = useContext(QueueContext);
    const { setSeedTracks, setMode } = useContext(BuildPlaylistContext);

    const getArtists = () => {
        let artists = track.artists;

        if (artists.length == 0) {
            return "";
        } else if (artists.length <= 1) {
            return artists[0].name;
        } else {
            let artistMinLast = artists.slice(0, -1);
            return artistMinLast.reduce((sentence, artist) => `${sentence} ${artist.name}, `, "") + artists[artists.length - 1].name;
        }
    }

    const getDuration = () => {
        let seconds = track.duration_ms / 1000;
        let remainingSeconds = Math.round(seconds % 60);
        let minutes = Math.round(seconds / 60);

        let secondsDisplay = remainingSeconds == 0 ? "00" : remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${minutes}:${secondsDisplay}`;
    }

    const getAddedAtDisplay = () => {
        let currentDate = new Date();
        let addedDate = new Date(addedAt);

        const dif = currentDate.getTime() - addedDate.getTime();
        const days = dif / (1000*60*60*24);

        if (days < 1) {
            return `Today`;
        } else if (days < 2) {
            return `1 day ago`;
        } else if (days <= 7) {
            return `${Math.floor(days)} days ago`;
        } else if (days <= 28) {
            return `${Math.ceil(days / 7)} weeks ago`;
        } else {
            return addedDate.toLocaleString();
        }
    }

    const addQueueClick = (e : any) => {
        e.stopPropagation();
        setRefreshQueue((refresh : boolean) => !refresh);
        addToQueue(track.uri);
    }

    const addToSeedTracks = (e : any) => {
        e.stopPropagation();
        setSeedTracks([track]);
        setMode('build');
    }

    const saveToLiked = (e : any) => {
        e.stopPropagation();
        saveTrack(track);
        setSaved(true);
    }

    return (
        <div className={`${currentlyPlaying?.id == track.id ? 'text-highlight' : 'text-primary'} grid grid-cols-10 bg-background100 m-2 p-2 px-8 rounded-lg hover:cursor-pointer`} key={track.id} onClick={() => playTrack(track.uri)}>
            <div className="col-span-6 lg:col-span-4 flex flex-col overflow-hidden mx-2">
                <span className="text-xl whitespace-nowrap">{track.name}</span>
                <span>{getArtists()}</span>
            </div>
            <div className="hidden lg:col-span-2 lg:flex flex-col justify-center overflow-hidden mx-4">
                <span className="text-primary text-xl whitespace-nowrap">{track.album.name}</span>
            </div>
            {mode == 'playlist' ? 
                <div className="hidden lg:col-span-2 lg:flex flex-col justify-center">
                    <span className="text-primary text-xl">{getAddedAtDisplay()}</span>
                </div> :
                <div className="hidden lg:col-span-2"></div>
            }
            <div className="flex flex-row col-span-2 lg:col-span-1 items-center justify-center">
                <span className="text-highlight text-3xl">{mode == 'playlist' ? saved ? <AiFillHeart /> : <span onClick={(e) => saveToLiked(e)}><AiOutlineHeart /></span> : <></>}</span>
                <span className="text-primary text-3xl px-1 hover:text-highlight" onClick={(e) => addQueueClick(e)}><RiPlayListFill /></span>
                <span className="text-primary text-3xl px-1 hover:text-highlight" onClick={(e) => addToSeedTracks(e)}><RiPlayListAddLine /></span>
            </div> 
            <div className="flex flex-row col-span-2 lg:col-span-1 items-center justify-center">
                <span className="text-primary text-xl">{getDuration()}</span>
            </div>
        </div>
    )
}