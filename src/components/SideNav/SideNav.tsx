import { ActionMenu } from "./ActionMenu"
import { TrackQueue } from "./TrackQueue"

export const SideNav = () => {
    return (
        <div className="h-full grid grid-cols-1 grid-rows-6 gap-4">
            <div className="row-span-1 bg-background200 rounded-lg">
                <ActionMenu />
            </div>
            <div className="row-span-5 bg-background200 rounded-lg">
                <TrackQueue />
            </div>
        </div>
    )
}