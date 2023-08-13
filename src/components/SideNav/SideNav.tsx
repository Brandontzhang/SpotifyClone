import { useContext } from "react"
import { ActionMenu } from "./Actions/ActionMenu"
import { TrackQueue } from "./Queue/TrackQueue"
import { TokenContext } from "../../context/TokenContext"

export const SideNav = () => {

    const { sideNav } = useContext(TokenContext);

    return (
        <div className={`h-full ${sideNav ? 'w-[310px] absolute' : 'hidden'} md:static md:w-auto md:grid grid-cols-1 grid-rows-6 gap-4`}>
            <div className="row-span-1 bg-background200 rounded-lg">
                <ActionMenu />
            </div>
            <div className="row-span-5 bg-background200 rounded-lg h-full">
                <TrackQueue />
            </div>
        </div>
    )
}