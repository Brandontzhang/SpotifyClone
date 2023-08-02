import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { Track } from "../../types/TrackTypes"
import { Heart } from "../../assets";

export const TrackRow = (props : any) => {
    const track : Track = props.track;
    const saved : boolean = props.saved;
    const addedAt : string = props.addedAt;
    const player = useSpotifyPlayer();

    const play = async (songURI : string) => {
        await fetch(`http://localhost:5000/player/queue`, {
            method : "POST",
            mode: "cors", 
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                URI : songURI
            })
        })

        player?.nextTrack();
    }

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

    return (
        <div className="grid grid-cols-10 bg-background m-2 p-2 px-8 rounded-lg hover:cursor-pointer" key={track.id} onClick={() => play(track.uri)}>
            <div className="flex flex-col col-span-4">
                <span className="text-primary text-xl">{track.name}</span>
                <span className="text-primary200">{getArtists()}</span>
            </div>
            <div className="flex flex-col col-span-2 justify-center">
                <span className="text-primary text-xl">{track.album.name}</span>
            </div>
            <div className="flex flex-col col-span-2 justify-center">
                <span className="text-primary text-xl">{getAddedAtDisplay()}</span>
            </div>
            <div className="flex flex-row col-span-1 items-center justify-center">
                {saved ? <span className="fill-highlight"><Heart /></span> : <div></div>}
            </div>
            <div className="flex flex-row col-span-1 items-center justify-center">
                <span className="text-primary text-xl">{getDuration()}</span>
            </div>
        </div>
    )
}