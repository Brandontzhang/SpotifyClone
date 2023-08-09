import { useContext, useState } from "react";
import { Playlist, Image } from "../../types/PlaylistTypes"
import { CiPlay1, CiPause1 } from 'react-icons/ci/index';
import { Link } from "react-router-dom";
import { PlaylistContext } from "../../context/PlayListContext";
import { LoadingSpinner } from "../../assets/LoadingSpinner";

export const PlaylistCard = (props : any) => {

    const playlist : Playlist = props.playlist;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const { setPlaylist } = useContext(PlaylistContext);

    const getLargestImage = (imgs : Image[]) : string => {
        if (!imgs || imgs.length === 0) {
            return "";
        }
        return imgs.reduce((max, img) => (max.height * max.width) > (img.height * img.width) ? max : img).url;
    }

    if (!playlist) {
        return (
            <div className="flex items-center m-[12px] bg-background100 rounded-xl hover:cursor-pointer">
                <div className="h-[100px] w-[100px] m-2 rounded-xl flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

    const playlistLink = {
        pathname : `playlist/${playlist.id}`,
    }

    return (
        <Link onClick={() => setPlaylist(playlist)} to={playlistLink}>
            <div className="flex items-center m-[12px] bg-background100 rounded-xl hover:cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <img className="h-[100px] w-[100px] m-2 rounded-xl" src={getLargestImage(playlist.images)} />
                <div className="flex w-full justify-between px-[48px]">
                    <span className="text-primary">{playlist.name}</span>
                    {isHover && !isPlaying ? <button className="text-primary"><CiPlay1 /></button> : <></> }
                    {isPlaying ? <button className="text-priamry"><CiPause1 /></button> : <></>}
                </div>
            </div>
        </Link>
    )
}