import { useContext } from "react";
import { Track } from "../../../types/TrackTypes";
import { QueueItem } from "./QueueItem";
import { QueueContext } from "../../../context/QueueContext";
import { useQueue } from "../../../hooks/useQueue";
import { useBuildRecommendations } from "../../../hooks/useBuildRecommendations";
import { BuildPlaylistContext } from "../../../context/BuildPlaylistContext";
import { GiBinoculars } from 'react-icons/gi';
import { MdChangeCircle, MdOutlineQueueMusic } from 'react-icons/md';
import { Link } from "react-router-dom";


export const TrackQueue = () => {
    const { queue } = useContext(QueueContext);
    useQueue();

    const { seedTracks, recTracks, mode, setMode } = useContext(BuildPlaylistContext);
    const { buildRecs } = useBuildRecommendations();

    return (
        <div className="grid grid-rows-12 h-full">
            {mode === 'queue' ?
                <div className="row-span-1 grid grid-cols-5 justify-around items-center p-5 w-full h-full">
                    <span className="text-primary text-4xl"><MdOutlineQueueMusic /></span>
                    <p className="col-span-2 text-primary text-xl px-2">Queue</p>
                    <div className="col-span-1"></div>
                    <span className="text-primary text-4xl px-4 hover:text-highlight hover:cursor-pointer" onClick={() => setMode('build')}><MdChangeCircle /></span>
                </div> :
                <div className="row-span-1 grid grid-cols-5 justify-around items-center p-5 w-full h-full">
                    <span className="text-primary text-3xl"><GiBinoculars /></span>
                    <p className="col-span-2 text-primary text-xl px-2">Build Recs</p>
                    <div className="col-span-1"></div>
                    <span className="text-primary text-4xl px-4 hover:text-highlight hover:cursor-pointer" onClick={() => setMode('queue')}><MdChangeCircle /></span>
                </div> 
            }
            
            {mode === 'queue' ?
                <div className="row-auto overflow-y-scroll max-h-[70vh]">
                    { queue.map((track : Track, index : number) => <QueueItem key={index} track={track} />) }
                </div> :
                <div className="row-auto overflow-y-scroll max-h-[70vh]">
                    { seedTracks.map((track : Track, index : number) => <QueueItem key={index} track={track} mode={mode} />) }
                </div>
            }     

            {
                mode === 'build' ? 
                <div className="flex justify-center my-12 w-full text-primary text-xl">
                    <Link to={'/recommendations'}>
                        {recTracks.length > 0 ? 
                            <span className="mx-4 p-2 h-fit w-fit border border-primary rounded-xl hover:cursor-pointer hover:border-highlight hover:text-highlight duration-300">
                                View Recs
                            </span> : <></>
                        }
                        <span onClick={() => buildRecs(seedTracks)} className="mx-4 p-2 h-fit w-fit border border-primary rounded-xl hover:cursor-pointer hover:border-highlight hover:text-highlight duration-300">
                            Get New Recs
                        </span>
                    </Link>
                </div> :
                <></>
            }
            
        </div>
    )
}