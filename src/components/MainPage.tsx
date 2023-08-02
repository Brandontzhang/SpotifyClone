import { SideNav } from "./SideNav/SideNav"
import { WebPlayback } from "./SpotifyPlayer/WebPlayback"

export const MainPage = () => {
    return (
        <div className="grid grid-cols-6 h-auto min-h-screen">
            <div className="col-span-1 m-2 mr-0 rounded-lg">
                <SideNav />
            </div>
            <div className="col-span-5 bg-background200 m-2 rounded-lg">
                <WebPlayback />
            </div>
        </div>
    )
}