import { useContext } from "react";
import { Queue } from "../../../assets";
import { Track } from "../../../types/TrackTypes";
import { QueueItem } from "./QueueItem";
import { QueueContext } from "../../../context/QueueContext";
import { useQueue } from "../../../hooks/useQueue";

export const TrackQueue = () => {
    const { queue } = useContext(QueueContext);
    useQueue();

    return (
        <div>
            <div className="flex flex-row items-center p-5">
                <span className="fill-primary"><Queue /></span>
                <p className="text-primary text-2xl px-4">Queue</p>
            </div>
            <div className="overflow-y-scroll max-h-[70vh]">
                { queue.map((track : Track, index : number) => <QueueItem key={index} track={track} />) }
            </div>
        </div>
    )
}