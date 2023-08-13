import { useState } from "react";
import { CiPlay1, CiPause1 } from 'react-icons/ci/index';
import { Link } from "react-router-dom";

export const LikedSongsPlaylistCard = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={'playlist/likedsongs'}>
            <div className="flex flex-col justify-center items-center w-fit p-2 m-2 bg-background100 rounded-xl hover:cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <img className="h-[124px] w-[124px] m-6 rounded-xl" src="https://images-ak.spotifycdn.com/image/ab67706c0000bebb4eb7eb2922172d05c580e77a" />
                <div className="flex w-[124px] justify-center">
                    <span className="text-primary">Liked Songs</span>
                    {isHover && !isPlaying ? <button className="text-primary"><CiPlay1 /></button> : <></> }
                    {isPlaying ? <button className="text-priamry"><CiPause1 /></button> : <></>}
                </div>
            </div>
        </Link>
    )
}