import { useContext, useEffect, useState } from "react"
import { LoginPage } from "./LoginPage";
import { TokenContext } from "../../context/TokenContext";
import { MainPage } from "../MainPage";
import { QueueContext } from "../../context/QueueContext";
import { Track } from "../../types/TrackTypes";

export const LandingPage = () => {

    const [token, setToken] = useState('');
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Track>();
    const [queue, setQueue] = useState<Track[]>([]);

    const getOAuthToken = async() => {
        const response = await fetch('http://localhost:5000/auth/token');
        const json = await response.json();

        setToken(json.access_token);
    }

    useEffect(() => {
        getOAuthToken();
    }, [])

    return (
        <QueueContext.Provider value={{currentlyPlaying : currentlyPlaying, queue : queue, setCurrentlyPlaying : setCurrentlyPlaying, setQueue : setQueue}}>
            <TokenContext.Provider value={{token : token, setToken : setToken}}>
                <div className="bg-background300 h-screen">
                    { (token === '') ? <LoginPage /> : <MainPage />}
                </div>
            </TokenContext.Provider>
        </QueueContext.Provider>
    )

}