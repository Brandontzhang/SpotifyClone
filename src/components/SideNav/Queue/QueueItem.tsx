import { Track } from "../../../types/TrackTypes";
// import { AiOutlineMinusCircle } from 'react-icons/ai/index';
// import { RxHamburgerMenu } from 'react-icons/rx/index';

export const QueueItem = (props : any) => {
    const track : Track = props.track;

    return (
        <div className="text-primary max-w-full h-[80px] overflow-hidden hover:cursor-pointer">
            <div className="bg-background100 m-2 p-5 rounded-xl">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-full">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</span>
                        <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{track.artists.map(artist => artist.name).join(', ')}</span>
                    </div>
                    {/* TODO : if they ever update the queue API endpoints to allow more actions
                    <div className="flex flex-row justify-between items-center ">
                        <span className="pr-1 hover:text-highlight text-xl"><AiOutlineMinusCircle/></span>
                        <span className="pl-1 hover:text-highlight text-2xl"><RxHamburgerMenu /></span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}