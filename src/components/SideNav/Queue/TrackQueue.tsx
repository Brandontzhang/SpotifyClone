import { useContext, useState } from "react";
import { Track } from "../../../types/TrackTypes";
import { QueueItem } from "./QueueItem";
import { QueueContext } from "../../../context/QueueContext";
import { useQueue } from "../../../hooks/useQueue";
import { useBuildRecommendations } from "../../../hooks/useBuildRecommendations";
import { BuildPlaylistContext } from "../../../context/BuildPlaylistContext";
import { GiBinoculars } from 'react-icons/gi';
import { MdChangeCircle, MdOutlineQueueMusic, MdOutlineCreateNewFolder } from 'react-icons/md';
import { Link } from "react-router-dom";


export const TrackQueue = () => {
    const { queue } = useContext(QueueContext);
    useQueue();

    const { seedTracks } = useContext(BuildPlaylistContext);
    const { buildRecs } = useBuildRecommendations();
    const [mode, setMode] = useState("queue");

    return (
        <div>
            {mode === 'queue' ?
                <div className="grid grid-cols-5 justify-around items-center p-5 w-full">
                    <span className="text-primary text-4xl"><MdOutlineQueueMusic /></span>
                    <p className="col-span-2 text-primary text-xl px-2">Queue</p>
                    <div className="col-span-1"></div>
                    <span className="text-primary text-4xl px-4 hover:text-highlight" onClick={() => setMode('build')}><MdChangeCircle /></span>
                </div> :
                <div className="grid grid-cols-5 justify-around items-center p-5 w-full">
                    <span className="text-primary text-4xl"><GiBinoculars /></span>
                    <p className="col-span-2 text-primary text-xl px-2">Build Recs</p>
                    <Link to={'/recommendations'}>
                        <span className="text-primary text-4xl px-4 hover:text-highlight" onClick={() => buildRecs(seedTracks)}><MdOutlineCreateNewFolder /></span>
                    </Link>
                    <span className="text-primary text-4xl px-4 hover:text-highlight" onClick={() => setMode('queue')}><MdChangeCircle /></span>
                </div> 
            }
            
            {mode === 'queue' ?
                <div className="overflow-y-scroll max-h-[70vh]">
                    { queue.map((track : Track, index : number) => <QueueItem key={index} track={track} />) }
                </div> :
                <div className="overflow-y-scroll max-h-[70vh]">
                    { seedTracks.map((track : Track, index : number) => <QueueItem key={index} track={track} />) }
                </div>
            }     
        </div>
    )
}