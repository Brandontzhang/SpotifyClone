import { ActionMenu } from "./Actions/ActionMenu"
import { TrackQueue } from "./Queue/TrackQueue"

export const SideNav = () => {
    return (
        <div className="h-full hidden md:grid grid-cols-1 grid-rows-6 gap-4 ">
            <div className="row-span-1 bg-background200 rounded-lg">
                <ActionMenu />
            </div>
            <div className="row-span-5 bg-background200 rounded-lg">
                <TrackQueue />
            </div>
        </div>
    )
}