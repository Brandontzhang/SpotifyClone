import { useContext } from "react"
import { ActionMenu } from "./Actions/ActionMenu"
import { TrackQueue } from "./Queue/TrackQueue"
import { TokenContext } from "../../context/TokenContext"

export const SideNav = () => {

    const { sideNav } = useContext(TokenContext);

    return (
        <div className={`${sideNav ? 'w-[310px] absolute grid bg-background200' : 'hidden'} md:static md:w-auto md:grid grid-cols-1 grid-rows-6 gap-4 h-full`}>
            <div className="col-span-1 row-span-1 bg-background200 rounded-lg">
                <ActionMenu />
            </div>
            <div className="row-span-5 bg-background200 rounded-lg">
                <TrackQueue />
            </div>
        </div>
    )
}