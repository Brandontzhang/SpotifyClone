import { useState } from "react";
import { CiPlay1, CiPause1 } from 'react-icons/ci/index';
import { Link } from "react-router-dom";

export const LikedSongsPlaylistCard = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={'playlist/likedsongs'}>
            <div className="flex items-center m-[12px] bg-background100 rounded-xl hover:cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <img className="h-[100px] w-[100px] m-2 rounded-xl" src="https://images-ak.spotifycdn.com/image/ab67706c0000bebb4eb7eb2922172d05c580e77a" />
                <div className="flex w-full justify-between px-[48px]">
                    <span className="text-primary">Liked Songs</span>
                    {isHover && !isPlaying ? <button className="text-primary"><CiPlay1 /></button> : <></> }
                    {isPlaying ? <button className="text-priamry"><CiPause1 /></button> : <></>}
                </div>
            </div>
        </Link>
    )
}